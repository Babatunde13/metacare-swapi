import {MigrationInterface, QueryRunner} from "typeorm";

export class MovieComments1642272490907 implements MigrationInterface {
    name = 'MovieComments1642272490907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie_comment" ("id" SERIAL NOT NULL, "movieId" integer NOT NULL, "comment" character varying NOT NULL, "userIp" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96d262dcdaaca0de5380107452e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movie_comment"`);
    }

}
