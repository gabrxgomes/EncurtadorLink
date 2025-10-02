# Encurtador de Links

Um encurtador de links simples e eficiente construído com Next.js, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

- ✅ **Encurtamento de URLs**: Transforme URLs longas em links curtos
- ✅ **Redirecionamento automático**: Links encurtados redirecionam para URLs originais
- ✅ **Contagem de cliques**: Rastreamento básico de analytics
- ✅ **Interface responsiva**: Design moderno com Tailwind CSS
- ✅ **Página de estatísticas**: Visualize quantos cliques seu link recebeu
- ✅ **Validação de URLs**: Verifica se a URL é válida antes de encurtar

## 🛠️ Tecnologias

- **Frontend**: Next.js 15 + TypeScript
- **Estilização**: Tailwind CSS
- **Banco de dados**: In-memory (para MVP)
- **Deploy**: Vercel-ready

## 📦 Instalação

⚠️ **Requisito**: Node.js 18.18.0+ ou 20.0.0+

1. **Clone o repositório**
```bash
git clone <repo-url>
cd link-shortener
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

4. **Execute o projeto**
```bash
npm run dev
```

O app estará disponível em `http://localhost:3000`

## 🚀 Deploy na Vercel

1. **Conecte seu repositório na Vercel**
2. **Configure a variável de ambiente**:
   - `NEXT_PUBLIC_BASE_URL`: URL do seu domínio (ex: `https://seuapp.vercel.app`)
3. **Deploy automático** ✨

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── shorten/          # API para encurtar URLs
│   │   └── stats/            # API para buscar estatísticas
│   ├── stats/[shortCode]/    # Página de estatísticas
│   ├── [shortCode]/          # Página de redirecionamento
│   └── page.tsx              # Página principal
├── lib/
│   ├── database.ts           # Banco de dados em memória
│   └── utils.ts              # Funções utilitárias
```

## 🎯 Como Usar

1. **Encurtar um link**:
   - Cole sua URL na página principal
   - Clique em "Encurtar"
   - Copie o link gerado

2. **Ver estatísticas**:
   - Clique em "Ver estatísticas" após gerar um link
   - Ou acesse `/stats/{shortCode}`

## 🔮 Próximas Funcionalidades

- [ ] **Autenticação**: Login/registro de usuários
- [ ] **Banco de dados persistente**: PostgreSQL/Supabase
- [ ] **Analytics avançados**: Geolocalização, dispositivos, referrers
- [ ] **Links customizados**: Escolher seu próprio código
- [ ] **QR Codes**: Gerar QR codes para links
- [ ] **Dashboard**: Painel para gerenciar todos os links
- [ ] **API Rate Limiting**: Limitar requests por IP
- [ ] **Expiração de links**: Links com data de validade

## 💰 Monetização Futura

- **Freemium**: 10 links grátis, ilimitado pago
- **Analytics Pro**: Dados detalhados de cliques
- **Links customizados**: URLs personalizadas
- **Sem anúncios**: Experiência premium
- **API Access**: Integração para desenvolvedores

## 🎨 Features Implementadas

### Página Principal
- Interface limpa para encurtar URLs
- Formulário de entrada com validação
- Exibição do link encurtado com botão de copiar

### Página de Estatísticas
- Visualização do número total de cliques
- Informações sobre o link (URL original, data de criação)
- Opções para copiar ou criar novo link

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
