import { ReqWithParams, BaseRes } from './base_request.ctrl.contract';

export interface ClientReq {
    params: {
        id: string
    }
}

export interface ClientRes {
    id: number
    title: string
    opening_crawl: string
    commentCount: number
}

export type Req = ReqWithParams<ClientReq>
export type Res = BaseRes<ClientRes>
