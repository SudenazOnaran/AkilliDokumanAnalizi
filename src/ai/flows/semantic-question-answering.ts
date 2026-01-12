"use server";

/**
 * @fileOverview A semantic question answering AI agent.
 *
 * - semanticQuestionAnswering - A function that handles the semantic question answering process.
 * - SemanticQuestionAnsweringInput - The input type for the semanticQuestionAnswering function.
 * - SemanticQuestionAnsweringOutput - The return type for the semanticQuestionAnswering function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const SemanticQuestionAnsweringInputSchema = z.object({
  documentText: z.string().describe("The text content of the document."),
  question: z
    .string()
    .describe("The question to be answered based on the document content."),
});
export type SemanticQuestionAnsweringInput = z.infer<
  typeof SemanticQuestionAnsweringInputSchema
>;

const SemanticQuestionAnsweringOutputSchema = z.object({
  answer: z
    .string()
    .describe("The answer to the question based on the document content."),
  sourceDocuments: z
    .array(z.string())
    .describe("The list of source documents used to answer the question."),
});
export type SemanticQuestionAnsweringOutput = z.infer<
  typeof SemanticQuestionAnsweringOutputSchema
>;

export async function semanticQuestionAnswering(
  input: SemanticQuestionAnsweringInput
): Promise<SemanticQuestionAnsweringOutput> {
  return semanticQuestionAnsweringFlow(input);
}

const prompt = ai.definePrompt({
  name: "semanticQuestionAnsweringPrompt",
  input: { schema: SemanticQuestionAnsweringInputSchema },
  output: { schema: SemanticQuestionAnsweringOutputSchema },
  prompt: `Sen, verilen doküman içeriğine dayanarak soruları yanıtlayan bir uzmansın.
  Sorunun cevabını yalnızca sağlanan doküman metnine göre oluştur.
  Cevabı üretirken kullandığın kaynak dokümanları da belirt.

  Doküman Metni:
  {{documentText}}

  Soru: {{question}}
  `,
});

const semanticQuestionAnsweringFlow = ai.defineFlow(
  {
    name: "semanticQuestionAnsweringFlow",
    inputSchema: SemanticQuestionAnsweringInputSchema,
    outputSchema: SemanticQuestionAnsweringOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
