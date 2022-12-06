-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cover" TEXT,
    "title" TEXT NOT NULL,
    "publishingCompany" TEXT NOT NULL,
    "description" TEXT,
    "categories" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "tumble" TEXT NOT NULL,
    "isbn" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_books" ("authors", "categories", "cover", "description", "id", "isbn", "publishingCompany", "quantity", "title", "tumble") SELECT "authors", "categories", "cover", "description", "id", "isbn", "publishingCompany", "quantity", "title", "tumble" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
