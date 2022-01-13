import express, { NextFunction, Response } from 'express'
import { BaseReq } from './api_contracts/base_request.ctrl.contract';
import { ServerConfig } from './server.types';

export const startServer = async (config: ServerConfig) => {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    config.routes.forEach((route) => {
        app[route.method](route.path, async (req: BaseReq, res: Response, next: NextFunction) => {
            return route.handlers.forEach(async (handler) => {
                const result = await handler(req)
                if (result) {
                    if (result.options && result.options.status) {
                        res.status(result.options.status)
                        delete result.options
                    }
                    res.json(result)
                } else {
                    next()
                }
            })

        })
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
