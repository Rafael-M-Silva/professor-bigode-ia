"use client";
import { useState, useRef, useEffect } from "react";
import Bg from "./Bg";
import Button from "./Button";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaGreaterThanEqual, FaQuestion } from "react-icons/fa6";
import { FaGlassMartiniAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import Loading from "./Loading";

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  async function getMessage(e: any) {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");
    
    try {
      setIsLoading(true);
      const res = await fetch("https://professor-bigode-ia.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: [...messages, { role: "user", content: message }],
        }),
      });

      const resChat = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: resChat }]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-3xl inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex flex-col gap-12">
      <Bg />
      <div className="flex flex-col text-center">
        <h1 className="text-3xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-1">
          Professor Bigode
        </h1>
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>
        <p className="text-zinc-600">Faça uma pergunta meu camarada!</p>
      </div>
      <div className="relative backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl">
        <form onSubmit={getMessage}>
          <div className="flex flex-col gap-4 rounded-md border border-input transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 w-full max-h-[60vh] px-4 py-3 resize-none bg-transparent border-none text-white/90 text-sm focus:outline-none placeholder:text-white/20 overflow-y-auto">
            {messages.map((msg, i) => (
          
                <div
                  key={i}
                  className={` max-w-[80%] py-1 px-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-zinc-800 text-white self-end"
                      : "bg-zinc-900 text-white/80 self-start"
                  }`}
                >
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
             
            ))}
            {isLoading ? <Loading /> : ''}
            <div ref={messagesEndRef} />
          </div>
          <textarea
            className="flex rounded-md border border-input transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 w-full px-4 py-3 resize-none bg-transparent border-none text-white/90 text-sm focus:outline-none placeholder:text-white/20 min-h-[60px]"
            placeholder="Faça uma pergunta..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                (e.target as HTMLTextAreaElement).form?.requestSubmit();
              }
            }}
          />
          <div className="p-4 border-t border-white/[0.05] flex items-center justify-between gap-4">
            <div className="flex gap-3.5 ">
              <Button
                text="About"
                type="submit"
                onClick={() => {
                  setMessage("Sobre o Dev");
                }}
                icon={<FaQuestion />}
              />
              <Button
                text="Dev's"
                type="submit"
                onClick={() => {
                  setMessage("Quem é o Dev?");
                }}
                icon={<FaGreaterThanEqual />}
              />
              <Button
                text="Brindar"
                type="submit"
                onClick={() => {
                  setMessage("Vamos Brindar! Tin Tin");
                }}
                icon={<FaGlassMartiniAlt />}
              />
            </div>
            <Button
              text="Enviar"
              type="submit"
              disabled={!message.trim()}
              icon={<IoPaperPlaneOutline />}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
