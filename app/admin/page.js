'use client';
import { useState, useEffect } from 'react';
import Card from '../components/Card';

export default function AdminPage() {
  const [showcases, setShowcases] = useState([]);
  const [newName, setNewName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

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

    if (showcases.some((showcase) => showcase.name.toLowerCase() === newName.toLowerCase())) {
      setErrorMessage(`A showcase named "${newName}" already exists!`);
      setShowErrorModal(true);
      return;
    }

    await fetch('/api/showcases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    });
    setNewName('');
    setIsModalOpen(false);
    fetchShowcases();
  }

  async function handleRename(oldName, newName) {
    if (!newName || oldName === newName) return;

    if (showcases.some((showcase) => showcase.name.toLowerCase() === newName.toLowerCase())) {
      setErrorMessage(`A showcase named "${newName}" already exists! Please pick a different name.`);
      setShowErrorModal(true);
      return;
    }

    const res = await fetch(`/api/showcases`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldName, newName }),
    });

    if (!res.ok) {
      setErrorMessage(`Error renaming showcase. Status ${res.status}`);
      setShowErrorModal(true);
      return;
    }

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
    <div className="min-h-screen text-gray-800 pt-8 pb-8 bg-gray-100 ml-40">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mt-6">Current Showcases</h3>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {showcases.map((showcase) => {
            const lastTemp = Array.isArray(showcase.temps) && showcase.temps.length > 0
              ? showcase.temps[0]
              : 'N/A';
            const lastHumidity = Array.isArray(showcase.humidity) && showcase.humidity.length > 0
              ? showcase.humidity[0]
              : 'N/A';
            return (
              <Card
                key={showcase.name}
                showcaseName={showcase.name}
                temperature={lastTemp}
                humidity={lastHumidity}
                lockOn={!!showcase.lock}
                ledOn={!!showcase.led}
                spotOn={!!showcase.spot}
                lightOn={!!showcase.light}
                onLockChange={(e) => handleLockChange(showcase.name, e.target.checked)}
                onLedChange={(e) => handleLedChange(showcase.name, e.target.checked)}
                onSpotChange={(e) => handleSpotChange(showcase.name, e.target.checked)}
                onLightChange={(e) => handleLightChange(showcase.name, e.target.checked)}
                onRename={(oldName, newName) => handleRename(oldName, newName)}
                temps={showcase.temps}
                humidityValues={showcase.humidity}
              />
            );
          })}
          <Card isAddCard onAddClick={() => setIsModalOpen(true)} />
        </div>
      </div>
    </div>
  );
}
