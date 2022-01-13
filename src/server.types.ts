import { BaseRes } from './api_contracts/base_request.ctrl.contract';

export interface ServerConfig {
    port: number
    routes: Route[]
}

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export interface Route {
    path: string
    method: HttpMethod
    handlers: ((req: any) => BaseRes<any>)[]
}
