import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { generateShortCode, isValidUrl } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL é obrigatória' },
        { status: 400 }
      );
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: 'URL inválida' },
        { status: 400 }
      );
    }

    const shortCode = generateShortCode();

    await db.saveUrl(url, shortCode);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const shortUrl = `${baseUrl}/${shortCode}`;

    return NextResponse.json({ shortUrl, shortCode });
  } catch (error) {
    console.error('Erro ao encurtar URL:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}