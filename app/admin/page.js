'use client';
import { useState, useEffect } from 'react';
import Card from '../components/Card';

export default function AdminPage() {
  const [showcases, setShowcases] = useState([]);
  const [newName, setNewName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchShowcases();
  }, []);

  async function fetchShowcases() {
    const res = await fetch('/api/showcases');
    const data = await res.json();
    setShowcases(data);
  }

  async function handleAdd() {
    if (!newName) return;

    await fetch('/api/showcases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    });
    setNewName('');
    setIsModalOpen(false);
    fetchShowcases();
  }

  async function handleLockChange(showcaseName, checked) {
    await fetch(`/api/showcases/${showcaseName}/lock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: checked }),
    });
    fetchShowcases();
  }

  async function handleLedChange(showcaseName, checked) {
    await fetch(`/api/showcases/${showcaseName}/led`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: checked }),
    });
    fetchShowcases();
  }

  async function handleSpotChange(showcaseName, checked) {
    await fetch(`/api/showcases/${showcaseName}/spot`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: checked }),
    });
    fetchShowcases();
  }

  async function handleLightChange(showcaseName, checked) {
    await fetch(`/api/showcases/${showcaseName}/light`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: checked }),
    });
    fetchShowcases();
  }

  return (
    <div className="min-h-screen text-gray-800 pt-8 pb-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mt-6">Current Showcases</h3>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {showcases.map((showcase) => {
            const temperature =
              Array.isArray(showcase.temps) && showcase.temps.length > 0
                ? showcase.temps[showcase.temps.length - 1]
                : 'N/A';
            const humidity =
              Array.isArray(showcase.humidity) && showcase.humidity.length > 0
                ? showcase.humidity[showcase.humidity.length - 1]
                : 'N/A';
            return (
              <Card
                key={showcase.name}
                showcaseName={showcase.name}
                temperature={temperature}
                humidity={humidity}
                lockOn={!!showcase.lock}
                ledOn={!!showcase.led}
                spotOn={!!showcase.spot}
                lightOn={!!showcase.light}
                onLockChange={(e) => handleLockChange(showcase.name, e.target.checked)}
                onLedChange={(e) => handleLedChange(showcase.name, e.target.checked)}
                onSpotChange={(e) => handleSpotChange(showcase.name, e.target.checked)}
                onLightChange={(e) => handleLightChange(showcase.name, e.target.checked)}
              />
            );
          })}
          <Card isAddCard onAddClick={() => setIsModalOpen(true)} />
        </div>

        {/* MODAL */}
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50
            transition-opacity duration-300 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <div
            className={`bg-white rounded-lg p-6 w-80 flex flex-col space-y-4
              transform transition-transform duration-300 ${isModalOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
          >
            <h2 className="text-gray-800 text-xl font-bold">Add New Showcase</h2>
            <input
              type="text"
              placeholder="Enter new showcase name"
              className="border rounded p-2 text-gray-800"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-300 text-gray-800 font-bold rounded-full px-4 py-2 hover:brightness-125"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-cyan-500 text-gray-800 font-bold rounded-full px-4 py-2 hover:brightness-125"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        {/* END MODAL */}
      </div>
    </div>
  );
}
