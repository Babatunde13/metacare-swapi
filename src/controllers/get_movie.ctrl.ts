import { Req, Res } from "../api_contracts/get_movie.ctrl.contract"
import { getStarWarsById } from '../utils/request.utils';

export default async function getMovieCtrl(req: Req): Res {
    const movie = await getStarWarsById(+req.params.id)
    if (!movie.success) return movie
    if (!movie.data) return {
        ...movie,
        message: 'Movie not found'
    }
    return {
        ...movie,
        data: {
            movie: {
                id: movie.data.movies.id,
                title: movie.data.movies.title.toUpperCase(),
                opening_crawl: movie.data.movies.opening_crawl,
                commentCount: Math.round(Math.random() * 100)
            }
        }
    }
}
