import { z } from "zod";

export class APIError {
  message: String = "";

  constructor(message: String) {
    this.message = message;
  }
}

export const APIResult = z.object({
  overallScore: z.number(),
  doc1Filename: z.string(),
  doc2Filename: z.string(),
  doc1Size: z.number(),
  doc2Size: z.number(),
  highlights: z.array(
    z.object({
      doc1Sentence: z.string(),
      doc2Sentence: z.string(),
      similarity: z.number(),
    })
  ),
  sideBySide: z.array(
    z.object({
      doc1Sentence: z.string(),
      doc2Sentence: z.string(),
      similarity: z.number(),
      isSimilar: z.boolean(),
    })
  ),
});
