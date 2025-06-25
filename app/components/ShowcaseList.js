'use client';
import Card from './Card';

export default function ShowcaseList({ showcases, onAddClick }) {
  return (
    <>
      <h3 className="text-3xl font-bold text-center mt-6">Current Showcases</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 justify-items-center">
        {showcases.map((showcase, index) => (
          <Card
            key={index}
            showcaseName={showcase.name}
            temperature={showcase.temps?.[showcase.temps.length - 1] || 'N/A'}
            humidity={showcase.humidity?.[showcase.humidity.length - 1] || 'N/A'}
            lockOn={showcase.lock && showcase.lock.toLowerCase() === 'on'}
            ledOn={showcase.led && showcase.led.toLowerCase() === 'on'}
            spotOn={showcase.spot && showcase.spot.toLowerCase() === 'on'}
            onLockChange={() => {}}
            onLedChange={() => {}}
            onSpotChange={() => {}}
          />
        ))}

        <Card isAddCard onAddClick={onAddClick} />
      </div>
    </>
  );
}
