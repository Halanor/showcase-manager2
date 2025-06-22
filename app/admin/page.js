// import { MongoClient } from 'mongodb';
// import Image from 'next/image';
// import ShowcaseController from './models/showcases'

// export default async function Home() {


//     const showcaseController = new ShowcaseController();
//     showcaseController.connect();
//     showcaseController.add('test');
//     showcaseController.close();

//     return (
//         <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//             <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//                 <div className="text-white text-lg">
//                     <strong>
//                         added{/* Name: {doc.name} {doc.surname} */}
//                     </strong>
//                 </div>
//             </main>
//         </div>
//     );
// }

// 'use client';
// import { useState, useEffect } from 'react';

// export default function HomePage() {
//   const [showcases, setShowcases] = useState([]);
//   const [newName, setNewName] = useState('');
//   const [removeName, setRemoveName] = useState('');
//   const [oldName, setOldName] = useState('');
//   const [newRename, setNewRename] = useState('');
//   const [tabIndex, setTabIndex] = useState(0);

//   useEffect(() => {
//     fetchShowcases();
//   }, []);

//   async function fetchShowcases() {
//     const res = await fetch('/api/showcases');
//     const data = await res.json();
//     setShowcases(data);
//   }

//   async function handleAdd() {
//     if (!newName) return;
//     await fetch('/api/showcases', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: newName }),
//     });
//     setNewName('');
//     fetchShowcases();
//   }

//   async function handleRemove() {
//     if (!removeName) return;
//     await fetch('/api/showcases', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: removeName }),
//     });
//     setRemoveName('');
//     fetchShowcases();
//   }

//   async function handleRename() {
//     if (!oldName || !newRename) return;
//     await fetch('/api/showcases', {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ oldName, newName: newRename }),
//     });
//     setOldName('');
//     setNewRename('');
//     fetchShowcases();
//   }

//   return (
//       <div className="min-h-screen text-gray-100 
//           pt-8 pb-8 bg-[linear-gradient(135deg,#0a0c10_20%,#1f2937_100%)]"
//       >


//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-5xl font-bold text-center">Showcase Manager</h1>
//         <h2 className="text-3xl font-bold text-center mt-2">Manage Showcases</h2>

//         <div className="flex justify-center mt-4 space-x-4 text-gray-400">
//           <button
//             className={`pb-2 font-bold ${tabIndex === 0 ? 'border-b-2 border-[#0ff] text-[#0ff]' : ''}`}
//             onClick={() => setTabIndex(0)}
//           >
//             Add
//           </button>
//           <button
//             className={`pb-2 font-bold ${tabIndex === 1 ? 'border-b-2 border-[#0ff] text-[#0ff]' : ''}`}
//             onClick={() => setTabIndex(1)}
//           >
//             Remove
//           </button>
//           <button
//             className={`pb-2 font-bold ${tabIndex === 2 ? 'border-b-2 border-[#0ff] text-[#0ff]' : ''}`}
//             onClick={() => setTabIndex(2)}
//           >
//             Rename
//           </button>
//         </div>

//         {tabIndex === 0 && (
//           <div className="bg-[#1c2433] rounded-xl p-4 mt-4 w-1/2 mx-auto flex flex-col space-y-3">
//             <input
//               className="bg-[#1c2433] rounded p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff0080]"
//               placeholder="New Showcase Name"
//               value={newName}
//               onChange={(e) => setNewName(e.target.value)}
//             />
//             <button
//               className="bg-[#0ff] text-[#0d1117] font-bold rounded-full p-3 hover:brightness-125"
//               onClick={handleAdd}
//             >
//               Add Showcase
//             </button>
//           </div>
//         )}

//         {tabIndex === 1 && (
//           <div className="bg-[#1c2433] rounded-xl p-4 mt-4 w-1/2 mx-auto flex flex-col space-y-3">
//             <input
//               className="bg-[#1c2433] rounded p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff0080]"
//               placeholder="Showcase Name to Remove"
//               value={removeName}
//               onChange={(e) => setRemoveName(e.target.value)}
//             />
//             <button
//               className="bg-[#ff0080] text-[#0d1117] font-bold rounded-full p-3 hover:brightness-125"
//               onClick={handleRemove}
//             >
//               Remove Showcase
//             </button>
//           </div>
//         )}

//         {tabIndex === 2 && (
//           <div className="bg-[#1c2433] rounded-xl p-4 mt-4 w-1/2 mx-auto flex flex-col space-y-3">
//             <input
//               className="bg-[#1c2433] rounded p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff0080]"
//               placeholder="Old Name"
//               value={oldName}
//               onChange={(e) => setOldName(e.target.value)}
//             />
//             <input
//               className="bg-[#1c2433] rounded p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff0080]"
//               placeholder="New Name"
//               value={newRename}
//               onChange={(e) => setNewRename(e.target.value)}
//             />
//             <button
//               className="bg-[#0ff] text-[#0d1117] font-bold rounded-full p-3 hover:brightness-125"
//               onClick={handleRename}
//             >
//               Rename Showcase
//             </button>
//           </div>
//         )}

//         <h3 className="text-3xl font-bold text-center mt-6">Current Showcases</h3>
//         <div className="flex flex-wrap justify-center mt-4">
//           {showcases.map((showcase, index) => {
//             const lastTemp = Array.isArray(showcase.temps) && showcase.temps.length > 0
//               ? showcase.temps[showcase.temps.length - 1]
//               : 'N/A';
//             const lastHumidity = Array.isArray(showcase.humidity) && showcase.humidity.length > 0
//               ? showcase.humidity[showcase.humidity.length - 1]
//               : 'N/A';
//             const isLightOn = showcase.light && showcase.light.toLowerCase() === 'on';
//             return (
//               <div
//                 key={index}
//                 className={`rounded-xl p-3 m-2 flex flex-col items-center text-center flex-1 max-w-[21%]`}
//                 style={{
//                   background: 'linear-gradient(160deg, #1c2433, #0d1117)',
//                   boxShadow: isLightOn
//                     ? '0px 0px 12px #0ff'
//                     : '0px 0px 12px #ff0080',
//                   border: `2px solid ${isLightOn ? '#0ff' : '#ff0080'}`,
//                 }}
//               >
//                 <div className="text-lg font-bold">{showcase.name}</div>
//                 <div className="text-sm text-gray-300">Temperature: {lastTemp} °</div>
//                 <div className="text-sm text-gray-300">Humidity: {lastHumidity} %</div>
//                 <div className="text-sm text-gray-300">Light: {showcase.light || 'N/A'}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import ShowcaseForm from '../components/ShowcaseForm';
import ShowcaseList from '../components/ShowcaseList';

export default function AdminPage() {
  const [showcases, setShowcases] = useState([]);
  const [newName, setNewName] = useState('');
  const [removeName, setRemoveName] = useState('');
  const [oldName, setOldName] = useState('');
  const [newRename, setNewRename] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

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
    fetchShowcases();
  }

  async function handleRemove() {
    if (!removeName) return;
    await fetch('/api/showcases', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: removeName }),
    });
    setRemoveName('');
    fetchShowcases();
  }

  async function handleRename() {
    if (!oldName || !newRename) return;
    await fetch('/api/showcases', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldName, newName: newRename }),
    });
    setOldName('');
    setNewRename('');
    fetchShowcases();
  }

  return (
    <div className="min-h-screen text-gray-100 pt-8 pb-8 bg-[linear-gradient(135deg,#0d1117_30%,#1c2433_100%)]">
      <div className="max-w-2xl mx-auto">
        <AdminHeader tabIndex={tabIndex} setTabIndex={setTabIndex} />
        <ShowcaseForm
          tabIndex={tabIndex}
          newName={newName}
          removeName={removeName}
          oldName={oldName}
          newRename={newRename}
          setNewName={setNewName}
          setRemoveName={setRemoveName}
          setOldName={setOldName}
          setNewRename={setNewRename}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          handleRename={handleRename}
        />
        <ShowcaseList showcases={showcases} />
      </div>
    </div>
  );
}






