-- CreateTable
CREATE TABLE "team" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "clubId" INTEGER NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
