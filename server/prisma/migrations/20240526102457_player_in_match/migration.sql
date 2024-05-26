/*
  Warnings:

  - You are about to drop the column `player1Id` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `player2Id` on the `match` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MatchType" AS ENUM ('SINGLE', 'DOUBLE');

-- CreateEnum
CREATE TYPE "TeamType" AS ENUM ('HOME', 'GUEST');

-- DropForeignKey
ALTER TABLE "match" DROP CONSTRAINT "match_player1Id_fkey";

-- DropForeignKey
ALTER TABLE "match" DROP CONSTRAINT "match_player2Id_fkey";

-- AlterTable
ALTER TABLE "match" DROP COLUMN "player1Id",
DROP COLUMN "player2Id";

-- CreateTable
CREATE TABLE "player_in_match" (
    "id" INTEGER NOT NULL,
    "matchType" "MatchType" NOT NULL DEFAULT 'SINGLE',
    "teamType" "TeamType" NOT NULL,
    "matchId" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "player_in_match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "player_in_match" ADD CONSTRAINT "player_in_match_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_in_match" ADD CONSTRAINT "player_in_match_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
