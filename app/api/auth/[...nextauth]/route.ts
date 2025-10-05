import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

/* Backend function commented out to keep only frontend working
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
*/

// Mock handlers that return empty responses
const mockHandler = async () => new Response(JSON.stringify({}), { status: 200 })
export { mockHandler as GET, mockHandler as POST }