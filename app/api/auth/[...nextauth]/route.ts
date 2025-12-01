/* Backend function commented out to keep only frontend working */

// Mock handlers that return empty responses
const mockHandler = async () => new Response(JSON.stringify({}), { status: 200 })
export { mockHandler as GET, mockHandler as POST }
