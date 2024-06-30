-- DropForeignKey
ALTER TABLE "game" DROP CONSTRAINT "game_guestId_fkey";

-- DropForeignKey
ALTER TABLE "game" DROP CONSTRAINT "game_homeId_fkey";

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
