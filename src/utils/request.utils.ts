import axios from 'axios'
import envs from '../envs'
import isError from './is_error.utils'

const get= async (url: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        const response = await axios.get(url, {headers})
        return {
            data: response.data
        }
    } catch (e) {
        return {
            error: e
        }
    }
}

export async function getStarWars (): Promise<IResponse>  {
    const url = `${envs.swapiBaseUrl}/films/`
    const data = await get(url)
    if (isError(data)) {
        return {
            success: false,
            message: 'Error fetching movies',
            data: null,
            options: { status: 500 }
        }
    }
    return {
        success: true,
        message: 'Movies fetched successfully',
        data: { movies: data.data || [] }
    }
}

export async function getStarWarsById(id: number): Promise<IResponse> {
    const url = `${envs.swapiBaseUrl}/films/${id}`
    const data = await get(url)
    if (isError(data)) {
        return {
            success: false,
            message: 'Error fetching movies',
            data: null,
            options: { status: 500 }
        }
    }
    return {
        success: true,
        message: `Movie with id =  ${id} fetched successfully`,
        data: { movies: data.data }
    }
}

interface IResponse {
    success: boolean
    message: string
    data: any
    options?: {
        status?: number
    }
}