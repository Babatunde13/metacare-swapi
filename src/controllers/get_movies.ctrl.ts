import { movies } from "../utils/movies.utils"
import { Req, Res } from "../api_contracts/get_movies.ctrl.contract"

export default async function getMoviesCtrl(req: Req): Res {
    return {
        success: true,
        message: 'Movies fetched successfully',
        data: { movies }
    }
}
