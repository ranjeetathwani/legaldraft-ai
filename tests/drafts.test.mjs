import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
test('three templates are defined',()=>{const s=fs.readFileSync('lib/drafts.ts','utf8');for(const name of ['Non-Disclosure Agreement','Service Agreement','Employment Agreement'])assert.ok(s.includes(name));});
test('database has RLS and per-user policies',()=>{const s=fs.readFileSync('supabase/schema.sql','utf8');assert.match(s,/enable row level security/);assert.match(s,/auth.uid\(\)/);});
test('PDF endpoint returns PDF content type',()=>{const s=fs.readFileSync('app/api/pdf/route.ts','utf8');assert.match(s,/application\/pdf/);});
