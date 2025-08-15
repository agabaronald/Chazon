import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'handyman' },
      update: {},
      create: {
        name: 'Handyman',
        description: 'General repairs and maintenance',
        slug: 'handyman',
        icon: 'hammer',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'moving' },
      update: {},
      create: {
        name: 'Moving',
        description: 'Help with moving and packing',
        slug: 'moving',
        icon: 'truck',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cleaning' },
      update: {},
      create: {
        name: 'Cleaning',
        description: 'Home and office cleaning',
        slug: 'cleaning',
        icon: 'sparkles',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'furniture-assembly' },
      update: {},
      create: {
        name: 'Furniture Assembly',
        description: 'IKEA and other furniture assembly',
        slug: 'furniture-assembly',
        icon: 'wrench',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tv-mounting' },
      update: {},
      create: {
        name: 'TV Mounting',
        description: 'Wall mounting and setup',
        slug: 'tv-mounting',
        icon: 'tv',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'delivery' },
      update: {},
      create: {
        name: 'Delivery',
        description: 'Pick up and delivery service',
        slug: 'delivery',
        icon: 'package',
      },
    }),
  ])

  console.log('✅ Categories created')

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'sarah.johnson@example.com' },
      update: {},
      create: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        password: hashedPassword,
        phone: '+1-555-0101',
        bio: 'Professional handyman with 8+ years of experience. Specializing in furniture assembly and home repairs.',
        location: 'Downtown, Seattle',
        isSteward: true,
        isVerified: true,
        rating: 4.9,
        totalReviews: 127,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      },
    }),
    prisma.user.upsert({
      where: { email: 'michael.chen@example.com' },
      update: {},
      create: {
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        password: hashedPassword,
        phone: '+1-555-0102',
        bio: 'Reliable moving specialist with a truck. Available for same-day moving and delivery services.',
        location: 'Capitol Hill, Seattle',
        isSteward: true,
        isVerified: true,
        rating: 4.8,
        totalReviews: 89,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      },
    }),
    prisma.user.upsert({
      where: { email: 'emily.rodriguez@example.com' },
      update: {},
      create: {
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@example.com',
        password: hashedPassword,
        phone: '+1-555-0103',
        bio: 'Detail-oriented cleaning professional. Eco-friendly products available upon request.',
        location: 'Ballard, Seattle',
        isSteward: true,
        isVerified: true,
        rating: 5.0,
        totalReviews: 203,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      },
    }),
    prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: hashedPassword,
        phone: '+1-555-0104',
        bio: 'Regular customer looking for help with various tasks.',
        location: 'Fremont, Seattle',
        isSteward: false,
        isVerified: true,
        rating: 0,
        totalReviews: 0,
      },
    }),
  ])

  console.log('✅ Users created')

  // Create steward profiles
  const stewardProfiles = await Promise.all([
    prisma.stewardProfile.upsert({
      where: { userId: users[0].id },
      update: {},
      create: {
        userId: users[0].id,
        hourlyRate: 45,
        availability: {
          monday: { start: '09:00', end: '17:00', available: true },
          tuesday: { start: '09:00', end: '17:00', available: true },
          wednesday: { start: '09:00', end: '17:00', available: true },
          thursday: { start: '09:00', end: '17:00', available: true },
          friday: { start: '09:00', end: '17:00', available: true },
          saturday: { start: '10:00', end: '16:00', available: true },
          sunday: { start: '10:00', end: '16:00', available: false },
        },
        skills: ['Furniture Assembly', 'TV Mounting', 'Handyman', 'Home Repair'],
        experience: '8+ years of professional handyman experience',
        portfolio: [
          'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        ],
        backgroundCheck: true,
        insuranceVerified: true,
      },
    }),
    prisma.stewardProfile.upsert({
      where: { userId: users[1].id },
      update: {},
      create: {
        userId: users[1].id,
        hourlyRate: 55,
        availability: {
          monday: { start: '08:00', end: '18:00', available: true },
          tuesday: { start: '08:00', end: '18:00', available: true },
          wednesday: { start: '08:00', end: '18:00', available: true },
          thursday: { start: '08:00', end: '18:00', available: true },
          friday: { start: '08:00', end: '18:00', available: true },
          saturday: { start: '09:00', end: '17:00', available: true },
          sunday: { start: '09:00', end: '17:00', available: true },
        },
        skills: ['Moving', 'Delivery', 'Heavy Lifting', 'Packing'],
        experience: '5+ years of moving and delivery services',
        portfolio: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        ],
        backgroundCheck: true,
        insuranceVerified: true,
      },
    }),
    prisma.stewardProfile.upsert({
      where: { userId: users[2].id },
      update: {},
      create: {
        userId: users[2].id,
        hourlyRate: 40,
        availability: {
          monday: { start: '09:00', end: '15:00', available: true },
          tuesday: { start: '09:00', end: '15:00', available: true },
          wednesday: { start: '09:00', end: '15:00', available: true },
          thursday: { start: '09:00', end: '15:00', available: true },
          friday: { start: '09:00', end: '15:00', available: true },
          saturday: { start: '10:00', end: '14:00', available: true },
          sunday: { start: '10:00', end: '14:00', available: false },
        },
        skills: ['Cleaning', 'Organization', 'Deep Cleaning', 'Eco-friendly'],
        experience: '6+ years of professional cleaning services',
        portfolio: [
          'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop',
        ],
        backgroundCheck: true,
        insuranceVerified: true,
      },
    }),
  ])

  console.log('✅ Steward profiles created')

  // Create services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        title: 'IKEA Furniture Assembly',
        description: 'Professional assembly of IKEA furniture including beds, dressers, desks, and more. Tools and expertise included.',
        price: 45,
        duration: 120,
        categoryId: categories[3].id, // furniture-assembly
        stewardId: users[0].id,
        images: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&h=400&fit=crop',
        ],
      },
    }),
    prisma.service.create({
      data: {
        title: 'Apartment Moving Help',
        description: 'Complete moving assistance including packing, loading, transportation, and unloading. Truck available.',
        price: 55,
        duration: 240,
        categoryId: categories[1].id, // moving
        stewardId: users[1].id,
        images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        ],
      },
    }),
    prisma.service.create({
      data: {
        title: 'Deep House Cleaning',
        description: 'Thorough cleaning service including all rooms, bathrooms, kitchen, and common areas. Eco-friendly products available.',
        price: 40,
        duration: 180,
        categoryId: categories[2].id, // cleaning
        stewardId: users[2].id,
        images: [
          'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&h=400&fit=crop',
        ],
      },
    }),
    prisma.service.create({
      data: {
        title: 'TV Wall Mounting',
        description: 'Professional TV mounting service with cable management and setup. All mounting hardware included.',
        price: 75,
        duration: 90,
        categoryId: categories[4].id, // tv-mounting
        stewardId: users[0].id,
        images: [
          'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop',
        ],
      },
    }),
  ])

  console.log('✅ Services created')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })