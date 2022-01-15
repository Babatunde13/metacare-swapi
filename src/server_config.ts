import { HttpMethod, Route } from './server.types'
import getMoviesCtrl from './controllers/get_movies.ctrl'
import getMovieCtrl from './controllers/get_movie.ctrl'
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
        handlers: [createMovieCommentCtrl]
    },
    {
        path: '/api/v1/movies/:id/comments',
        method: GET,
        handlers: [getMovieCommentsCtrl]
    },
    {
        path: '/api/v1/docs',
        method: GET,
        handlers: [
            async () => {
                return {
                    success: true,
                    data: null,
                    message: '',
                    options: {
                        redirect: 'https://documenter.getpostman.com/view/11853513/UVXjKGLS',
                        status: 302,
                    }
                }
            }
        ]
    },
    {
        path: '/docs',
        method: GET,
        handlers: [
            async () => {
                return {
                    success: true,
                    data: null,
                    message: '',
                    options: {
                        redirect: 'https://documenter.getpostman.com/view/11853513/UVXjKGLS',
                        status: 302,
                    }
                }
            }
        ]
    },
    {
        path: '/',
        method: GET,
        handlers: [
            async (req) => {
                return {
                    success: true,
                    data: null,
                    message: `Welcome to Metacare Swapi APi, you can access the <a href="${req.protocol}://${req.get('host')}/docs">docs</a> here.`,
                    options: {
                        sendString: true
                    }
                }
            }
        ]
    }
]
