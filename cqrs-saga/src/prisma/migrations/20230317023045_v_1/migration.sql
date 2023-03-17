-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "price" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);
