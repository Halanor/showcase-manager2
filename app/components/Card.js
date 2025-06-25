'use client';
import React from 'react';
import ToggleButton from './ToggleButton';

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
  isAddCard,
  onAddClick
}) => {
 if (isAddCard) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border-2 border-gray-300 bg-gray-100 p-4 cursor-pointer hover:border-gray-400"
      style={{ width: '250px', height: '300px' }}
      onClick={onAddClick}
    >
      <div className="flex items-center justify-center rounded-full border-2 border-gray-400 w-16 h-16">
        <span className="text-gray-500 text-4xl font-thin">+</span>
      </div>
    </div>
  );
}


  return (
    <div className="rounded-xl border border-gray-300 overflow-hidden bg-white text-gray-800 shadow hover:shadow-lg flex flex-col" style={{ width: '250px' }}>
      {/* IMAGE ON TOP */}
      <div className="relative h-40 w-full overflow-hidden flex justify-center items-center">
        <img
          src="/monochrome.jpg"
          alt={showcaseName}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-30 text-white text-left pl-2 py-1 font-semi-bold">
          {showcaseName}
        </div>
      </div>

      {/* INFO + TOGGLES */}
      <div className="p-4 flex justify-between items-start space-x-4">
        <div className="flex flex-col space-y-1 pt-4">
          <span className="text-3xl pl-4">{temperature}°C</span>
          <span className="text-3xl pl-4 pt-2">{humidity}%</span>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center space-x-2">
            <span>Lock</span>
            <ToggleButton checked={lockOn} onChange={onLockChange} />
          </div>
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

      {/* CHART PLACEHOLDER */}
      <div className="h-16 flex items-center justify-center text-gray-500 border-t">
        <span>Chart goes here</span>
      </div>
    </div>
  );
};

export default Card;
