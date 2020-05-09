import {MigrationInterface, QueryRunner} from "typeorm";

export class shopy1588993882610 implements MigrationInterface {
    name = 'shopy1588993882610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "persons" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "lastname" character varying(25) NOT NULL, "birth_date" TIMESTAMP NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_74278d8812a049233ce41440ac7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "foreign_exchange" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "simbol" character varying(5) NOT NULL, "exchange_rate" double precision NOT NULL, CONSTRAINT "PK_daa122d3c4a29216a3f6be961fb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "wallets" ("id" SERIAL NOT NULL, "hash" text NOT NULL, CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "commissions" ("id" SERIAL NOT NULL, "percentage" double precision NOT NULL, "commission" double precision NOT NULL, CONSTRAINT "PK_2701379966e2e670bb5ff0ae78e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "statuses" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "payment_statuses" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "fk_payment_id" integer NOT NULL, "fk_status_id" integer NOT NULL, CONSTRAINT "PK_de2e33567a948ee108070d1d241" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "total_price" double precision NOT NULL, "date" TIMESTAMP NOT NULL, "fk_address_id" integer, "fk_commission_id" integer NOT NULL, "fk_wallet_id" integer NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "carts" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "fk_user_id" integer NOT NULL, "fk_stock_id" integer NOT NULL, "fk_payment_id" integer, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "score" integer NOT NULL, "comment" character varying NOT NULL, "fk_user_id" integer NOT NULL, "fk_product_id" integer NOT NULL, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "category_types" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9059b70ea6d2dd623ed25250d5a" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(25) NOT NULL, "description" character varying NOT NULL, "fk_category_type_id" integer NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "product_categories" ("id" SERIAL NOT NULL, "fk_product_id" integer NOT NULL, "fk_category_id" integer NOT NULL, CONSTRAINT "PK_7069dac60d88408eca56fdc9e0c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" double precision NOT NULL, "image" character varying NOT NULL, "description" character varying NOT NULL, "score" double precision NOT NULL, "discount" double precision NOT NULL, "width" double precision NOT NULL, "height" double precision NOT NULL, "depth" double precision NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "stockpile" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "fk_user_id" integer NOT NULL, "fk_product_id" integer NOT NULL, CONSTRAINT "PK_ee25c7c66bcf7ba5ed8935313df" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "shopping_history" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "price" double precision NOT NULL, "fk_user_id" integer, "fk_stock_id" integer, "fk_payment_id" integer NOT NULL, CONSTRAINT "PK_18bdb85f7ddfd4e5b89ccff18e9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, "username" character varying(25) NOT NULL, "password" text NOT NULL, "fk_person_id" integer NOT NULL, "fk_role_id" integer NOT NULL, "fk_badge_id" integer NOT NULL, CONSTRAINT "REL_a4161dee49e4592a1c18f0526f" UNIQUE ("fk_person_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "firts_line" character varying NOT NULL, "second_line" character varying NOT NULL, "city" character varying(25) NOT NULL, "state" character varying(25) NOT NULL, "postal_code" character varying(6) NOT NULL, "fk_user_id" integer NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "payment_statuses" ADD CONSTRAINT "FK_c60237cbe7912f4c367a7c43238" FOREIGN KEY ("fk_payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "payment_statuses" ADD CONSTRAINT "FK_d8297405d90169811a156410c31" FOREIGN KEY ("fk_status_id") REFERENCES "statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_2b79a4a8e2cd8cedc56ef6ea17a" FOREIGN KEY ("fk_address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_b5afd275a59ed4ddbadae5438d1" FOREIGN KEY ("fk_commission_id") REFERENCES "commissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_407851b4cc78ebcf8303f21ad39" FOREIGN KEY ("fk_wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_6c8647ac0b8ce8bb3d80863ff4f" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_397557a4892ca8626aa7c313493" FOREIGN KEY ("fk_stock_id") REFERENCES "stockpile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_4d50bfefa2babb6f33d5c987ec3" FOREIGN KEY ("fk_payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_8378573fd651ecc0f3b13c975f6" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_73e1d52be1e1d4544aca893c50e" FOREIGN KEY ("fk_product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_08b080957864bd2ef7e0ac31027" FOREIGN KEY ("fk_category_type_id") REFERENCES "category_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_720153be87244009fabd3e00602" FOREIGN KEY ("fk_product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_1f8d095b31a7014d7ac969c01fd" FOREIGN KEY ("fk_category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stockpile" ADD CONSTRAINT "FK_79065bbb3a50627be01391c8079" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "stockpile" ADD CONSTRAINT "FK_67fe30c999d49b804885a307a8e" FOREIGN KEY ("fk_product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "shopping_history" ADD CONSTRAINT "FK_008448d629de47e5d2c7ff1c5b7" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "shopping_history" ADD CONSTRAINT "FK_bf6b2afd2bcdeb3711dfe132609" FOREIGN KEY ("fk_stock_id") REFERENCES "stockpile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "shopping_history" ADD CONSTRAINT "FK_5565d0b1f7bd37db4e4d1a69eb4" FOREIGN KEY ("fk_payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a4161dee49e4592a1c18f0526f2" FOREIGN KEY ("fk_person_id") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_640e24c7957242966a5b030c0f6" FOREIGN KEY ("fk_role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6c9a7010cd4c35de0a43986fe14" FOREIGN KEY ("fk_badge_id") REFERENCES "foreign_exchange"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_29bd0d6375905235de821277eb8" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_29bd0d6375905235de821277eb8"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6c9a7010cd4c35de0a43986fe14"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_640e24c7957242966a5b030c0f6"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a4161dee49e4592a1c18f0526f2"`, undefined);
        await queryRunner.query(`ALTER TABLE "shopping_history" DROP CONSTRAINT "FK_5565d0b1f7bd37db4e4d1a69eb4"`, undefined);
        await queryRunner.query(`ALTER TABLE "shopping_history" DROP CONSTRAINT "FK_bf6b2afd2bcdeb3711dfe132609"`, undefined);
        await queryRunner.query(`ALTER TABLE "shopping_history" DROP CONSTRAINT "FK_008448d629de47e5d2c7ff1c5b7"`, undefined);
        await queryRunner.query(`ALTER TABLE "stockpile" DROP CONSTRAINT "FK_67fe30c999d49b804885a307a8e"`, undefined);
        await queryRunner.query(`ALTER TABLE "stockpile" DROP CONSTRAINT "FK_79065bbb3a50627be01391c8079"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_1f8d095b31a7014d7ac969c01fd"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_720153be87244009fabd3e00602"`, undefined);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_08b080957864bd2ef7e0ac31027"`, undefined);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_73e1d52be1e1d4544aca893c50e"`, undefined);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_8378573fd651ecc0f3b13c975f6"`, undefined);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_4d50bfefa2babb6f33d5c987ec3"`, undefined);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_397557a4892ca8626aa7c313493"`, undefined);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_6c8647ac0b8ce8bb3d80863ff4f"`, undefined);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_407851b4cc78ebcf8303f21ad39"`, undefined);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_b5afd275a59ed4ddbadae5438d1"`, undefined);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_2b79a4a8e2cd8cedc56ef6ea17a"`, undefined);
        await queryRunner.query(`ALTER TABLE "payment_statuses" DROP CONSTRAINT "FK_d8297405d90169811a156410c31"`, undefined);
        await queryRunner.query(`ALTER TABLE "payment_statuses" DROP CONSTRAINT "FK_c60237cbe7912f4c367a7c43238"`, undefined);
        await queryRunner.query(`DROP TABLE "addresses"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "shopping_history"`, undefined);
        await queryRunner.query(`DROP TABLE "stockpile"`, undefined);
        await queryRunner.query(`DROP TABLE "products"`, undefined);
        await queryRunner.query(`DROP TABLE "product_categories"`, undefined);
        await queryRunner.query(`DROP TABLE "categories"`, undefined);
        await queryRunner.query(`DROP TABLE "category_types"`, undefined);
        await queryRunner.query(`DROP TABLE "reviews"`, undefined);
        await queryRunner.query(`DROP TABLE "carts"`, undefined);
        await queryRunner.query(`DROP TABLE "payments"`, undefined);
        await queryRunner.query(`DROP TABLE "payment_statuses"`, undefined);
        await queryRunner.query(`DROP TABLE "statuses"`, undefined);
        await queryRunner.query(`DROP TABLE "commissions"`, undefined);
        await queryRunner.query(`DROP TABLE "wallets"`, undefined);
        await queryRunner.query(`DROP TABLE "foreign_exchange"`, undefined);
        await queryRunner.query(`DROP TABLE "roles"`, undefined);
        await queryRunner.query(`DROP TABLE "persons"`, undefined);
    }

}
