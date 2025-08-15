import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { StewardApplicationForm } from './steward-application-form'

export default async function BecomeStewardPage() {
  const session = await getServerSession(authOptions)
  
  // If user is already logged in, redirect them to the application form section
  // Otherwise, they'll see the marketing content first
  const isLoggedIn = !!session

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-chazon-primary to-chazon-blue hero-pattern py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Share Your Skills,<br />
                  Earn Your Way
                </h1>
                <p className="text-xl mb-8 text-white/90">
                  Join our community of skilled Stewards and start earning on your own schedule.
                  Set your rates, choose your services, and build your client base.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#apply" className="bg-white text-chazon-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-lg transition-colors duration-200">
                    Apply Now
                  </a>
                  <a href="#how-it-works" className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium text-lg transition-colors duration-200">
                    Learn More
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Steward helping a client"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50" id="benefits">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Become a Steward?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of professionals who are building flexible careers on their own terms.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-chazon-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-chazon-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexible Income</h3>
                <p className="text-gray-600">
                  Set your own rates and work when you want. You're in control of how much you earn.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-chazon-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-chazon-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexible Schedule</h3>
                <p className="text-gray-600">
                  Choose when you work and which jobs you take. Create a schedule that fits your life.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-chazon-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-chazon-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Insurance Coverage</h3>
                <p className="text-gray-600">
                  We provide liability insurance for all verified Stewards while performing services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Getting started as a Steward is simple. Follow these steps to begin your journey.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-chazon-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Apply</h3>
                <p className="text-gray-600">
                  Fill out our simple application form with your skills and experience.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-chazon-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Verified</h3>
                <p className="text-gray-600">
                  Complete our verification process, including background checks.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-chazon-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Create Profile</h3>
                <p className="text-gray-600">
                  Set up your profile, add your services, and set your rates.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-chazon-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-3">Start Earning</h3>
                <p className="text-gray-600">
                  Accept booking requests and start providing services to clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hear From Our Stewards</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our Stewards have to say.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <Image
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Steward"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Johnson</h4>
                    <p className="text-gray-600 text-sm">Handyman, 2 years</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Becoming a Steward has allowed me to turn my handyman skills into a flexible business. I've built a loyal client base and now earn more than I did at my previous job."
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <Image
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Steward"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Williams</h4>
                    <p className="text-gray-600 text-sm">House Cleaner, 1 year</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I started cleaning houses part-time while in school. The flexibility is perfect for my schedule, and the platform makes it easy to find clients and manage bookings."
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <Image
                      src="https://randomuser.me/api/portraits/men/67.jpg"
                      alt="Steward"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">David Chen</h4>
                    <p className="text-gray-600 text-sm">Tech Support, 3 years</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I've been providing tech support services for three years now. The platform handles all the marketing and payments, so I can focus on what I do best - helping people with their tech issues."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 bg-white" id="apply">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Apply to Become a Steward</h2>
              <p className="text-xl text-gray-600">
                Fill out the form below to start your application process.
              </p>
            </div>

            {isLoggedIn ? (
              <StewardApplicationForm />
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Please sign in to apply to become a Steward.
                </p>
                <a href="/auth/signin">
                  <Button
                    className="bg-chazon-primary hover:bg-chazon-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Sign In to Apply
                  </Button>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">
                Have questions? We've got answers.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">How much can I earn as a Steward?</h3>
                <p className="text-gray-600">
                  Earnings vary based on your skills, rates, and how often you work. Many of our Stewards earn between $20-50 per hour, with specialized skills commanding higher rates.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">How long does the application process take?</h3>
                <p className="text-gray-600">
                  Typically, the application review takes 2-3 business days. Background checks may take an additional 3-5 business days to complete.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">What fees does Chazon charge?</h3>
                <p className="text-gray-600">
                  Chazon takes a 15% service fee from each booking to cover platform costs, payment processing, marketing, and insurance coverage.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">How do I get paid?</h3>
                <p className="text-gray-600">
                  Payments are processed within 24 hours after a job is completed. You can receive payments via direct deposit to your bank account or through PayPal.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">What if I need to cancel a booking?</h3>
                <p className="text-gray-600">
                  We understand that emergencies happen. You can cancel a booking, but we encourage providing as much notice as possible to maintain your reputation and rating.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}