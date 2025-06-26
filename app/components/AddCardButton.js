'use client';
import React from 'react';

export default function AddCardButton({ onClick }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl border-2 cursor-pointer hover:border-gray-400 group"
      style={{ width: '250px', height: '395px' }}
      onClick={onClick}
      title="Add new showcase"
    >
      <div className="flex items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100 w-24 h-24 text-gray-500 text-5xl font-thin group-hover:border-gray-500 group-hover:text-gray-600">
        +
      </div>
    </div>
  );
}

