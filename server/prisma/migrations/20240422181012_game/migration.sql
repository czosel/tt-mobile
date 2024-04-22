-- CreateTable
CREATE TABLE "game" (
    "id" INTEGER NOT NULL,
    "homeId" INTEGER NOT NULL,
    "guestId" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
