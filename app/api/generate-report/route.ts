import { NextResponse } from 'next/server';
import { generateStartupReport } from '@/lib/ai-report';

export async function POST(request: Request) {
  const { name, description } = await request.json();
  const report = await generateStartupReport(name, description);
  return NextResponse.json(report);
}