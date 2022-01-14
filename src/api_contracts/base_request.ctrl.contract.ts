import { Request } from 'express'
import { Connection } from 'typeorm';

export type BaseReq = Request  & {
    params: { [key: string]: string | undefined }
    query: { [key: string]: string | undefined }
    dbConnection: Connection
}

export type ReqWithParams<T> = BaseReq & T

type Response<T> =  {
	success: boolean
    message: string
	data: T | null
    options?: {
        status?: number
    }
}

export type BaseRes<T> = Promise<Response<T> | void>
