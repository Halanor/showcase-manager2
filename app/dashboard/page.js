'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../components/Card';

export default function DashboardPage() {
  const [showcases, setShowcases] = useState([]);
  const [newName, setNewName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [role, setRole] = useState('');

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert("You must be logged in to access the dashboard.");
      router.push('/');
      return;
    }
    const parsed = JSON.parse(storedUser);
    setRole(parsed.role);
    fetchShowcases();
  }, [router]);

  async function fetchShowcases() {
    const res = await fetch('/api/showcases');
    const data = await res.json();
    setShowcases(data);
  }

  async function handleAdd() {
    if (!newName) return;
    if (showcases.some((s) => s.name.toLowerCase() === newName.toLowerCase())) {
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
    if (showcases.some((s) => s.name.toLowerCase() === newName.toLowerCase())) {
      setErrorMessage(`A showcase named "${newName}" already exists.`);
      setShowErrorModal(true);
      return;
    }
    const res = await fetch('/api/showcases', {
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

  async function handleLockChange(name, checked) {
    await fetch(`/api/showcases/${name}/lock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: checked }),
    });
    fetchShowcases();
  }

  async function handleLedChange(name, checked) {
    await fetch(`/api/showcases/${name}/led`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: checked }),
    });
    fetchShowcases();
  }

  async function handleSpotChange(name, checked) {
    await fetch(`/api/showcases/${name}/spot`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: checked }),
    });
    fetchShowcases();
  }

  async function handleLightChange(name, checked) {
    await fetch(`/api/showcases/${name}/light`, {
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
          {showcases.map((s) => {
            const lastTemp = Array.isArray(s.temps) && s.temps.length > 0 ? s.temps[0] : 'N/A';
            const lastHumidity = Array.isArray(s.humidity) && s.humidity.length > 0 ? s.humidity[0] : 'N/A';
            return (
              <Card
                key={s.name}
                showcaseName={s.name}
                temperature={lastTemp}
                humidity={lastHumidity}
                lockOn={!!s.lock}
                ledOn={!!s.led}
                spotOn={!!s.spot}
                lightOn={!!s.light}
                onLockChange={
                  role !== 'maintenance' ? (e) => handleLockChange(s.name, e.target.checked) : undefined
                }
                onLedChange={(e) => handleLedChange(s.name, e.target.checked)}
                onSpotChange={(e) => handleSpotChange(s.name, e.target.checked)}
                onLightChange={(e) => handleLightChange(s.name, e.target.checked)}
                onRename={
                  role === 'admin' ? (oldName, newName) => handleRename(oldName, newName) : undefined
                }
                role={role}
                temps={s.temps}
                humidityValues={s.humidity}
              />
            );
          })}
          {role === 'admin' && <Card isAddCard onAddClick={() => setIsModalOpen(true)} />}
        </div>
      </div>

      {/* showcase added pop */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 flex flex-col space-y-4">
            <h2 className="text-gray-800 text-xl font-bold">Add Showcase</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-2 rounded"
              placeholder="Showcase name"
            />
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-300 text-gray-800 font-bold rounded px-4 py-2 hover:brightness-110"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-gray-600 text-white font-bold rounded px-4 py-2 hover:brightness-110"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* error pop */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 flex flex-col space-y-4">
            <h2 className="text-gray-800 text-xl font-bold">Error</h2>
            <p>{errorMessage}</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-600 text-white font-bold rounded px-4 py-2 hover:brightness-110"
                onClick={() => setShowErrorModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
