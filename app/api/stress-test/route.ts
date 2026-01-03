import { NextResponse } from 'next/server';
import { runStressTest } from '@/lib/stress-test';

export async function POST(request: Request) {
  const { startupName, description, scenario } = await request.json();
  const result = await runStressTest(startupName, description, scenario);
  return NextResponse.json(result);
}