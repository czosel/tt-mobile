/*
  Warnings:

  - You are about to drop the column `groupId` on the `team` table. All the data in the column will be lost.
  - You are about to drop the `group` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `leagueId` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "team" DROP CONSTRAINT "team_groupId_fkey";

-- AlterTable
ALTER TABLE "team" DROP COLUMN "groupId",
ADD COLUMN     "leagueId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "group";

-- CreateTable
CREATE TABLE "league" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "league_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
