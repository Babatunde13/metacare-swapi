import { Req, Res } from '../api_contracts/get_movie_comments.ctrl.contract'
import { getStarWarsById, IResponse } from '../utils/request.utils'
import getCommentRepository from '../entities/comments.entity'
import { getKey, setKey } from '../utils/cache_data.utils'
import envs from '../envs'

export default async function getMovieCommentsCtrl(req: Req): Res {
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
    const comments = await getCommentRepository().find({
        where: {
            movieId: +req.params.id
        },
        order: {
            createdAt: 'DESC'
        },
        take: 500
    })
    const movieResult = movie.data.movies
    return {
        ...movie,
        data: {
            id: +req.params.id,
            movieId: +req.params.id,
            movieTitle: movieResult.title.toUpperCase(),
            comments: comments.map(comment => ({
                id: comment.id,
                comment: comment.comment,
                createdAt: comment.createdAt.toISOString(),
                updatedAt: comment.updatedAt.toISOString(),
                userIp: comment.userIp
            }))
        }
    }
}
