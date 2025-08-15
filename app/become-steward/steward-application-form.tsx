'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function StewardApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('/api/steward-application', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.success && data.redirect) {
        window.location.href = data.redirect
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
            What skills can you offer? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Cleaning',
              'Handyman',
              'Moving',
              'Furniture Assembly',
              'Electrical',
              'Plumbing',
              'Painting',
              'Gardening',
              'Tech Support',
              'Personal Assistant',
              'Pet Care',
              'Tutoring',
              'Other'
            ].map((skill) => (
              <div key={skill} className="flex items-center">
                <input
                  id={`skill-${skill}`}
                  name="skills"
                  value={skill}
                  type="checkbox"
                  className="h-4 w-4 text-chazon-primary focus:ring-chazon-primary border-gray-300 rounded"
                />
                <label htmlFor={`skill-${skill}`} className="ml-2 block text-sm text-gray-700">
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Tell us about your experience
          </label>
          <textarea
            id="experience"
            name="experience"
            rows={4}
            className="shadow-sm focus:ring-chazon-primary focus:border-chazon-primary block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Describe your relevant experience, certifications, or training"
            required
          />
        </div>

        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            id="availability"
            name="availability"
            className="shadow-sm focus:ring-chazon-primary focus:border-chazon-primary block w-full sm:text-sm border-gray-300 rounded-md"
            required
          >
            <option value="">Select your availability</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="weekends">Weekends only</option>
            <option value="evenings">Evenings only</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label htmlFor="service-area" className="block text-sm font-medium text-gray-700 mb-1">
            Service Area (miles from your location)
          </label>
          <select
            id="service-area"
            name="serviceArea"
            className="shadow-sm focus:ring-chazon-primary focus:border-chazon-primary block w-full sm:text-sm border-gray-300 rounded-md"
            required
          >
            <option value="">Select service area</option>
            <option value="5">5 miles</option>
            <option value="10">10 miles</option>
            <option value="15">15 miles</option>
            <option value="20">20 miles</option>
            <option value="25">25+ miles</option>
          </select>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Short Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            className="shadow-sm focus:ring-chazon-primary focus:border-chazon-primary block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Tell potential clients about yourself"
            required
          />
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="focus:ring-chazon-primary h-4 w-4 text-chazon-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              I agree to the <a href="#" className="text-chazon-primary hover:underline">Terms of Service</a> and <a href="#" className="text-chazon-primary hover:underline">Privacy Policy</a>
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="background-check"
              name="backgroundCheck"
              type="checkbox"
              required
              className="focus:ring-chazon-primary h-4 w-4 text-chazon-primary border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="background-check" className="font-medium text-gray-700">
              I consent to a background check as part of the verification process
            </label>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-chazon-primary hover:bg-chazon-primary-dark text-white font-medium py-3 rounded-lg transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </div>
    </form>
  )
}