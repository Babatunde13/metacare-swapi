import envs from '../envs'
import { getKey, setKey } from '../utils/cache_data.utils'
import { Req, Res } from '../api_contracts/get_movie_characters.ctrl.contract'
import { getStarWarsById, getStarWarsCharacter, IResponse } from '../utils/request.utils'

const getMovieCharacter = async (characterUrl: string) => {
    let characterDetails: IResponse
    if (getKey(characterUrl)) {
        characterDetails = getKey(characterUrl)
    } else {
        characterDetails = await getStarWarsCharacter(characterUrl)
        setKey(characterUrl, characterDetails)
    }
    if (!characterDetails.success) return {
        ...characterDetails
    }
    if (!characterDetails.data) return {
        ...characterDetails,
        message: 'Character not found'
    }
    return {
        id: characterUrl.split('/')[characterUrl.split('/').length - 2],
        profileUrl: characterUrl,
        name: characterDetails.data.name,
        height: characterDetails.data.height,
        mass: characterDetails.data.mass,
        eye_color: characterDetails.data.eye_color,
        hair_color: characterDetails.data.hair_color,
        skin_color: characterDetails.data.skin_color,
        gender: characterDetails.data.gender,
        birth_year: characterDetails.data.birth_year
    }
}

const getAllMovieCharacters = (characters: string[]) => {
    return Promise.all(characters.map(async (characterUrl) => getMovieCharacter(characterUrl)))
}

export default async function getMovieCharactersCtrl(req: Req): Res {
    let movie: IResponse
    if (getKey(`${envs.swapiBaseUrl}/films/${+req.params.id}`)) {
        movie = getKey(`${envs.swapiBaseUrl}/films/${+req.params.id}`)
    } else {
        movie = await getStarWarsById(+req.params.id)
        setKey(`${envs.swapiBaseUrl}/films/${+req.params.id}`, movie)
    }
    if (!movie.success) return movie
    if (!movie.data) return {
        ...movie,
        message: 'Movie not found'
    }
    const movieResult = movie.data.movies
    let movieCharactersResult = await getAllMovieCharacters(movieResult.characters)
    if (req.query.filter && (req.query.filter === 'male' || req.query.filter === 'female')) {
        movieCharactersResult = movieCharactersResult.filter((movieCharacter) => movieCharacter.gender === req.query.filter )
    }
    if (req.query.sort) {
        switch (req.query.sort) {
            case 'name_asc':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                movieCharactersResult = movieCharactersResult.sort((a: any, b: any) => {
                    return a.name > b.name ? 1 : -1
                })
                break
            case 'name_desc':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                movieCharactersResult = movieCharactersResult.sort((a: any, b: any) => {
                    return a.name < b.name ? 1 : -1
                })
                break
            case 'height_asc':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                movieCharactersResult = movieCharactersResult.sort((a: any, b: any) => {
                    return a.height - b.height
                })
                break
            case 'height_desc':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                movieCharactersResult = movieCharactersResult.sort((a: any, b: any) => {
                    return b.height - a.height
                })
                break
            case 'gender_asc':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                movieCharactersResult = movieCharactersResult.sort((a: any, b: any) => {
                    return a.gender > b.gender ? 1 : -1
                })
                break
            case 'gender_desc':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                movieCharactersResult = movieCharactersResult.sort((a: any, b: any) => {
                    return a.gender < b.gender ? 1 : -1
                })
                break
            default:
                break
        }
    }
    let totalHeightCm = 0
    movieCharactersResult.forEach((movie) => {
        totalHeightCm += +movie.height
    })
    const totalHeightFt = Math.floor(totalHeightCm / 30.48)
    const totalHeightIn = ((totalHeightCm - totalHeightFt * 30.48) / 2.54).toFixed(2)
    return {
        ...movie, 
        message: 'Movie characters fetched successfully',
        data: {
            id: +req.params.id,
            title: movieResult.title.toUpperCase(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            characters: movieCharactersResult as any,
            metaData: {
                totalCount: movieCharactersResult.length,
                totalHeightCm,
                totalHeightFtIn: `${totalHeightFt}ft and ${totalHeightIn}in`
            }
        }
    }
}
