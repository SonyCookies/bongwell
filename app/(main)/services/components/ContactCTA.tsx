import Link from 'next/link'

export default function ContactCTA() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-xl mb-8 text-[#003366] dark:text-[#b3d9ff]">
        Contact us today to discuss your water needs and how we can help.
      </p>
      <Link
        href="/contact"
        className="bg-[#00a5b5] hover:bg-[#008999] text-white px-8 py-3 rounded-full font-semibold transition-colors inline-block"
      >
        Contact Us
      </Link>
    </div>
  )
}

