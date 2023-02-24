import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677203409586 implements MigrationInterface {
    name = 'default1677203409586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tools" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "tags" text NOT NULL, "updateAt" text NOT NULL, "link" text NOT NULL, "user_id" integer, CONSTRAINT "PK_e23d56734caad471277bad8bf85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tools" ADD CONSTRAINT "FK_96158ff69b91b8b52ff6f361174" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tools" DROP CONSTRAINT "FK_96158ff69b91b8b52ff6f361174"`);
        await queryRunner.query(`DROP TABLE "tools"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
