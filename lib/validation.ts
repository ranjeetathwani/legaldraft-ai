import { z } from 'zod';
export const draftSchema=z.object({template:z.enum(['Non-Disclosure Agreement','Service Agreement','Employment Agreement']),partyA:z.string().trim().min(2).max(150),partyB:z.string().trim().min(2).max(150),effectiveDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v=>!Number.isNaN(Date.parse(v)),'Invalid date'),jurisdiction:z.string().trim().min(2).max(120),purpose:z.string().trim().min(5).max(1500),terms:z.string().max(4000).default('')});
export const pdfSchema=z.object({title:z.string().min(1).max(160),content:z.string().min(1).max(30000)});
