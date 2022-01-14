import { BaseRes } from './api_contracts/base_request.ctrl.contract';
import { Connection } from 'typeorm';

export interface ServerConfig {
    port: number
    routes: Route[],
    connection: Connection
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
