'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function Graph({ data, showTemp, showHumidity }) {
  const getYDomain = () => {
    if (showTemp && showHumidity) return [0, 70];
    if (showTemp) return [0, 50];
    if (showHumidity) return [0, 70];
    return [0, 50];
  };
  
  const getYTicks = () => {
    if (showTemp && showHumidity) return [10, 20, 30, 40, 50, 60, 70];
    if (showTemp) return [10, 20, 30, 40, 50];
    if (showHumidity) return [10, 20, 30, 40, 50, 60, 70];
    return [10, 20, 30, 40, 50];
  };
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 50, left: 10, bottom: 5 }}
      >
        <CartesianGrid stroke="#9E9E9E" strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          interval={1}
          tickFormatter={(tick) => {
            const hour = parseInt(tick, 10);
            return hour % 2 === 0 ? tick : '';
          }}
        />
        <YAxis
          domain={getYDomain()}
          ticks={getYTicks()}
          tickFormatter={(value) => (value >= 10 ? value : '')}
        />
        <Tooltip
          formatter={(value, name) =>
            name === 'temperature' ? `${value}°C` : `${value}%`
          }
        />
        {showTemp && (
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#C62828"
            dot={false}
          />
        )}
        {showHumidity && (
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#1976D2"
            dot={false}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
