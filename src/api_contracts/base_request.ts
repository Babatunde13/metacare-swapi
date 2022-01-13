import { Request, Response } from 'express'

export type BaseReq = Omit<Request, 'params'> & {
    params: { [key: string]: string | undefined }
    query: { [key: string]: string | undefined }
}

// export type ReqWithParams<T> = Omit<BaseReq, 'params'> & T

type Json<T> =  {
	success: boolean
	data: T
}

export type BaseRes<T> = Response & Json<T>

