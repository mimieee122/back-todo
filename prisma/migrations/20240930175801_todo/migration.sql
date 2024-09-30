-- CreateTable
CREATE TABLE "User" (
    "idx" SERIAL NOT NULL,
    "nickname" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "Category" (
    "idx" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "Priority" (
    "idx" SERIAL NOT NULL,
    "label" VARCHAR(50) NOT NULL,

    CONSTRAINT "Priority_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "Project" (
    "idx" SERIAL NOT NULL,
    "userIdx" INTEGER NOT NULL,
    "categoryIdx" INTEGER NOT NULL,
    "priorityIdx" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "Comment" (
    "idx" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "userIdx" INTEGER NOT NULL,
    "projectIdx" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("idx")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userIdx_fkey" FOREIGN KEY ("userIdx") REFERENCES "User"("idx") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_categoryIdx_fkey" FOREIGN KEY ("categoryIdx") REFERENCES "Category"("idx") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_priorityIdx_fkey" FOREIGN KEY ("priorityIdx") REFERENCES "Priority"("idx") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userIdx_fkey" FOREIGN KEY ("userIdx") REFERENCES "User"("idx") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_projectIdx_fkey" FOREIGN KEY ("projectIdx") REFERENCES "Project"("idx") ON DELETE RESTRICT ON UPDATE CASCADE;


-- 결국, 카테고리 이름을 추가하려면 SQL 쿼리를 마이그레이션 파일에 직접 추가하고, pnpm prisma migrate deploy를 통해 그 쿼리를 데이터베이스에 적용해야 합니다.
INSERT INTO "Category" (title) VALUES 
('공부'), 
('운동'), 
('루틴'), 
('취미'), 
('기타');
