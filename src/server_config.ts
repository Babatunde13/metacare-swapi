import { HttpMethod, Route } from './server.types'
import getMoviesCtrl from './controllers/get_movies.ctrl'
import getMovieCtrl from './controllers/get_movie.ctrl'
import getUserIp from './middlewares/get_ip.ctrl.middlewares'
import getMovieCharactersCtrl from './controllers/get_movie_characters.ctrl'
import createMovieCommentCtrl from './controllers/create_comment.ctrl'
import getMovieCommentsCtrl from './controllers/get_movie_comments.ctrl'

const { GET, POST } = HttpMethod

export const routes: Route[] = [
    {
        path: '/api/v1/movies/',
        method: GET,
        handlers: [getMoviesCtrl]
    },
    {
        path: '/api/v1/movies/:id',
        method: GET,
        handlers: [getMovieCtrl]
    },
    {
        path: '/api/v1/movies/:id/characters',
        method: GET,
        handlers: [getMovieCharactersCtrl]
    },
    {
        path: '/api/v1/movies/:id/comments',
        method: POST,
        handlers: [getUserIp, createMovieCommentCtrl]
    },
    {
        path: '/api/v1/movies/:id/comments',
        method: GET,
        handlers: [getMovieCommentsCtrl]
    }
]
