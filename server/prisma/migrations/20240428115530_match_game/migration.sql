/*
  Warnings:

  - Added the required column `gameId` to the `match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "match" ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
