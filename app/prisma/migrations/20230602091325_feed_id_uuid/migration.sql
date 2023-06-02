/*
  Warnings:

  - The primary key for the `feed_items` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "scores" DROP CONSTRAINT "scores_feed_item_id_fkey";

-- AlterTable
ALTER TABLE "feed_items" DROP CONSTRAINT "feed_items_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "feed_items_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "feed_items_id_seq";

-- AlterTable
ALTER TABLE "scores" ALTER COLUMN "feed_item_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_feed_item_id_fkey" FOREIGN KEY ("feed_item_id") REFERENCES "feed_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
