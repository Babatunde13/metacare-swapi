import { Req, Res } from "../api_contracts/create_movie_comment.ctrl.contract"
import { getStarWarsById } from '../utils/request.utils'
// import { Comment } from '../entities/comments.entity'
// import getCommentRepository from '../entities/comments.entity'

export default async function createMovieCommentCtrl(req: Req): Res {
    const commentData = req.body.comment
    if (!commentData) return {
        success: false,
        message: 'Comment data is required',
        options: {
            status: 400,
        },
        data: null
    }
    if (typeof commentData !== 'string' || commentData.length > 200) return {
        success: false,
        message: 'Comment data is required and must be at most 200 characters',
        options: { status: 400 },
        data: null
    }
    const movie = await getStarWarsById(+req.params.id)
    if (!movie.success) return movie
    if (!movie.data) return {
        ...movie,
        message: 'Movie not found',
        options: { status: 404 }
    }
    // create comment
    // let comment: Comment
    // try {
    //     comment = new Comment()
    //     comment.comment = commentData
    //     comment.userIp = req.ip
    //     comment.movieId = +req.params.id
    //     await getCommentRepository().save(comment)
    // } catch (error) {
    //     return {
    //         success: false,
    //         message: 'Error saving comment',
    //         options: {
    //             status: 500,
    //         },
    //         data: null
    //     }
    // }
    const movieResult = movie.data.movies
    return {
        ...movie,
        message: 'Comment created successfuly',
        data: {
            id: +req.params.id,
            movieId: +req.params.id,
            movieTitle: movieResult.title.toUpperCase(),
            comment: {
                id: +req.params.id,
                comment: commentData as string,
                createdAt: new Date(movieResult.release_date).toISOString(),
                updatedAt: new Date(movieResult.release_date).toISOString(),
                userIp: req.ip,
            }
        }
    }
}
