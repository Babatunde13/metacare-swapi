import { ReqWithParams, BaseRes } from './base_request.ctrl.contract';
export interface ClientReq {
    query: {
        limit: string
    }
}

export type ClientRes = {
    movies: {
        id: number
        title: string
        year: number
        rating: number
    }[]
}

export type Req = ReqWithParams<ClientReq>
export type Res = BaseRes<ClientRes>
