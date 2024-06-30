-- AlterTable
ALTER TABLE "league" ADD COLUMN     "associationId" TEXT;

-- CreateTable
CREATE TABLE "association" (
    "id" TEXT NOT NULL,

    CONSTRAINT "association_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "league" ADD CONSTRAINT "league_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "association"("id") ON DELETE SET NULL ON UPDATE CASCADE;
