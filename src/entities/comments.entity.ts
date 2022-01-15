import { Entity, Column, PrimaryGeneratedColumn, getRepository, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class MovieComment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    movieId: number

    @Column()
    comment: string

    @Column()
    userIp: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    toJSON() {
        return {
            id: this.id,
            movieId: this.movieId,
            comment: this.comment,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        }
    }
}

export default function getCommentRepository() {
    return getRepository<MovieComment>(MovieComment);
}
