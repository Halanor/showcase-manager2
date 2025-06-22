'use client';

export default function ShowcaseList({ showcases }) {
  return (
    <>
      <h3 className="text-3xl font-bold text-center mt-6">Current Showcases</h3>
      <div className="flex flex-wrap justify-center mt-4">
        {showcases.map((showcase, index) => {
          const lastTemp =
            Array.isArray(showcase.temps) && showcase.temps.length > 0
              ? showcase.temps[showcase.temps.length - 1]
              : 'N/A';
          const lastHumidity =
            Array.isArray(showcase.humidity) && showcase.humidity.length > 0
              ? showcase.humidity[showcase.humidity.length - 1]
              : 'N/A';
          const isLightOn = showcase.light && showcase.light.toLowerCase() === 'on';
          
          return (
            <div
              key={index}
              className={`rounded-xl p-3 m-2 flex flex-col items-center text-center flex-1 max-w-[24%]`}
              style={{
                background: 'linear-gradient(160deg, #1c2433, #0d1117)',
                boxShadow: isLightOn
                  ? '0px 0px 12px #0ff'
                  : '0px 0px 12px #ff0080',
                border: `2px solid ${isLightOn ? '#0ff' : '#ff0080'}`,
              }}
            >
              <div className="text-lg font-bold">{showcase.name}</div>
              <div className="text-sm text-gray-300">Temperature: {lastTemp} °</div>
              <div className="text-sm text-gray-300">Humidity: {lastHumidity} %</div>
              <div className="text-sm text-gray-300">Light: {showcase.light || 'N/A'}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
