import 'reflect-metadata'
import createConnection from '../database'
import app from '../app'
class Server {
    static async start(port: number | string): Promise<void> {
        try {
            const connection = await createConnection()
            if (!connection.isConnected) throw new Error("Failed to connect to the database!")

            app.listen(port, () => console.log(`Server running at ${port}`))
        } catch (error) {
            console.log(error)
        }
    }
}

Server.start(process.env.PORT)