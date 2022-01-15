import { Req, Res } from "../api_contracts/get_movie.ctrl.contract"
import { getStarWarsById } from '../utils/request.utils';
import getCommentRepository from "../entities/comments.entity";

export default async function getMovieCtrl(req: Req): Res {
    const movie = await getStarWarsById(+req.params.id)
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
