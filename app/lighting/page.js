'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LightingPage() {
  const [showcases, setShowcases] = useState([]);
  const [selectedShowcases, setSelectedShowcases] = useState([]);
  const [allOn, setAllOn] = useState(false);
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert("You must be logged in.");
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

    // check all lights are on for all on/off button
    const everyOn = data.every(
      (s) => s.led && s.spot && s.light
    );
    setAllOn(everyOn);
  }

  async function handleAllToggle() {
    const newValue = !allOn;
    setAllOn(newValue);

    await Promise.all(
      showcases.map(async (s) => {
        await updateShowcaseLights(s.name, newValue);
      })
    );

    await fetchShowcases();
  }

  async function handleSelectedOn() {
    if (selectedShowcases.length === 0) return;

    await Promise.all(
      selectedShowcases.map(async (name) => {
        await updateShowcaseLights(name, true);
      })
    );

    // clear selection
    setSelectedShowcases([]); 
    await fetchShowcases();
  }

  async function handleSelectedOff() {
    if (selectedShowcases.length === 0) return;

    await Promise.all(
      selectedShowcases.map(async (name) => {
        await updateShowcaseLights(name, false);
      })
    );

    // clear selection
    setSelectedShowcases([]);
    await fetchShowcases();
  }

  async function updateShowcaseLights(name, value) {
    await fetch(`/api/showcases/${name}/led`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });
    await fetch(`/api/showcases/${name}/spot`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });
    await fetch(`/api/showcases/${name}/light`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });
  }

  const toggleSelect = (name) => {
    setSelectedShowcases((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen text-gray-800 pt-8 pb-8 bg-gray-100 ml-40">
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-3xl font-bold text-center">Lighting Control</h3>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 justify-center">
          {/* Toggle all */}
          <button
            onClick={handleAllToggle}
            className={`w-64 py-4 rounded font-bold text-lg transition-colors duration-300 ${
              allOn ? 'bg-green-700 text-white' : 'bg-gray-400 text-white'
            }`}
          >
            {allOn ? 'Turn All Lights Off' : 'Turn All Lights On'}
          </button>

          {/* turn selected "on" */}
          <button
            onClick={handleSelectedOn}
            className={`w-64 py-4 rounded font-bold text-lg transition-colors duration-300 ${
              selectedShowcases.length > 0
                ? 'bg-green-700 text-white'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            disabled={selectedShowcases.length === 0}
          >
            Turn Selected Lights On
          </button>

          {/* turn selected "off" */}
          <button
            onClick={handleSelectedOff}
            className={`w-64 py-4 rounded font-bold text-lg transition-colors duration-300 ${
              selectedShowcases.length > 0
                ? 'bg-red-700 text-white'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            disabled={selectedShowcases.length === 0}
          >
            Turn Selected Lights Off
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {showcases.map((s) => {
            const anyOn = s.led || s.spot || s.light;
            return (
              <div
                key={s.name}
                onClick={() => toggleSelect(s.name)}
                className={`cursor-pointer border rounded p-4 flex flex-col items-center justify-center text-center font-semibold space-y-2 ${
                  selectedShowcases.includes(s.name)
                    ? 'bg-yellow-200 border-yellow-400'
                    : 'bg-white border-gray-300 hover:bg-gray-100'
                }`}
              >
                <img
                  src={anyOn ? '/bulb-on.svg' : '/bulb-off.svg'}
                  alt={anyOn ? 'Lights On' : 'Lights Off'}
                  className="w-6 h-6"
                />
                <span>{s.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
