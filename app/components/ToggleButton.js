'use client';
import React from 'react';

const ToggleButton = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between space-x-2">
      <span className="text-gray-800 font-medium">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-gray-500
            ${checked ? 'bg-[#5bbe4a]' : 'bg-gray-300'}`}
        />
        <div
          className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full border border-gray-300 bg-white 
            transition-transform ${checked ? 'translate-x-full' : ''}`}
        />
      </label>
    </div>
  );
};

export default ToggleButton;
