/*
  Warnings:

  - The primary key for the `player_in_match` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "player_in_match" DROP CONSTRAINT "player_in_match_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "player_in_match_pkey" PRIMARY KEY ("id");
