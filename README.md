# Site HARD da Bruna 🎉

Um site interativo e divertido que celebra a frase icônica da Bruna "HARD que sim!".

## Funcionalidades

- **Botão HARD Gigante**: Clique e veja animações explosivas com confetti e a foto da Bruna
- **Gerador de Frases**: Digite algo e receba uma resposta "HARD" da Bruna
- **Text-to-Speech**: As frases são faladas com voz sintética
- **Animações**: Efeitos visuais suaves com Framer Motion
- **Responsivo**: Funciona perfeitamente em desktop e mobile

## Tecnologias

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Canvas Confetti
- Web Speech API

## Como executar localmente

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Deploy no Vercel

### Opção 1: Deploy automático via GitHub

1. Faça push do código para um repositório GitHub
2. Conecte o repositório no [Vercel](https://vercel.com)
3. O deploy será automático!

### Opção 2: Deploy via CLI do Vercel

1. Instale o Vercel CLI:
```bash
npm i -g vercel
```

2. Faça login no Vercel:
```bash
vercel login
```

3. Execute o deploy:
```bash
vercel
```

4. Siga as instruções na tela

### Opção 3: Deploy via interface web do Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório GitHub ou faça upload do código
4. Configure as opções de build (geralmente automático para Next.js)
5. Clique em "Deploy"

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   └── globals.css         # Estilos globais
├── components/
│   ├── BrunaPhoto.tsx      # Componente da foto com animações
│   ├── HardButton.tsx      # Botão HARD gigante
│   └── PhraseGenerator.tsx # Gerador de frases
└── lib/
    └── textToSpeech.ts     # Utilitário para text-to-speech
```

## Personalização

- **Cores**: Modifique as classes Tailwind nos componentes
- **Animações**: Ajuste as configurações do Framer Motion
- **Frases**: Adicione mais variações no arquivo `textToSpeech.ts`
- **Som**: Configure diferentes vozes ou parâmetros de speech

## Notas

- O site usa a Web Speech API nativa do navegador para text-to-speech
- Funciona melhor em navegadores modernos (Chrome, Firefox, Safari)
- As animações são otimizadas para performance
- Totalmente responsivo e mobile-friendly

Divirta-se! 🎉