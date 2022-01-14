import { Req, Res } from '../api_contracts/get_movie_comments.ctrl.contract'
import { getStarWarsById } from '../utils/request.utils'
// import getCommentRepository from '../entities/comments.entity'

export default async function getMovieCommentsCtrl(req: Req): Res {
    const movie = await getStarWarsById(+req.params.id)
    if (!movie.success) return movie
    if (!movie.data) return {
        ...movie,
        message: 'Movie not found'
    }
    // const comments = await getCommentRepository().find({
    //     where: {
    //         movieId: +req.params.id
    //     },
    //     order: {
    //         createdAt: 'DESC'
    //     },
    //     take: 500
    // })
    const movieResult = movie.data.movies
    return {
        ...movie,
        data: {
            id: +req.params.id,
            movieId: +req.params.id,
            movieTitle: movieResult.title.toUpperCase(),
            comments: [{
                id: +req.params.id,
                comment: 'Something about this movie',
                createdAt: new Date(movieResult.release_date).toISOString(),
                updatedAt: new Date(movieResult.release_date).toISOString(),
                userIp: req.ip
            }]
        }
    }
}
