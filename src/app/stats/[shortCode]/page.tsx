'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

interface UrlData {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

interface Props {
  params: { shortCode: string };
}

export default function StatsPage({ params }: Props) {
  const [urlData, setUrlData] = useState<UrlData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { shortCode } = params;

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`/api/stats/${shortCode}`);
        if (!response.ok) {
          notFound();
          return;
        }
        const data = await response.json();
        setUrlData(data);
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-800 border-t-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!urlData) {
    notFound();
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const shortUrl = `${baseUrl}/${shortCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Estatísticas
            </h1>
            <p className="text-gray-400 text-lg">
              Acompanhe o desempenho do seu link
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-800 mb-6">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {urlData.clicks.toLocaleString('pt-BR')}
              </div>
              <div className="text-gray-400 text-lg">
                {urlData.clicks === 1 ? 'clique' : 'cliques'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Status</div>
                    <div className="text-green-400 font-semibold">Ativo</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Criado em</div>
                    <div className="text-blue-400 font-semibold">
                      {new Date(urlData.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* URL Info */}
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-gray-800">
            <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Informações do Link
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  URL Original
                </label>
                <div className="p-3 bg-black/50 border border-gray-700 rounded-lg break-all">
                  <a
                    href={urlData.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 transition"
                  >
                    {urlData.originalUrl}
                  </a>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Link Encurtado
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 p-3 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
                    <a
                      href={shortUrl}
                      className="text-cyan-400 font-medium break-all"
                    >
                      {shortUrl}
                    </a>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition flex items-center gap-2 flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <a
                  href="/"
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Encurtar Novo Link
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
