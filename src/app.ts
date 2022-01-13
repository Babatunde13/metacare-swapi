import { startServer } from "./server"
import { routes } from './server_config';

export const runServer = async () => {
    await startServer({
        port: 3000,
        routes
    })
}
