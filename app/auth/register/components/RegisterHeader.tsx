import Image from 'next/image'

export default function RegisterHeader() {
  return (
    <div className="text-center">
      <Image
        src="/bongwell-solutions-logo.svg"
        alt="BongWell Solutions Logo"
        width={64}
        height={64}
        className="mx-auto"
      />
      <h2 className="mt-6 text-3xl font-extrabold text-[#001830] dark:text-[#f0f8ff]">
        Admin Registration
      </h2>
      <p className="mt-2 text-sm text-[#4a5568] dark:text-[#b3d9ff]">
        Create your admin account
      </p>
    </div>
  )
}

