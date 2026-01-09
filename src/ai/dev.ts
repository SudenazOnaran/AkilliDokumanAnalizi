import { config } from 'dotenv';
config();

import '@/ai/flows/ai-error-reporting.ts';
import '@/ai/flows/semantic-question-answering.ts';
import '@/ai/flows/document-summarization.ts';