/*
  Warnings:

  - You are about to drop the column `bookerEmail` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `bookerName` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `bookerPhone` on the `Event` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'confirmed',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Booking_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "startTime" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "room" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'available',
    "price" REAL,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "maxBookings" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Event" ("createdAt", "date", "description", "duration", "id", "location", "maxBookings", "price", "room", "startTime", "status", "title", "updatedAt", "visibility") SELECT "createdAt", "date", "description", "duration", "id", "location", "maxBookings", "price", "room", "startTime", "status", "title", "updatedAt", "visibility" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
