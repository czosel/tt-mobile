-- CreateTable
CREATE TABLE "match" (
    "id" TEXT NOT NULL,
    "player1Id" INTEGER NOT NULL,
    "player2Id" INTEGER NOT NULL,
    "s1" TEXT NOT NULL,
    "s2" TEXT NOT NULL,
    "s3" TEXT NOT NULL,
    "s4" TEXT NOT NULL,
    "s5" TEXT NOT NULL,
    "sets" TEXT NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT "match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_player1Id_fkey" FOREIGN KEY ("player1Id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_player2Id_fkey" FOREIGN KEY ("player2Id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
