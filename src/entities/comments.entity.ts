import { Entity, Column, PrimaryGeneratedColumn, getRepository } from 'typeorm';

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    movieId: number;

    @Column()
    comment: string;

    toJSON() {
        return {
            id: this.id,
            movieId: this.movieId,
            comment: this.comment
        }
    }
}

export default function getCommentRepository() {
    return getRepository<Comment>(Comment);
}
