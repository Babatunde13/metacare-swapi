import { ReqWithParams, BaseRes } from './base_request.ctrl.contract';

export interface ClientReq {
    params: {
        id: string
    }
    body: {
        comment: string
    }
}

export interface ClientRes {
    id: number
    movieId: number
    movieTitle: string
    comment: {
        id: number
        comment: string
        createdAt: string
        updatedAt: string,
        userIp: string
    }
}

export type Req = ReqWithParams<ClientReq>
export type Res = BaseRes<ClientRes>
