import { Metadata } from 'next'
import ContactHero from './components/ContactHero'
import ContactForm from './components/ContactForm'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | BongWell Solutions',
  description: 'Get in touch with BongWell Solutions for innovative water solutions and expert well drilling services.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-[#001830] dark:to-[#002040]">
      <ContactHero />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="bg-white dark:bg-[#002040] rounded-lg shadow-lg p-8 text-gray-800 dark:text-gray-200 self-start">
            <h2 className="text-2xl font-bold mb-6 text-[#00a5b5]">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-[#00a5b5] mr-4" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600 dark:text-gray-400">info@bongwellsolutions.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-[#00a5b5] mr-4" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-[#00a5b5] mr-4" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600 dark:text-gray-400">123 Water St, Aquaville, AQ 12345</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-[#00a5b5] mr-4" />
                <div>
                  <p className="font-semibold">Business Hours</p>
                  <p className="text-gray-600 dark:text-gray-400">Mon - Fri: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-600 dark:text-gray-400">Sat: 10:00 AM - 2:00 PM</p>
                  <p className="text-gray-600 dark:text-gray-400">Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

