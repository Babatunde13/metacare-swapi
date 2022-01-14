import { Req, Res } from '../api_contracts/get_movies.ctrl.contract'
import { getStarWars } from '../utils/request.utils'

export default async function getMoviesCtrl(req: Req): Res {
    const movies = await getStarWars()
    if (!movies.success) return movies
    return {
        ...movies,
        data: {
            movies: movies.data.movies.results.map((movie: any) => {
                const commentModel = [{
                    id: movie.id,
                    movieId: movie.id,
                    comment: 'Something about this movie',
                }]
                return {
                    id: movie.id,
                    title: movie.title.toUpperCase(),
                    opening_crawl: movie.opening_crawl,
                    commentCount: commentModel.length
                }
            }),
            metaData: {
                totalCount: movies.data.movies.count,
                next: movies.data.movies.next,
                previous: movies.data.movies.previous
            }
        }
    }
}
