import { Req, Res } from "../api_contracts/get_movie.ctrl.contract"
import { getStarWarsById } from '../utils/request.utils';

export default async function getMovieCtrl(req: Req): Res {
    const movie = await getStarWarsById(+req.params.id)
    if (!movie.success) return movie
    if (!movie.data) return {
        ...movie,
        message: 'Movie not found'
    }
    const movieResult = movie.data.movies
    return {
        ...movie,
        data: {
            id: +req.params.id,
            title: movieResult.title.toUpperCase(),
            opening_crawl: movieResult.opening_crawl,
            commentCount: Math.round(Math.random() * 100)
        }
    }
}
