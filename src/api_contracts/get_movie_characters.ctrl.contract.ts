import { ReqWithParams, BaseRes } from './base_request.ctrl.contract';

export interface ClientReq {
    params: {
        id: string
    }
    query: {
        sort?: 'name_asc' | 'name_desc' | 'gender_asc' | 'gender_desc' | 'height_asc' | 'height_desc',
        filter?: 'male' | 'female'
    }
}

export interface ClientRes {
    id: number
    title: string
    characters: [
        {
            id: number
            profileUrl: string
            name: string
            height: string
            mass: string
            eye_color: string
            skin_color: string
            hair_color: string
            gender: string
            birth_year: string
        }
    ],
    metaData: {
        totalCount: number,
        totalHeightCm: number,
        totalHeightFtIn: string
    }
}

export type Req = ReqWithParams<ClientReq>
export type Res = BaseRes<ClientRes>
