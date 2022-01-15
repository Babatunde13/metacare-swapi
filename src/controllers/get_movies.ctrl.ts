import { Res } from '../api_contracts/get_movies.ctrl.contract'
import { getStarWars } from '../utils/request.utils'
import getCommentRepository from '../entities/comments.entity';

export default async function getMoviesCtrl(): Res {
    const movies = await getStarWars()
    if (!movies.success) return movies
    const moviesResult = []
    for (const movie of movies.data.movies.results) {
        const movieId = parseInt(movie.url.split('/')[movie.url.split('/').length - 2])
        const commentModel = await getCommentRepository().findAndCount({
            where: {
                movieId
            }
        })
        moviesResult.push({
            id: movieId,
            title: movie.title.toUpperCase(),
            opening_crawl: movie.opening_crawl,
            commentCount: commentModel[1] as number,
            release_date: new Date(movie.release_date),
        })
    }
    return {
        ...movies,
        data: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            movies: moviesResult.sort((a: any, b: any) => {
                return b.release_date - a.release_date
            }),
            metaData: {
                totalCount: movies.data.movies.count,
                next: movies.data.movies.next,
                previous: movies.data.movies.previous
            }
        }
    }
}
