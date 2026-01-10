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

export async function deleteSummary(summaryId: string) {
  return await prisma.summary.delete({
    where: { id: summaryId },
  });
}

export async function saveChatHistory({
  documentId,
  question,
  answer,
}: {
  documentId: string;
  question: string;
  answer: string;
}) {
  return prisma.chatHistory.create({
    data: {
      documentId,
      question,
      answer,
    },
  });
}

export async function getChatHistory(documentId: string) {
  return prisma.chatHistory.findMany({
    where: { documentId },
    orderBy: { createdAt: "desc" },
  });
}

