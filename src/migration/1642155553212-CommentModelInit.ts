import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentModelInit1642155553212 implements MigrationInterface {
    name = 'CommentModelInit1642155553212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "movieId" integer NOT NULL, "comment" character varying NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
