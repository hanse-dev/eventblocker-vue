-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "startTime" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "room" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'available',
    "bookerName" TEXT,
    "bookerEmail" TEXT,
    "bookerPhone" TEXT,
    "price" REAL,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "maxBookings" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
