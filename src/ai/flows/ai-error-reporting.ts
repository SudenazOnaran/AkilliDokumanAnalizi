"use server";

/**
 * @fileOverview This file defines a Genkit flow for reporting AI errors.
 *
 * - reportAiError - A function to report AI errors and flag incorrect responses.
 * - AiErrorReportingInput - The input type for the reportAiError function.
 * - AiErrorReportingOutput - The return type for the reportAiError function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const AiErrorReportingInputSchema = z.object({
  query: z
    .string()
    .describe("The user query that generated the incorrect response."),
  incorrectResponse: z
    .string()
    .describe("The AI-generated response that was incorrect."),
  documentId: z
    .string()
    .optional()
    .describe("The ID of the document related to the response, if applicable."),
  feedback: z
    .string()
    .describe("User feedback on why the response was incorrect."),
});
export type AiErrorReportingInput = z.infer<typeof AiErrorReportingInputSchema>;

const AiErrorReportingOutputSchema = z.object({
  success: z
    .boolean()
    .describe("Whether the error report was successfully recorded."),
  message: z
    .string()
    .describe("A message indicating the status of the report."),
});
export type AiErrorReportingOutput = z.infer<
  typeof AiErrorReportingOutputSchema
>;

export async function reportAiError(
  input: AiErrorReportingInput
): Promise<AiErrorReportingOutput> {
  return reportAiErrorFlow(input);
}

const reportAiErrorPrompt = ai.definePrompt({
  name: "reportAiErrorPrompt",
  input: { schema: AiErrorReportingInputSchema },
  output: { schema: AiErrorReportingOutputSchema },
  prompt: `You are an AI error reporting system.  A user has reported an incorrect response from an AI.
  Record the following information for analysis and improvement of the AI model.

  User Query: {{{query}}}
  Incorrect Response: {{{incorrectResponse}}}
  Document ID: {{{documentId}}}
  User Feedback: {{{feedback}}}

  Return a success status and a message confirming that the error has been recorded.`,
});

const reportAiErrorFlow = ai.defineFlow(
  {
    name: "reportAiErrorFlow",
    inputSchema: AiErrorReportingInputSchema,
    outputSchema: AiErrorReportingOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await reportAiErrorPrompt(input);
      // Simulate saving the error report to a database or logging system here.
      console.log("AI Error Report:", input);
      return {
        success: true,
        message: "Error report recorded successfully.",
      };
    } catch (error: any) {
      console.error("Error recording AI error report:", error);
      return {
        success: false,
        message: `Failed to record error report: ${error.message}`,
      };
    }
  }
);
