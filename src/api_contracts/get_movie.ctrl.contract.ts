import { ReqWithParams, BaseRes } from './base_request.ctrl.contract';

export interface ClientReq {
    params: {
        id: string
    }
}

export interface ClientRes {
    movie: {
        id: number
        title: string
        year: number
        rating: number
    }
}

export type Req = ReqWithParams<ClientReq>
export type Res = BaseRes<ClientRes>
