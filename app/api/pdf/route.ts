import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { pdfSchema } from '@/lib/validation';
export async function POST(request: Request){
 try{
 const parsed=pdfSchema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:'Invalid document.'},{status:400});
 const doc=await PDFDocument.create();const font=await doc.embedFont(StandardFonts.Helvetica);const bold=await doc.embedFont(StandardFonts.HelveticaBold);
 const width=595.28,height=841.89,margin=52,lineHeight=15;let page=doc.addPage([width,height]);let y=height-margin;
 const title=parsed.data.title.replace(/[^\x20-\x7E]/g,' ');page.drawText(title,{x:margin,y,size:17,font:bold,color:rgb(.09,.24,.20)});y-=35;
 const text=parsed.data.content.replace(/[^\x0A\x20-\x7E]/g,'?');
 for(const paragraph of text.split('\n')){
  const words=paragraph.split(/\s+/);const lines:string[]=[];let current='';
  for(const word of words){const next=current?`${current} ${word}`:word;if(font.widthOfTextAtSize(next,10)>width-2*margin&&current){lines.push(current);current=word;}else current=next;}lines.push(current);
  for(const line of lines){if(y<margin+28){page=doc.addPage([width,height]);y=height-margin;}if(line)page.drawText(line,{x:margin,y,size:10,font,color:rgb(.18,.22,.23)});y-=lineHeight;}
 }
 const bytes=await doc.save();return new NextResponse(Buffer.from(bytes),{headers:{'Content-Type':'application/pdf','Content-Disposition':'attachment; filename="legal-draft.pdf"','Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Could not export PDF.'},{status:400});}
}
