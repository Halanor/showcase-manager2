'use client';
import { useRef, useState, useEffect } from 'react';

export default function ShowcaseForm({
  tabIndex,
  newName,
  removeName,
  oldName,
  newRename,
  setNewName,
  setRemoveName,
  setOldName,
  setNewRename,
  handleAdd,
  handleRemove,
  handleRename,
}) {
  const [maxHeight, setMaxHeight] = useState(0);
  const [showRenameButton, setShowRenameButton] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      setMaxHeight(formRef.current.scrollHeight);
      if (tabIndex === 2) {
        setShowRenameButton(false);
        const timeout = setTimeout(() => {
          setShowRenameButton(true);
        }, 500);
        return () => clearTimeout(timeout);
      } else {
        setShowRenameButton(false);
      }
    }
  }, [tabIndex]);

  return (
    <div
      className="bg-gray-100 rounded-xl mt-4 w-1/2 mx-auto overflow-hidden transition-[max-height] duration-500 ease-in-out"
      style={{ maxHeight }}
    >
      <div ref={formRef}>
        <div className="flex flex-col space-y-3 justify-center items-center p-4">
          
          {tabIndex === 0 && (
            <>
              <input
                className="bg-white rounded p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff0080] w-full text-center"
                placeholder="New Showcase Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                className="bg-cyan-500 text-gray-800 font-bold rounded-full p-3 hover:brightness-125"
                onClick={handleAdd}
              >
                Add Showcase
              </button>
            </>
          )}
          
          {tabIndex === 1 && (
            <>
              <input
                className="bg-white rounded p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff0080] w-full text-center"
                placeholder="Showcase Name to Remove"
                value={removeName}
                onChange={(e) => setRemoveName(e.target.value)}
              />
              <button
                className="bg-[#ff0080] text-gray-800 font-bold rounded-full p-3 hover:brightness-125"
                onClick={handleRemove}
              >
                Remove Showcase
              </button>
            </>
          )}
          
          {tabIndex === 2 && (
            <>
              <input
                className="bg-white rounded p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff0080] w-full text-center"
                placeholder="Old Name"
                value={oldName}
                onChange={(e) => setOldName(e.target.value)}
              />
              <input
                className="bg-white rounded p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff0080] w-full text-center"
                placeholder="New Name"
                value={newRename}
                onChange={(e) => setNewRename(e.target.value)}
              />
              <button
                className={`bg-cyan-500 text-gray-800 font-bold rounded-full p-3 hover:brightness-125 transition-opacity duration-300 ease-in-out ${showRenameButton ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleRename}
              >
                Rename Showcase
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
