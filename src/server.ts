import express, { NextFunction, Response } from 'express'
import { ServerConfig } from './server.types';

export const startServer = async (config: ServerConfig) => {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.set('trust proxy', true)

    config.routes.forEach((route) => {
        app[route.method](route.path, async (req: any, res: Response, next: NextFunction) => {
            return route.handlers.forEach(async (handler) => {
                req.dbConnection = config.connection
                const result = await handler(req)
                if (result) {
                    if (result.options && result.options.status) {
                        res.status(result.options.status)
                        delete result.options
                    }
                    res.json(result)
                }
            })

        })
    })
    app.get(['/api/v1/docs', '/docs'], (req, res) => {
        res.redirect('https://documenter.getpostman.com/view/11853513/UVXjKGLS')
    })
    app.get('/', (req, res) => {
        res.send(`Welcome to Metacare Swapi APi, you can access the <a href="${req.protocol}://${req.get('host')}/docs">docs</a> here.`)
    })
    app.use('*', (req, res) => {
        res.status(404).json({
            success: false,
            message: 'Not found',
            data: null
        })
    })

    app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`)
    })
}
