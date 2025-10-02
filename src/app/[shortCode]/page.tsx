import { notFound, redirect } from 'next/navigation';
import { db } from '@/lib/database';

interface Props {
  params: { shortCode: string };
}

export default async function RedirectPage({ params }: Props) {
  const { shortCode } = params;

  const urlData = await db.getUrlByShortCode(shortCode);

  if (!urlData) {
    notFound();
  }

  await db.incrementClicks(shortCode);

  redirect(urlData.originalUrl);
}