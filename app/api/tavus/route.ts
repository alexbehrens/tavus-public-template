import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  const response = await fetch('https://tavusapi.com/v2/conversations', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.TAVUS_API_KEY || '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  return NextResponse.json(result);
}
