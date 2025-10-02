import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

interface Props {
  params: { shortCode: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { shortCode } = params;

    const urlData = await db.getUrlByShortCode(shortCode);

    if (!urlData) {
      return NextResponse.json(
        { error: 'Link não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(urlData);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}