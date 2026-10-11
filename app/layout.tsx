import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'LegalDraft AI | Document Workspace',description:'Draft, edit, save, and export legal document templates.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
