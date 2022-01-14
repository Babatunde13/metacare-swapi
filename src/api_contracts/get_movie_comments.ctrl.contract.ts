import { ReqWithParams, BaseRes } from './base_request.ctrl.contract';

export interface ClientReq {
    params: {
        id: string
    }
}

export interface ClientRes {
    id: number
    movieId: number
    movieTitle: string
    comments: {
        id: number
        comment: string
        createdAt: string
        updatedAt: string
        userIp: string
    }[]
}

export type Req = ReqWithParams<ClientReq>
export type Res = BaseRes<ClientRes>
