/* o Next.js vai receber uma requisição HTTP POST.

você vai ler o corpo da requisição (payload).

verificar se o campo message existe.

se não tiver, devolve um erro tipo “mensagem obrigatória”.

📦 exemplo:

“Olá, tudo bem?” chega aqui como um objeto JSON. */

import { Ollama } from "ollama";
import { SYSTEM_PROMPT } from "../../rag/systemPrompt";
import { KNOWLEDGE } from "../../rag/knowledge";

export async function POST(request: Request) {
  const { message, history } = await request.json();

  console.log(history);

  if (!message) {
    return Response.json(
      { error: "Campo 'message' é obrigatório" },
      { status: 400 }
    );
  }

  const origin = request.headers.get("origin") || "*";

  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  const ollama = new Ollama({
    host: "https://ollama.com",
    headers: {
      Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
    },
  });

  const response = await ollama.chat({
    model: "gpt-oss:120b",
    messages: [
      {
        role: "system",
        content:
         SYSTEM_PROMPT + "\n\n" + KNOWLEDGE
      },
      ...history,
    ],
    stream: false,
  });

  return Response.json(response.message.content);
}
