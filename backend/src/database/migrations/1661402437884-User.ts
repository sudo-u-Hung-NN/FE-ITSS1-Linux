import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1661402437884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS  privatequestions (
        id 			INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
       content VARCHAR(1000)
    )`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS user (
        id 					INT 					NOT NULL 	PRIMARY KEY AUTO_INCREMENT, 
        email 			VARCHAR(50) 	NOT NULL 	UNIQUE,
        username 		VARCHAR(50) 	NOT NULL, 
        password	  VARCHAR(100) 	NOT NULL,
        avatar			LONGTEXT 			NULL, 
        phone 			VARCHAR(20) 	NULL, 
        birth_date 	DATE 					NULL, 
        gender 			ENUM('MALE','FEMALE') NULL,
        qid int NOT NULL,
        answer varchar(100),
        CONSTRAINT FK_user_questions FOREIGN KEY (qid) REFERENCES privatequestions(id)  ON UPDATE CASCADE ON DELETE CASCADE
           )`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS recipe (
          id 						INT 					NOT NULL PRIMARY KEY AUTO_INCREMENT,
          name 					VARCHAR(50) 	NOT NULL UNIQUE,
          description 	LONGTEXT      NOT NULL,
          image 				LONGTEXT 	    NOT NULL,
          formula 			LONGTEXT      NOT NULL,
          note  				LONGTEXT      NOT NULL,
          creator 		  INT NOT NULL,
          price 				INT NOT NULL,
          views   			INT NOT NULL,
          CONSTRAINT FK_user_recipe FOREIGN KEY (creator) REFERENCES user(ID)  ON UPDATE CASCADE ON DELETE CASCADE
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS raw_material (
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(50) NOT NULL, 
          unit VARCHAR(30) NOT NULL
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS recipe_raw_material (
        id                  INT UNIQUE AUTO_INCREMENT,
        recipe_id 			INT NOT NULL,
        raw_material_id 	INT NOT NULL,
        amount 				    FLOAT NOT NULL,
        PRIMARY KEY (recipe_id, raw_material_id),
        CONSTRAINT FK_material_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(ID) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT FK_recipe_material FOREIGN KEY (raw_material_id)  REFERENCES raw_material(ID) ON UPDATE CASCADE ON DELETE CASCADE

    );`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS voting (
        id 			INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        recipe_id 	INT NOT NULL, 
        user_id 	INT NOT NULL,
        amount_star INT NOT NULL,
        CONSTRAINT FK_recipe FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT FK_user FOREIGN KEY (user_id) 	REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
    )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE voting;`);
    await queryRunner.query(`DROP TABLE recipe_raw_material;`);
    await queryRunner.query(`DROP TABLE raw_material;`);
    await queryRunner.query(`DROP TABLE recipe;`);
    await queryRunner.query(`DROP TABLE user;`);
  }
}
