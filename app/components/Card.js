'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToggleButton from './ToggleButton';
import AddCardButton from './AddCardButton';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from 'recharts';

const Card = ({
  showcaseName,
  temperature,
  humidity,
  lockOn,
  ledOn,
  spotOn,
  lightOn,
  onLockChange,
  onLedChange,
  onSpotChange,
  onLightChange,
  onRename,
  isAddCard,
  onAddClick,
  temps = [],
  humidityValues = [],
  role
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(showcaseName);
  const router = useRouter();

  if (isAddCard) {
    return <AddCardButton onClick={onAddClick} />;
  }

  const handleRename = async (e) => {
    if (e.key === 'Enter') {
      if (newName.trim() && newName.trim() !== showcaseName) {
        await onRename(showcaseName, newName.trim());
      }
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setNewName(showcaseName);
    }
  };

  const validTemps = Array.isArray(temps) ? temps : [];
  const validHumids = Array.isArray(humidityValues) ? humidityValues : [];

  const maxTemp = validTemps.length ? Math.max(...validTemps) : null;
  const maxHumidity = validHumids.length ? Math.max(...validHumids) : null;

  const lastMaxTempIndex = maxTemp !== null ? validTemps.lastIndexOf(maxTemp) : -1;
  const lastMaxHumidityIndex = maxHumidity !== null ? validHumids.lastIndexOf(maxHumidity) : -1;

  const chartData = validTemps.map((t, i) => ({
    time: i,
    temperature: t,
    humidity: validHumids[i],
  }));

  const handleChartClick = () => {
    if (showcaseName) {
      router.push(`/statistics?showcase=${encodeURIComponent(showcaseName)}`);
    }
  };

  return (
    <div className="rounded-xl border border-gray-300 overflow-hidden bg-white text-gray-800 shadow hover:shadow-lg flex flex-col" style={{ width: '250px' }}>
      {/* img section, make this editable later */}
      <div className="relative h-40 w-full overflow-hidden flex justify-center items-center">
        <img
          src="/monochrome.jpg"
          alt={showcaseName}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-30 text-white flex items-center justify-between pl-2 pr-2 py-1 font-semibold">
          {isEditing ? (
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleRename}
              className="bg-gray-100 rounded text-gray-800 p-1 w-3/4"
              autoFocus
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <>
              <span>{showcaseName}</span>
              {onRename && (
                <button
                  className="ml-2 hover:text-yellow-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  ✏️
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* temp/hum info + toggle buttons */}
      <div className="p-4 flex justify-between items-start space-x-4">
        <div className="flex flex-col space-y-1 pt-4">
          <span className="text-3xl pl-4">{temperature}°C</span>
          <span className="text-3xl pl-4 pt-2">{humidity}%</span>
        </div>
        <div className="flex flex-col space-y-2">
          {role !== 'maintenance' && (
            <div className="flex justify-between items-center space-x-2">
              <span>Lock</span>
              <ToggleButton checked={lockOn} onChange={onLockChange} colorWhenOff="bg-[#E65100]" />
            </div>
          )}
          <div className="flex justify-between items-center space-x-2">
            <span>Led</span>
            <ToggleButton checked={ledOn} onChange={onLedChange} />
          </div>
          <div className="flex justify-between items-center space-x-2">
            <span>Spot</span>
            <ToggleButton checked={spotOn} onChange={onSpotChange} />
          </div>
          <div className="flex justify-between items-center space-x-2">
            <span>Light</span>
            <ToggleButton checked={lightOn} onChange={onLightChange} />
          </div>
        </div>
      </div>

      {/* chart section*/}
      <div
        className="h-16 flex items-center justify-center border-t cursor-pointer hover:opacity-80"
        style={{ marginTop: '8px', marginBottom: '10px', paddingTop: '10px', paddingBottom: '2px' }}
        onClick={handleChartClick}
      >
        {chartData.length > 0 && (
          <div className="w-48 h-16">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#9E9E9E" strokeDasharray="3 3" />
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#C62828"
                  dot={false}
                >
                  {lastMaxTempIndex >= 0 && (
                    <LabelList
                      dataKey="temperature"
                      position="top"
                      content={({ index, value, x, y }) =>
                        index === lastMaxTempIndex ? (
                          <text
                            x={x}
                            y={y}
                            dy={-4}
                            fill="#C62828"
                            fontSize={12}
                          >
                            {value}°C
                          </text>
                        ) : null
                      }
                    />
                  )}
                </Line>
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#1976D2"
                  dot={false}
                >
                  {lastMaxHumidityIndex >= 0 && (
                    <LabelList
                      dataKey="humidity"
                      position="top"
                      content={({ index, value, x, y }) =>
                        index === lastMaxHumidityIndex ? (
                          <text
                            x={x}
                            y={y}
                            dy={-4}
                            fill="#1976D2"
                            fontSize={12}
                          >
                            {value}%
                          </text>
                        ) : null
                      }
                    />
                  )}
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
