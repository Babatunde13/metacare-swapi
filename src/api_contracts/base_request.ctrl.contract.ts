import { Request } from 'express'

export type BaseReq = Omit<Request, 'params'> & {
    params: { [key: string]: string | undefined }
    query: { [key: string]: string | undefined }
}

export type ReqWithParams<T> = Omit<BaseReq, 'params'> & T

type Response<T> =  {
	success: boolean
    message: string
	data: T | null
    options?: {
        status?: number
    }
}

export type BaseRes<T> = Promise<Response<T> | void>
