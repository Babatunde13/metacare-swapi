import { Req, Res } from '../api_contracts/get_movies.ctrl.contract'
import { getStarWars } from '../utils/request.utils'
// import getCommentRepository from '../entities/comments.entity'

export default async function getMoviesCtrl(req: Req): Res {
    console.log(req.ip)
    console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress)
    const movies = await getStarWars()
    if (!movies.success) return movies
    const moviesResult = []
    for (const movie of movies.data.movies.results) {
        // const commentModel = await getCommentRepository().findAndCount({
        //     where: {
        //         movieId: +movie.id
        //     }
        // })
        const commentModel = [{
            id: movie.id,
            movieId: movie.id,
            comment: 'Something about this movie',
        }, 1]
        moviesResult.push({
            id: movie.id,
            title: movie.title.toUpperCase(),
            opening_crawl: movie.opening_crawl,
            commentCount: commentModel[1] as number,
            createdAt: new Date(movie.created),
        })
    }
    return {
        ...movies,
        data: {
            movies: moviesResult.sort((a: any, b: any) => {
                return b.createdAt - a.createdAt
            }),
            metaData: {
                totalCount: movies.data.movies.count,
                next: movies.data.movies.next,
                previous: movies.data.movies.previous
            }
        }
    }
}
