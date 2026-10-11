import { NextResponse } from 'next/server';
import { draftSchema } from '@/lib/validation';
import { makeDraft } from '@/lib/drafts';
export async function POST(request: Request){
 try { const body=await request.json(); const parsed=draftSchema.safeParse(body); if(!parsed.success)return NextResponse.json({error:'Please complete all required fields with valid values.',details:parsed.error.flatten()},{status:400});return NextResponse.json({content:makeDraft(parsed.data)}); }
 catch {return NextResponse.json({error:'Invalid JSON request.'},{status:400});}
}
