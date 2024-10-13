/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Priority` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Priority_label_key" ON "Priority"("label");
