import { Req, Res } from '../api_contracts/get_movie.ctrl.contract'
import { getStarWarsById, IResponse } from '../utils/request.utils'
import getCommentRepository from '../entities/comments.entity'
import envs from '../envs'
import { getKey, setKey } from '../utils/cache_data.utils'

export default async function getMovieCtrl(req: Req): Res {
    let movie: IResponse
    if (getKey(`${envs.swapiBaseUrl}/films/${+req.params.id}`)) {
        movie = getKey(`${envs.swapiBaseUrl}/films/${+req.params.id}`)
    } else {
        movie = await getStarWarsById(+req.params.id)
        setKey(`${envs.swapiBaseUrl}/films/${+req.params.id}`, movie)
    }
    if (!movie.success) return movie
    if (!movie.data) return {
        ...movie,
        message: 'Movie not found'
    }
    const movieResult = movie.data.movies
    const commentModel = await getCommentRepository().findAndCount({
        where: {
            movieId: +req.params.id
        }
    })
    return {
        ...movie,
        data: {
            id: +req.params.id,
            title: movieResult.title.toUpperCase(),
            opening_crawl: movieResult.opening_crawl,
            commentCount: commentModel[1],
        }
    }
}
