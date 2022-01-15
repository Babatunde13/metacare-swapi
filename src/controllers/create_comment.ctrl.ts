import { Req, Res } from "../api_contracts/create_movie_comment.ctrl.contract"
import { getStarWarsById } from '../utils/request.utils'
import { MovieComment } from '../entities/comments.entity';
import getCommentRepository from '../entities/comments.entity'

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
    let comment: MovieComment
    try {
        comment = new MovieComment()
        comment.comment = commentData
        comment.userIp = req.ip
        comment.movieId = +req.params.id
        await getCommentRepository().save(comment)
    } catch (error) {
        return {
            success: false,
            message: 'Error saving comment',
            options: {
                status: 500,
            },
            data: null
        }
    }
    const movieResult = movie.data.movies
    return {
        ...movie,
        message: 'Comment created successfuly',
        data: {
            id: +req.params.id,
            movieId: +req.params.id,
            movieTitle: movieResult.title.toUpperCase(),
            comment: {
                id: comment.id,
                comment: commentData as string,
                createdAt: comment.createdAt.toISOString(),
                updatedAt: comment.updatedAt.toISOString(),
                userIp: comment.userIp
            }
        }
    }
}
