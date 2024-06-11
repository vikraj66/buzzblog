import dotenv
dotenv.config()
export const BASEURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : process.env.SERVER_URL

