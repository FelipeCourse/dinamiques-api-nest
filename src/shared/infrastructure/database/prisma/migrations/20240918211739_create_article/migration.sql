-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "summary" VARCHAR(200) NOT NULL,
    "reading_time" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "published_last_date" TIMESTAMP(3) NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_title_key" ON "Article"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_title_is_published_idx" ON "Article"("title", "is_published");
