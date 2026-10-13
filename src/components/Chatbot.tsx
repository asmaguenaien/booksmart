import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  "Quelles salles sont disponibles ?",
  "Je cherche un espace pour 10 personnes",
  "Tarifs des salles de réunion",
];

const botResponses: Record<string, string> = {
  default:
    "Je suis BookBot, votre assistant de réservation ! 🤖 Je peux vous aider à trouver une salle, vérifier les disponibilités ou répondre à vos questions. Que puis-je faire pour vous ?",
  disponible:
    "Actuellement, voici les espaces disponibles :\n\n🟢 **Salle Horizon** (8 pers.) — Étage 2\n🟢 **Espace Nova** (20 pers.) — RDC\n🟢 **Salle Zénith** (4 pers.) — Étage 3\n\nSouhaitez-vous réserver l'un de ces espaces ?",
  personnes:
    "Pour 10 personnes, je vous recommande :\n\n✨ **Hub Créatif** — 12 places, Étage 1, 20€/h\nÉquipé de bureaux ajustables et d'une cuisine.\n\n✨ **Espace Nova** — 20 places, RDC, 15€/h\nIdéal pour le travail collaboratif.\n\nVoulez-vous voir les créneaux disponibles ?",
  tarif:
    "Voici nos tarifs horaires :\n\n💰 Salle Zénith (4 pers.) — **25€/h**\n💰 Salle Horizon (8 pers.) — **35€/h**\n💰 Espace Nova (20 pers.) — **15€/h**\n💰 Hub Créatif (12 pers.) — **20€/h**\n💰 Terrasse Panorama (50 pers.) — **90€/h**\n💰 Auditorium Lumière (100 pers.) — **120€/h**\n\nDes réductions sont disponibles pour les réservations longue durée !",
};

function getReply(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("tarif") || lower.includes("prix") || lower.includes("coût")) return botResponses.tarif;
  if (lower.includes("personne") || lower.includes("place")) return botResponses.personnes;
  if (lower.includes("disponible") || lower.includes("salle")) return botResponses.disponible;
  return "Je comprends votre demande ! Pour une assistance plus personnalisée, n'hésitez pas à préciser le type d'espace, le nombre de participants ou la date souhaitée. 😊";
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "assistant", content: botResponses.default },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: getReply(text) };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-primary shadow-chat"
          >
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border bg-card shadow-chat"
          >
            {/* Header */}
            <div className="flex items-center justify-between gradient-primary px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-primary-foreground">BookBot</h3>
                  <p className="text-xs text-primary-foreground/70">Assistant de réservation</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent">
                      <Bot className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      m.role === "user"
                        ? "gradient-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Bot className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div className="flex gap-2 overflow-x-auto px-4 pb-2">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => send(qr)}
                    className="shrink-0 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t px-4 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 rounded-xl bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" size="icon" disabled={!input.trim()} className="shrink-0 rounded-xl">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
