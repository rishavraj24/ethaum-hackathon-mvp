import { NextResponse } from 'next/server';
import { findMatches } from '@/lib/ai-matchmaker';

export async function POST(request: Request) {
  const { startupName, description } = await request.json();
  const data = await findMatches(startupName, description);
  return NextResponse.json(data);
}