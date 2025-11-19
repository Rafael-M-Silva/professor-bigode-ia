````md
# 👨‍🏫 Professor Bigode IA

Chatbot em forma de “professor de programação” que responde dúvidas técnicas com a personalidade do **Professor Bigode**: direto, didático e sem enrolação.

> 🔗 Deploy: https://professor-bigode-ia.vercel.app  

O objetivo do projeto é servir como laboratório para estudar **Next.js + IA + RAG**, além de ser um assistente para alunos tirarem dúvidas sobre lógica, JavaScript, front-end e carreira.

---

## ✨ Funcionalidades

- 💬 **Chat em tempo real** com interface simples e responsiva
- 👨‍🏫 **Persona fixa do Professor Bigode** (via `SYSTEM_PROMPT`)
- 📚 **RAG básico** usando um arquivo de conhecimento (`KNOWLEDGE`) com contexto adicional
- 🧠 Uso de **Ollama Cloud** como LLM (modelo `gpt-oss:120b-*`)
- 🧵 Suporte a **histórico de conversa** (`history`) enviado para a API
- ☁️ **Deploy na Vercel** usando apenas o próprio Next (API Routes + Front)

---

## 🧱 Stack utilizada

- [Next.js (App Router) + TypeScript](https://nextjs.org/)
- React 18
- Tailwind CSS
- [Ollama Cloud](https://ollama.com/) – modelo `gpt-oss:120b-*`
- Node.js 18+ / 20+

---

## 📂 Estrutura do projeto (resumida)

```bash
professor-bigode-ia/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # Rota da API que conversa com o Ollama
│   ├── components/
│   │   ├── Chat.tsx          # Componente principal do chat
│   │   └── ...               # Outros componentes (BG, Button, etc.)
│   └── page.tsx              # Página inicial que renderiza o chat
├── rag/
│   ├── systemPrompt.ts       # Persona do Professor Bigode (SYSTEM_PROMPT)
│   └── knowledge.ts          # Base de conhecimento (KNOWLEDGE) usada no RAG
├── public/                   # Imagens, favicons, etc.
├── package.json
├── next.config.ts
└── tailwind.config.js
````

> Os nomes podem variar um pouco conforme as próximas refatorações, mas a ideia geral é essa:
> **front + API no Next + camada de RAG em arquivos separados.**

---

## ⚙️ Configuração do ambiente

### 1. Clonar o repositório

```bash
git clone https://github.com/Rafael-M-Silva/professor-bigode-ia.git
cd professor-bigode-ia
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn
# ou
pnpm install
```

### 3. Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
OLLAMA_API_KEY=SEU_TOKEN_DA_OLLAMA_AQUI
```

Se você estiver usando uma URL específica de API, também pode adicionar (opcional):

```env
NEXT_PUBLIC_API_URL=/api/chat
```

> Em produção (Vercel), configure as mesmas variáveis em **Settings → Environment Variables**.

---

## 🧠 Rota da API (`/api/chat`)

A rota da API recebe a mensagem do usuário e o histórico da conversa, monta o contexto com o `SYSTEM_PROMPT` + `KNOWLEDGE` e envia para o modelo da Ollama.

### Request

`POST /api/chat`

```json
{
  "message": "Professor, explica o que é hoisting em JavaScript?",
  "history": [
    { "role": "user", "content": "Pode me ajudar com JavaScript?" },
    { "role": "assistant", "content": "Bora, manda a dúvida." }
  ]
}
```

### Response (exemplo)

```json
"Hoisting é o comportamento do JavaScript de mover declarações para o topo do escopo..."
```

> Obs.: a resposta atualmente é enviada como **string simples** (`response.message.content`).
> Pode ser alterado depois para um objeto `{ "reply": "..." }` se fizer sentido.

---

## 💻 Rodando o projeto em desenvolvimento

```bash
npm run dev
```

Acesse:

> [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deploy

O projeto está configurado para deploy na **Vercel**:

1. Conectar o repositório no painel da Vercel
2. Configurar as variáveis de ambiente (`OLLAMA_API_KEY`, etc.)
3. Deploy automático via push na branch (`main`, `staging`, etc.)

A rota `/api/chat` é servida pelo próprio Next.js, então o front consome diretamente `"/api/chat"` no mesmo domínio.

---

## 🧭 Próximos passos / ideias

* [ ] Adicionar **streaming de respostas** (para não esperar o texto todo)
* [ ] Salvar conversas em algum storage (Supabase / Mongo / etc.)
* [ ] Criar aba de **configurações** para trocar modelo/persona
* [ ] Melhorar o RAG (leitura de arquivos externos / markdown / PDFs)
* [ ] Adicionar testes básicos (unitário e de integração da rota `/api/chat`)

---

## 👨‍🏫 Sobre o Professor Bigode

Projeto criado por **Rafael Mauricio** como laboratório de:

* IA aplicada ao ensino de programação
* Integração de LLMs com front-end moderno
* Experimentos com RAG e personas para educação
