-- DropForeignKey
ALTER TABLE "team" DROP CONSTRAINT "team_clubId_fkey";

-- AlterTable
ALTER TABLE "team" ALTER COLUMN "clubId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE SET NULL ON UPDATE CASCADE;
