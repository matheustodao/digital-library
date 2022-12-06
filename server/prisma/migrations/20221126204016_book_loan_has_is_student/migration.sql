-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bookLoans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deliveryDate" DATETIME NOT NULL,
    "exitDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personName" TEXT NOT NULL,
    "isStudent" BOOLEAN NOT NULL DEFAULT true,
    "teacherName" TEXT,
    "phone" TEXT,
    "class" TEXT,
    "email" TEXT,
    "status" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    CONSTRAINT "bookLoans_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_bookLoans" ("bookId", "class", "deliveryDate", "email", "exitDate", "id", "personName", "phone", "status", "teacherName") SELECT "bookId", "class", "deliveryDate", "email", "exitDate", "id", "personName", "phone", "status", "teacherName" FROM "bookLoans";
DROP TABLE "bookLoans";
ALTER TABLE "new_bookLoans" RENAME TO "bookLoans";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
