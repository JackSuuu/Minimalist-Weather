import Image from "next/image";

const yellow = "#FEE143";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="absolute top-3 text-9xl font-bold text-white">Paris</div>
      {/* Phone Frame */}
      <div
        className="relative w-[320px] h-[640px] rounded-[40px] p-6 flex flex-col gap-4 shadow-xl"
        style={{ backgroundColor: yellow }}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Paris</div>
          <div className="text-sm">Friday, 20 January</div>
        </div>
        {/* Weather Information */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="text-lg">Sunny</div>
          <div className="text-9xl font-bold text-black">31&deg;</div>
          <h3 className="self-start">Summary</h3>
          <p className="text-xs text-center mt-2">
        Now it feels like 35&deg;, actually 31&deg;. It feels hot because of the direct sun. Today, the temperature is felt in the range from 31&deg; to 27&deg;.
          </p>
        </div>
        {/* Weather Stats */}
        <div className="h-40 flex justify-between bg-black text-white p-3 rounded-lg text-sm">
          <div className="flex flex-col items-center">
        <span>4km/h</span>
        <span>Wind</span>
          </div>
          <div className="flex flex-col items-center">
        <span>48%</span>
        <span>Humidity</span>
          </div>
          <div className="flex flex-col items-center">
        <span>1.6km</span>
        <span>Visibility</span>
          </div>
        </div>
        {/* Weekly Forecast */}
        <div className="mt-2">
          <div className="text-sm font-semibold">Weekly Forecast</div>
          <div className="flex justify-between mt-2 text-xs">
        {["21 Jan", "22 Jan", "23 Jan", "24 Jan"].map((date, idx) => (
          <div key={idx} className="flex flex-col items-center bg-black text-white px-2 py-1 rounded-lg">
            <span>{[26, 25, 27, 26][idx]}&deg;</span>
            <span>{date}</span>
          </div>
        ))}
          </div>
        </div>
      </div>
    </div>
  );
}
