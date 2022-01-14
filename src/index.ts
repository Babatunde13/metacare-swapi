import { createConnection } from 'typeorm'
import { startServer } from './server'
import { routes } from './server_config'
import envs from './envs'
// import { createDbConnection } from './db_connection'

export const runServer = async () => {
    const connection = await createConnection()
    await startServer({
        port: envs.port,
        routes,
        connection
    })
}

runServer()
