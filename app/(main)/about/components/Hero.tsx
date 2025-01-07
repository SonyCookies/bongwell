import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/water-well.jpg"
        alt="Water Well"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
        priority
      />
      <div className="absolute inset-0 bg-[#00a5b5] opacity-50 z-10"></div>
      <div className="relative z-20 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About BongWell Solutions</h1>
        <p className="text-xl md:text-2xl">Bringing Clean Water to Communities Since 2010</p>
      </div>
    </div>
  )
}

