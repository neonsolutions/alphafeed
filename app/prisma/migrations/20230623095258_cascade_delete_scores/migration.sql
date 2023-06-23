-- DropForeignKey
ALTER TABLE "scores" DROP CONSTRAINT "scores_feed_item_id_fkey";

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_feed_item_id_fkey" FOREIGN KEY ("feed_item_id") REFERENCES "feed_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
