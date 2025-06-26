'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Graph from '../components/Graph';

export default function StatisticsPage() {
  const [showcases, setShowcases] = useState([]);
  const [selectedShowcase, setSelectedShowcase] = useState('');
  const [showTemp, setShowTemp] = useState(true);
  const [showHumidity, setShowHumidity] = useState(true);
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchShowcases() {
      const res = await fetch('/api/showcases');
      const data = await res.json();
      setShowcases(data);
    }
    fetchShowcases();
  }, []);

  useEffect(() => {
    const showcaseQuery = searchParams.get('showcase');
    if (showcaseQuery) {
      setSelectedShowcase(showcaseQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      if (!selectedShowcase) {
        setData([]);
        return;
      }

      const showcase = showcases.find((s) => s.name === selectedShowcase);
      if (!showcase) {
        setData([]);
        return;
      }

      const temperatures = Array.isArray(showcase.temps) 
        ? showcase.temps.slice().reverse() 
        : [];
      const humidityValues = Array.isArray(showcase.humidity) 
        ? showcase.humidity.slice().reverse() 
        : [];

      const formattedData = temperatures.map((temp, index) => {
        return {
          time: `${index}:00`,
          temperature: temp,
          humidity: humidityValues[index] ?? null,
        };
      });
      setData(formattedData);
    }
    fetchData();
  }, [selectedShowcase, showcases]);

  const renderLegend = () => {
    if (!selectedShowcase) {
      return <span className="font-bold">Select a showcase</span>;
    }
    if (!showTemp && !showHumidity) {
      return <span className="font-bold">Select a value to display</span>;
    }
    return (
      <div className="flex space-x-4 justify-center">
        {showTemp && (
          <span className="font-bold text-[#C62828]">Temperature (°C)</span>
        )}
        {showHumidity && (
          <span className="font-bold text-[#1976D2]">Humidity (%)</span>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen text-gray-800 pt-8 pb-8 bg-gray-100 flex flex-col items-center space-y-8 ml-40">
      <div className="bg-gray-200 rounded p-4 flex flex-col items-center space-y-3 w-64">
        <h3 className="font-bold">Select Showcase</h3>
        <select
          className="bg-gray-100 rounded p-2 w-full"
          value={selectedShowcase}
          onChange={(e) => setSelectedShowcase(e.target.value)}
        >
          <option value="">Choose a showcase</option>
          {showcases.map((showcase) => (
            <option key={showcase.name} value={showcase.name}>
              {showcase.name}
            </option>
          ))}
        </select>
        <div className="flex space-x-3 mt-2">
          <button
            onClick={() => setShowTemp((prev) => !prev)}
            disabled={!selectedShowcase}
            title={!selectedShowcase ? 'Select a showcase' : ''}
            className={`w-24 rounded-full px-3 py-1 font-bold ${!selectedShowcase
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : showTemp
              ? 'bg-[#C62828] text-white'
              : 'bg-gray-300 text-gray-800'
            }`}
          >
            Temp
          </button>
          <button
            onClick={() => setShowHumidity((prev) => !prev)}
            disabled={!selectedShowcase}
            title={!selectedShowcase ? 'Select a showcase' : ''}
            className={`w-24 rounded-full px-3 py-1 font-bold ${!selectedShowcase
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : showHumidity
              ? 'bg-[#1976D2] text-white'
              : 'bg-gray-300 text-gray-800'
            }`}
          >
            Humidity
          </button>
        </div>
      </div>

      <div className="bg-gray-200 rounded-xl p-4 w-full max-w-3xl">
        <Graph
          data={selectedShowcase ? data : Array.from({ length: 24 }, (_, i) => ({ time: `${i}:00` }))} // Dummy data when no showcase selected
          showTemp={showTemp}
          showHumidity={showHumidity}
        />
        <div className="text-center mt-2">{renderLegend()}</div>
      </div>
    </div>
  );
}
