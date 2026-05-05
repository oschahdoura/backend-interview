import { prisma } from "./client";

export async function connectToDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("✅ DB connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    throw error;
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    console.log("✅ DB disconnected");
  } catch (error) {
    console.error("❌ DB disconnection failed:", error);
    throw error;
  }
}

export async function pingDatabase(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
