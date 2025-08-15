import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting script to activate services...')
  const result = await prisma.service.updateMany({
    where: { isActive: false },
    data: { isActive: true },
  })

  console.log(`Successfully activated ${result.count} services.`)
  console.log('All services should now be visible on the site.')
}

main()
  .catch((e) => {
    console.error('An error occurred while activating services:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
