'use client';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function StatisticsPage() {
  const [showcases, setShowcases] = useState([]);
  const [selectedShowcase, setSelectedShowcase] = useState('');
  const [data, setData] = useState([]);
  const [displayOption, setDisplayOption] = useState('temp'); // 'temp' | 'humidity' | 'both'

  useEffect(() => {
    async function fetchShowcases() {
      const res = await fetch('/api/showcases');
      const data = await res.json();
      setShowcases(data);
    }
    fetchShowcases();
  }, []);

  useEffect(() => {
    if (!selectedShowcase) {
      setData([]);
      return;
    }
    const showcase = showcases.find((s) => s.name === selectedShowcase);
    if (showcase) {
      const temps = Array.isArray(showcase.temps) ? showcase.temps : [];
      const humidities = Array.isArray(showcase.humidity) ? showcase.humidity : [];
      const formattedData = Array.from({ length: Math.max(temps.length, humidities.length) }, (_, i) => {
        return {
          time: `${i}:00`,
          temp: temps[temps.length - 1 - i] ?? null,
          humidity: humidities[humidities.length - 1 - i] ?? null,
        };
      }).reverse();
      setData(formattedData);
    }
  }, [selectedShowcase, showcases]);

  return (
    <div className="min-h-screen text-gray-800 p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold">Statistics</h2>
      <select
        value={selectedShowcase}
        onChange={(e) => setSelectedShowcase(e.target.value)}
        className="mt-4 p-2 border rounded"
      >
        <option value="">Select a Showcase</option>
        {showcases.map((showcase) => (
          <option key={showcase.name} value={showcase.name}>
            {showcase.name}
          </option>
        ))}
      </select>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => setDisplayOption('temp')}
          className={`p-2 rounded ${displayOption === 'temp' ? 'bg-gray-300' : 'bg-gray-100'}`}
        >
          Temperature
        </button>
        <button
          onClick={() => setDisplayOption('humidity')}
          className={`p-2 rounded ${displayOption === 'humidity' ? 'bg-gray-300' : 'bg-gray-100'}`}
        >
          Humidity
        </button>
        <button
          onClick={() => setDisplayOption('both')}
          className={`p-2 rounded ${displayOption === 'both' ? 'bg-gray-300' : 'bg-gray-100'}`}
        >
          Both
        </button>
      </div>

      <div className="mt-6 w-full max-w-3xl">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            {/* Always include BOTH Y Axes, regardless of the display option */}
            <YAxis
              yAxisId="temp"
              label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }}
              domain={[0, 50]}
            />
            <YAxis
              yAxisId="humidity"
              orientation="right"
              label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }}
              domain={[0, 70]}
              tickMargin={10}
              width={60}
            />
            <Tooltip />
            <Legend />
            {(displayOption === 'temp' || displayOption === 'both') && (
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temp"
                stroke="#ff0000"
                name="Temperature"
                dot={false}
              />
            )}
            {(displayOption === 'humidity' || displayOption === 'both') && (
              <Line
                yAxisId="humidity"
                type="monotone"
                dataKey="humidity"
                stroke="#0000ff"
                name="Humidity"
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

