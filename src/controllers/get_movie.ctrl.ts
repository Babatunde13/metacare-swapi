import { movies } from "../utils/movies.utils"
import { Req, Res } from "../api_contracts/get_movie.ctrl.contract"

export default async function getMovieCtrl(req: Req): Res {
    const movie = movies.find(m => m.id === parseInt(req.params.id))
    if (!movie) {
        return {
            success: false,
            message: 'Movie not found',
            data: null,
            options: { status: 404 }
        }
    }
    return {
        success: true,
        message: 'Movie fetched successfully',
        data: { movie }
    }
}
