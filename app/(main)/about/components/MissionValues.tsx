import { Check } from 'lucide-react'

export default function MissionValues() {
  const values = [
    "Sustainability: Ensuring long-term access to clean water",
    "Innovation: Utilizing cutting-edge technology in well drilling",
    "Community: Empowering local communities through water solutions",
    "Integrity: Maintaining the highest standards of ethical practices",
  ]

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-[#00a5b5]">Our Mission</h2>
          <p className="text-lg mb-6">
            At BongWell Solutions, our mission is to provide sustainable access to clean water for communities worldwide. We strive to implement innovative well drilling techniques and water pump solutions that transform lives and foster development.
          </p>
          <p className="text-lg">
            Through our expertise and dedication, we aim to address water scarcity issues and contribute to the overall well-being of the communities we serve.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6 text-[#00a5b5]">Our Values</h2>
          <ul className="space-y-4">
            {values.map((value, index) => (
              <li key={index} className="flex items-start">
                <Check className="mr-2 mt-1 text-[#00a5b5]" />
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

