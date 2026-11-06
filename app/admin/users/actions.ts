"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function deleteUser(userId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Please sign in first.",
      };
    }

    // Verify administrator permissions on the server.
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (admin?.role !== "ADMIN") {
      return {
        success: false,
        error: "You are not authorized to delete users.",
      };
    }

    if (!userId || typeof userId !== "string") {
      return {
        success: false,
        error: "Invalid user ID.",
      };
    }

    if (userId === session.user.id) {
      return {
        success: false,
        error: "You cannot delete your own administrator account.",
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found.",
      };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");

    return { success: true };
  } catch (error) {
    console.error("Delete user error:", error);

    return {
      success: false,
      error: "Unable to delete this user. Check your database relations.",
    };
  }
}