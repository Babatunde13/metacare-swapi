import cluster, { Worker } from 'cluster'
import os from 'os'
import { startServer } from './server'
import { routes } from './server_config'
import envs from './envs'

export const runServer = async () => {
    const forks = new Set<Worker>()
    if (cluster.isMaster) {
        for (let i = 0; i < os.cpus().length; i++) {
            const worker = cluster.fork()
            forks.add(worker)
        }
        cluster.on('exit', (worker: Worker) => {
            console.log(`worker ${worker.process.pid} died`)
            forks.delete(worker)
            const newWorker = cluster.fork()
            forks.add(newWorker)
        })
    } else {
        await startServer({
            port: envs.port,
            routes
        })
    }
}

runServer()
