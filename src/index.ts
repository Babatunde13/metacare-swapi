import { startServer } from './server'
import { routes } from './server_config'
import envs from './envs'

export const runServer = async () => {
    await startServer({
        port: envs.port,
        routes
    })
}

runServer()
