import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        database: {
            name: process.env.DB_NAME,
            port: process.env.DB_PORT,
            connection: process.env.DB_CONNECTION
        },
        apiKey: process.env.API_KEY
    }
})