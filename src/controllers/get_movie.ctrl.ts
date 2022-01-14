import { Req, Res } from "../api_contracts/get_movie.ctrl.contract"
import { getStarWarsById } from '../utils/request.utils';

export default async function getMovieCtrl(req: Req): Res {
    const movie = await getStarWarsById(+req.params.id)
    return movie
}
