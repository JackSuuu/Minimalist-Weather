import Image from "next/image";

const yellow = "#FEE143";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-black p-6 font-[Iceberg]">
      <div className="absolute top-3 text-9xl font-bold text-white">Paris</div>
      <div className="absolute top-45 left-6 text-5xl font-bold text-white">Minimalist</div>
      <div className="absolute top-45 right-14 text-5xl font-bold text-white">Weather</div>
      <div className="absolute bottom-5 text-2xl font-bold text-white font-serif">[This is a weather app]</div>
      {/* Phone Frame */}
      <div
        className="relative w-[320px] h-[660px] rounded-[40px] p-6 flex flex-col gap-4 shadow-xl mt-8 border-8 border-white"
        style={{ backgroundColor: yellow }}
      >
        {/* Header */}
        <div className="flex justify-center items-center">
          <div className="mt-5 text-lg font-bold">Paris</div>

        </div>
        {/* Weather Information */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <div style={{ backgroundColor: 'black', borderRadius: '15px' }} className="text-sm text-white px-4 py-1 mb-2">
            Friday, 20 January
          </div>
          <div className="text-lg">Sunny</div>
          <div className="text-9xl font-bold text-black">31&deg;</div>
          <h3 className="self-start ml-3 font-bold">Daily Summary</h3>
          {/* Plan to use ai to generate summary */}
          <p className="text-xs text-left mt-2 ml-3">
        Now it feels like 35&deg;, actually 31&deg;. It feels hot because of the direct sun. Today, the temperature is felt in the range from 31&deg; to 27&deg;.
          </p>
        </div>
        {/* Weather Stats */}
        <div className="h-40 flex justify-between bg-black text-white p-6 rounded-lg text-sm">
            <div className="flex flex-col items-center">
            <Image src="/wind.svg" alt="Wind Icon" className="w-6 h-6" width={24} height={24} />
            <span>4km/h</span>
            <span>Wind</span>
            </div>
          <div className="flex flex-col items-center">
            <Image src="/water_drop.svg" alt="Wind Icon" className="w-6 h-6" width={24} height={24} />
            <span>48%</span>
            <span>Humidity</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/visibility.svg" alt="Wind Icon" className="w-6 h-6" width={24} height={24} />
            <span>1.6km</span>
            <span>Visibility</span>
          </div>
        </div>
        {/* Weekly Forecast */}
        <div className="mt-2">
          <div className="text-sm font-semibold">Weekly Forecast</div>
          <div className="flex justify-between mt-3 text-xs h-20">
        {["21 Jan", "22 Jan", "23 Jan", "24 Jan"].map((date, idx) => (
            <div key={idx} className="flex flex-col items-center border-2 border-black px-2 py-1 rounded-lg">
            <span>{[26, 25, 27, 26][idx]}&deg;</span>
            <Image
              src={`/${["sunny", "partly_sunny", "rainy_light", "water_drop"][idx]}.svg`}
              alt={["sunny", "partly_sunny", "rainy_light", "water_drop"][idx]}
              width={24}
              height={24}
              className="w-6 h-6 brightness-0 mb-2"
            />
            <span>{date}</span>
            </div>
        ))}
          </div>
        </div>
      </div>
    </div>
  );
}
