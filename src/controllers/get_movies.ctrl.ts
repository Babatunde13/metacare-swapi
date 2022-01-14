import { Req, Res } from '../api_contracts/get_movies.ctrl.contract'
import { getStarWars } from '../utils/request.utils'

export default async function getMoviesCtrl(req: Req): Res {
    const movies = await getStarWars()
    return movies
}
