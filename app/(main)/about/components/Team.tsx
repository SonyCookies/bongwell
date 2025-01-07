import Image from 'next/image'

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "/images/team-member-1.jpg",
  },
  {
    name: "Jane Smith",
    role: "Head of Engineering",
    image: "/images/team-member-2.jpg",
  },
  {
    name: "Mike Johnson",
    role: "Lead Hydrologist",
    image: "/images/team-member-3.jpg",
  },
  {
    name: "Sarah Brown",
    role: "Community Outreach Director",
    image: "/images/team-member-4.jpg",
  },
]

export default function Team() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center text-[#00a5b5]">Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
            <p className="text-[#00a5b5]">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

