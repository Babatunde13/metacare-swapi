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
        opening_crawl: string
        commentCount: number
    }[],
    metaData: {
        totalCount: number
        next: string
        previous: string
    }
}

export type Req = ReqWithParams<ClientReq>
export type Res = BaseRes<ClientRes>
