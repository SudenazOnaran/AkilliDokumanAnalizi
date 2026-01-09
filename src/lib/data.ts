// This file is no longer needed for documents as they are fetched from the database.
// It can be kept for other static data or removed if not used elsewhere.

export type Document = {
  id: string;
  title: string;
  type: "pdf" | "txt";
  content: string;
};

// The documents array is now obsolete.
export const documents: Document[] = [];
