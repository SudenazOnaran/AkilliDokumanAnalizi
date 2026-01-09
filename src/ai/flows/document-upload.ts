"use server";

/**
 * @fileOverview A document upload AI agent that saves to the database.
 *
 * - uploadDocument - A function that handles the document upload process.
 * - DocumentUploadInput - The input type for the uploadDocument function.
 * - DocumentUploadOutput - The return type for the uploadDocument function.
 */

import { ai } from "@/ai/genkit";
import { prisma } from "@/lib/db";
import { z } from "genkit";

const DocumentUploadInputSchema = z.object({
  fileName: z.string().describe("The name of the uploaded file."),
  fileContent: z.string().describe("The content of the uploaded file."),
});
export type DocumentUploadInput = z.infer<typeof DocumentUploadInputSchema>;

const DocumentUploadOutputSchema = z.object({
  documentId: z.string().describe("The unique ID of the uploaded document."),
  fileName: z.string().describe("The name of the uploaded file."),
  message: z
    .string()
    .describe("A message indicating the status of the upload."),
});
export type DocumentUploadOutput = z.infer<typeof DocumentUploadOutputSchema>;

export async function uploadDocument(
  input: DocumentUploadInput
): Promise<DocumentUploadOutput> {
  return uploadDocumentFlow(input);
}

const uploadDocumentFlow = ai.defineFlow(
  {
    name: "uploadDocumentFlow",
    inputSchema: DocumentUploadInputSchema,
    outputSchema: DocumentUploadOutputSchema,
  },
  async (input) => {
    try {
      console.log(`Processing and saving document: ${input.fileName}`);

      const newDocument = await prisma.document.create({
        data: {
          title: input.fileName,
          content: input.fileContent,
        },
      });

      console.log(
        `Document ${newDocument.title} saved with ID: ${newDocument.id}`
      );

      return {
        documentId: newDocument.id,
        fileName: newDocument.title,
        message: "Document uploaded and saved successfully.",
      };
    } catch (error) {
      console.error("Error saving document to database:", error);
      // This error can be propagated to the user in a more friendly way.
      // For now, we are just logging it and returning a generic error message.
      throw new Error("Failed to save document to the database.");
    }
  }
);
