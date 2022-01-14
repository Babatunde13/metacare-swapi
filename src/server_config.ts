import { HttpMethod, Route } from './server.types'
import getMoviesCtrl from './controllers/get_movies.ctrl'
import getMovieCtrl from './controllers/get_movie.ctrl'
import getUserIp from './middlewares/get_ip.ctrl.middlewares'

const { GET } = HttpMethod

export const routes: Route[] = [
    {
        path: '/api/v1/movies/',
        method: GET,
        handlers: [getUserIp,  getMoviesCtrl]
    },
    {
        path: '/api/v1/movies/:id',
        method: GET,
        handlers: [getMovieCtrl]
    }
]
