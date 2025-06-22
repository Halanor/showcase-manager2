'use client';

export default function AdminHeader({ tabIndex, setTabIndex }) {
  return (
    <>
      <h1 className="text-5xl font-bold text-center">Showcase Manager</h1>
      <h2 className="text-3xl font-bold text-center mt-2">Manage Showcases</h2>
      <div className="flex justify-center mt-4 space-x-4 text-gray-400">
        <button
          className={`pb-2 font-bold ${tabIndex === 0 ? 'border-b-2 border-[#0ff] text-[#0ff]' : ''}`}
          onClick={() => setTabIndex(0)}
        >
          Add
        </button>
        <button
          className={`pb-2 font-bold ${tabIndex === 1 ? 'border-b-2 border-[#0ff] text-[#0ff]' : ''}`}
          onClick={() => setTabIndex(1)}
        >
          Remove
        </button>
        <button
          className={`pb-2 font-bold ${tabIndex === 2 ? 'border-b-2 border-[#0ff] text-[#0ff]' : ''}`}
          onClick={() => setTabIndex(2)}
        >
          Rename
        </button>
      </div>
    </>
  );
}
