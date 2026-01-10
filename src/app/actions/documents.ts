"use server";

import { prisma } from "@/lib/db";
import { Document } from "@prisma/client";

export async function getDocuments(): Promise<{ id: string; title: string }[]> {
  return await prisma.document.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getDocumentById(id: string): Promise<Document | null> {
  return await prisma.document.findUnique({
    where: { id },
  });
}

export async function saveSummary(
  documentId: string,
  type: "SHORT" | "LONG",
  content: string
) {
  return await prisma.summary.create({
    data: {
      documentId,
      type,
      content,
    },
  });
}

export async function getSummaries(documentId: string) {
  return await prisma.summary.findMany({
    where: { documentId },
    orderBy: { createdAt: "desc" },
  });
}

