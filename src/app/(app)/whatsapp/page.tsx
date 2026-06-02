"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Send,
  CheckCheck,
  Check,
  AlertCircle,
  MessageCircle,
  Phone,
  MoreVertical,
  Zap,
  Users,
  ChevronDown,
  ChevronUp,
  X,
  Megaphone,
} from "lucide-react";
import { mockConversas, mockTemplates } from "@/data/mock";
import type {
  ConversaWhatsApp,
  MensagemWhatsApp,
  TemplateWhatsApp,
} from "@/types";

const VERDE = "#111111";
const VERDE_ESCURO = "#222222";

function statusIcon(status: MensagemWhatsApp["status"]) {
  if (status === "erro")
    return <AlertCircle size={13} style={{ color: "#DC2626" }} />;
  if (status === "lido")
    return <CheckCheck size={13} style={{ color: "#111111" }} />;
  if (status === "entregue")
    return <CheckCheck size={13} style={{ color: "#9CA3AF" }} />;
  return <Check size={13} style={{ color: "#9CA3AF" }} />;
}

function tipoBadge(tipo: MensagemWhatsApp["tipo"]) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    cobranca: { label: "Cobrança", bg: "#FEF3C7", color: "#92400E" },
    boleto: { label: "Boleto", bg: "#EDE9FE", color: "#5B21B6" },
    lembrete: { label: "Lembrete", bg: "#DBEAFE", color: "#1E40AF" },
    confirmacao: { label: "Confirmação", bg: "#D1FAE5", color: "#065F46" },
    manutencao: { label: "Manutenção", bg: "#FCE7F3", color: "#9D174D" },
    texto: { label: "", bg: "", color: "" },
  };
  const t = map[tipo];
  if (!t || !t.label) return null;
  return (
    <span
      className="inline-block text-xs font-semibold px-1.5 py-0.5 rounded mb-1"
      style={{ backgroundColor: t.bg, color: t.color }}
    >
      {t.label}
    </span>
  );
}

function iniciais(nome: string) {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ── Painel de Disparo em Massa ───────────────────────────────────────────────
function DisparoEmMassa({
  onClose,
  conversas,
}: {
  onClose: () => void;
  conversas: ConversaWhatsApp[];
}) {
  const [template, setTemplate] = useState<TemplateWhatsApp | null>(null);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [enviado, setEnviado] = useState(false);

  const toggleSel = (id: string) =>
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const toggleTodos = () =>
    setSelecionados(
      selecionados.length === conversas.length
        ? []
        : conversas.map((c) => c.id),
    );

  const handleEnviar = () => {
    if (!template || selecionados.length === 0) return;
    setEnviado(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-md shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 text-white"
          style={{ backgroundColor: VERDE }}
        >
          <div className="flex items-center gap-2">
            <Megaphone size={18} />
            <span className="font-semibold">Disparo em Massa</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded transition-colors"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = VERDE_ESCURO)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <X size={18} />
          </button>
        </div>

        {enviado ? (
          <div className="p-10 flex flex-col items-center gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#D1FAE5" }}
            >
              <CheckCheck size={32} style={{ color: VERDE }} />
            </div>
            <p className="font-semibold text-gray-800 text-lg">
              Mensagens disparadas!
            </p>
            <p className="text-gray-500 text-sm text-center">
              Mensagem enviada para <strong>{selecionados.length}</strong>{" "}
              inquilino(s) com sucesso.
            </p>
            <button
              className="mt-4 px-6 py-2 rounded-md text-white font-medium text-sm"
              style={{ backgroundColor: VERDE }}
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        ) : (
          <div className="p-5 space-y-5">
            {/* Escolher template */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                1. Escolha o template de mensagem
              </label>
              <div className="grid grid-cols-2 gap-2">
                {mockTemplates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t)}
                    className="text-left p-3 rounded-md border-2 transition-all text-sm"
                    style={{
                      borderColor: template?.id === t.id ? VERDE : "#E5E7EB",
                      backgroundColor:
                        template?.id === t.id ? "#F5F5F5" : "white",
                      color: template?.id === t.id ? VERDE_ESCURO : "#374151",
                    }}
                  >
                    <p className="font-medium">{t.nome}</p>
                  </button>
                ))}
              </div>
              {template && (
                <div
                  className="mt-2 p-3 rounded-md text-xs text-gray-600 whitespace-pre-wrap"
                  style={{
                    backgroundColor: "#F9FAFB",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  {template.conteudo}
                </div>
              )}
            </div>

            {/* Selecionar destinatários */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  2. Selecione os destinatários
                </label>
                <button
                  onClick={toggleTodos}
                  className="text-xs font-medium"
                  style={{ color: VERDE }}
                >
                  {selecionados.length === conversas.length
                    ? "Desmarcar todos"
                    : "Selecionar todos"}
                </button>
              </div>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {conversas.map((c) => (
                  <label
                    key={c.id}
                    className="flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors"
                    style={{
                      backgroundColor: selecionados.includes(c.id)
                        ? "#F5F5F5"
                        : "#F9FAFB",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selecionados.includes(c.id)}
                      onChange={() => toggleSel(c.id)}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: VERDE }}
                    />
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: VERDE }}
                    >
                      {iniciais(c.inquilinoNome)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {c.inquilinoNome}
                      </p>
                      <p className="text-xs text-gray-500">
                        {c.imovelCodigo} · {c.telefone}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Botão enviar */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                {selecionados.length} destinatário(s) selecionado(s)
              </p>
              <button
                onClick={handleEnviar}
                disabled={!template || selecionados.length === 0}
                className="flex items-center gap-2 px-5 py-2 rounded-md text-white font-medium text-sm transition-opacity"
                style={{
                  backgroundColor: VERDE,
                  opacity: !template || selecionados.length === 0 ? 0.4 : 1,
                }}
              >
                <Send size={15} />
                Disparar mensagens
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Página Principal ─────────────────────────────────────────────────────────
export default function WhatsAppPage() {
  const [conversas, setConversas] = useState<ConversaWhatsApp[]>(mockConversas);
  const [conversaAtiva, setConversaAtiva] = useState<ConversaWhatsApp>(
    mockConversas[0],
  );
  const [busca, setBusca] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarTemplates, setMostrarTemplates] = useState(false);
  const [mostrarDisparo, setMostrarDisparo] = useState(false);
  const [filtro, setFiltro] = useState<"todos" | "naoLidas">("todos");
  const chatRef = useRef<HTMLDivElement>(null);

  // Scroll automático ao fim do chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversaAtiva]);

  const conversasFiltradas = conversas.filter((c) => {
    const buscaOk =
      c.inquilinoNome.toLowerCase().includes(busca.toLowerCase()) ||
      c.imovelCodigo.toLowerCase().includes(busca.toLowerCase());
    const filtroOk =
      filtro === "todos" || (filtro === "naoLidas" && c.naoLidas > 0);
    return buscaOk && filtroOk;
  });

  const abrirConversa = (c: ConversaWhatsApp) => {
    // Zera não lidas ao abrir
    setConversas((prev) =>
      prev.map((cv) => (cv.id === c.id ? { ...cv, naoLidas: 0 } : cv)),
    );
    setConversaAtiva({ ...c, naoLidas: 0 });
  };

  const enviarMensagem = (texto?: string) => {
    const conteudo = texto ?? mensagem.trim();
    if (!conteudo) return;

    const nova: MensagemWhatsApp = {
      id: `msg-${Date.now()}`,
      remetente: "admin",
      tipo: "texto",
      conteudo,
      hora: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "enviado",
    };

    const atualizada = {
      ...conversaAtiva,
      mensagens: [...conversaAtiva.mensagens, nova],
    };

    setConversaAtiva(atualizada);
    setConversas((prev) =>
      prev.map((c) => (c.id === conversaAtiva.id ? atualizada : c)),
    );
    setMensagem("");
    setMostrarTemplates(false);

    // Simula entrega após 1s
    setTimeout(() => {
      setConversaAtiva((prev) => ({
        ...prev,
        mensagens: prev.mensagens.map((m) =>
          m.id === nova.id ? { ...m, status: "entregue" } : m,
        ),
      }));
    }, 1000);
  };

  const usarTemplate = (t: TemplateWhatsApp) => {
    // Substitui as variáveis com valores do inquilino ativo
    const texto = t.conteudo
      .replace("{nome}", conversaAtiva.inquilinoNome.split(" ")[0])
      .replace("{imovel}", conversaAtiva.imovelCodigo)
      .replace("{mes}", "junho/2025")
      .replace("{valor}", "1.200,00")
      .replace("{vencimento}", "10/06/2025")
      .replace("{encargos}", "40,50")
      .replace("{data}", "05/06/2025")
      .replace("{horario}", "9h–12h")
      .replace("{link}", "https://boleto.gestaoImob.com.br/xxxxx");
    setMensagem(texto);
    setMostrarTemplates(false);
  };

  const ultimaMensagem = (c: ConversaWhatsApp) => {
    const ultima = c.mensagens[c.mensagens.length - 1];
    if (!ultima) return "";
    const prefixo = ultima.remetente === "admin" ? "Você: " : "";
    return (
      prefixo +
      ultima.conteudo.replace(/\n/g, " ").slice(0, 45) +
      (ultima.conteudo.length > 45 ? "…" : "")
    );
  };

  const totalNaoLidas = conversas.reduce((s, c) => s + c.naoLidas, 0);

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ height: "calc(100vh - 65px)" }}
    >
      {/* ── Painel esquerdo: lista de conversas ── */}
      <div className="w-80 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white">
        {/* Cabeçalho */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} style={{ color: VERDE }} />
              <span className="font-bold text-gray-800 text-sm">WhatsApp</span>
              {totalNaoLidas > 0 && (
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: VERDE }}
                >
                  {totalNaoLidas}
                </span>
              )}
            </div>
            <button
              onClick={() => setMostrarDisparo(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-white text-xs font-medium transition-opacity"
              style={{ backgroundColor: VERDE }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = VERDE_ESCURO)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = VERDE)
              }
              title="Disparar mensagem para múltiplos inquilinos"
            >
              <Megaphone size={13} />
              Disparo em massa
            </button>
          </div>

          {/* Busca */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar inquilino ou imóvel…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md bg-gray-50 outline-none focus:border-green-400 transition-colors"
            />
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mt-2">
            {(["todos", "naoLidas"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className="text-xs px-2.5 py-1 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: filtro === f ? VERDE : "#F3F4F6",
                  color: filtro === f ? "white" : "#6B7280",
                }}
              >
                {f === "todos" ? "Todos" : "Não lidas"}
              </button>
            ))}
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {conversasFiltradas.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400">
              Nenhuma conversa encontrada
            </div>
          ) : (
            conversasFiltradas.map((c) => (
              <button
                key={c.id}
                onClick={() => abrirConversa(c)}
                className="w-full flex items-start gap-3 px-4 py-3 text-left border-b border-gray-50 transition-colors"
                style={{
                  backgroundColor:
                    conversaAtiva.id === c.id ? "#F5F5F5" : "white",
                }}
                onMouseEnter={(e) => {
                  if (conversaAtiva.id !== c.id)
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "#F9FAFB";
                }}
                onMouseLeave={(e) => {
                  if (conversaAtiva.id !== c.id)
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "white";
                }}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{
                      backgroundColor:
                        conversaAtiva.id === c.id ? VERDE : "#6B7280",
                    }}
                  >
                    {iniciais(c.inquilinoNome)}
                  </div>
                  {c.online && (
                    <span
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: VERDE }}
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{
                        color:
                          conversaAtiva.id === c.id ? VERDE_ESCURO : "#111827",
                      }}
                    >
                      {c.inquilinoNome}
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-1">
                      {c.mensagens[c.mensagens.length - 1]?.hora ?? ""}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {c.imovelCodigo}
                  </p>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-xs text-gray-400 truncate flex-1">
                      {ultimaMensagem(c)}
                    </p>
                    {c.naoLidas > 0 && (
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ml-1 flex-shrink-0"
                        style={{ backgroundColor: VERDE }}
                      >
                        {c.naoLidas}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── Painel direito: chat ── */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header do chat */}
        <div
          className="flex items-center justify-between px-5 py-3 text-white flex-shrink-0"
          style={{ backgroundColor: VERDE }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                {iniciais(conversaAtiva.inquilinoNome)}
              </div>
              {conversaAtiva.online && (
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
                  style={{ backgroundColor: "#4ADE80" }}
                />
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">
                {conversaAtiva.inquilinoNome}
              </p>
              <p className="text-xs text-green-100">
                {conversaAtiva.imovelCodigo} · {conversaAtiva.telefone} ·{" "}
                {conversaAtiva.online ? "online" : "offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full transition-colors"
              style={{ color: "white" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = VERDE_ESCURO)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              title="Ligar via WhatsApp"
            >
              <Phone size={16} />
            </button>
            <button
              className="p-2 rounded-full transition-colors"
              style={{ color: "white" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = VERDE_ESCURO)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              title="Mais opções"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Mensagens */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
          style={{
            backgroundImage:
              "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundColor: "#F0F4F0",
          }}
        >
          {conversaAtiva.mensagens.map((msg) => {
            const isAdmin = msg.remetente === "admin";
            return (
              <div
                key={msg.id}
                className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-sm rounded-md px-3 py-2 shadow-sm"
                  style={{
                    backgroundColor: isAdmin ? "#DCF8C6" : "white",
                    borderRadius: isAdmin
                      ? "12px 12px 2px 12px"
                      : "12px 12px 12px 2px",
                  }}
                >
                  {tipoBadge(msg.tipo)}
                  <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {msg.conteudo}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs text-gray-400">{msg.hora}</span>
                    {isAdmin && statusIcon(msg.status)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Painel de templates (expansível) */}
        {mostrarTemplates && (
          <div className="bg-white border-t border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Zap size={13} style={{ color: VERDE }} />
                Templates rápidos
              </p>
              <button
                onClick={() => setMostrarTemplates(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mockTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => usarTemplate(t)}
                  className="text-left px-3 py-2 rounded-md border text-xs font-medium transition-colors"
                  style={{ borderColor: "#E5E7EB", color: "#374151" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = VERDE;
                    e.currentTarget.style.color = VERDE_ESCURO;
                    e.currentTarget.style.backgroundColor = "#F5F5F5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E5E7EB";
                    e.currentTarget.style.color = "#374151";
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  {t.nome}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input de mensagem */}
        <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-end gap-2">
            {/* Botão templates */}
            <button
              onClick={() => setMostrarTemplates(!mostrarTemplates)}
              className="flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-md border text-xs font-medium transition-colors mb-0.5"
              style={{
                borderColor: mostrarTemplates ? VERDE : "#E5E7EB",
                color: mostrarTemplates ? VERDE : "#6B7280",
                backgroundColor: mostrarTemplates ? "#F5F5F5" : "white",
              }}
              title="Templates de mensagem"
            >
              <Zap size={13} />
              {mostrarTemplates ? (
                <ChevronDown size={12} />
              ) : (
                <ChevronUp size={12} />
              )}
            </button>

            {/* Textarea */}
            <div className="flex-1 relative">
              <textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    enviarMensagem();
                  }
                }}
                placeholder="Digite uma mensagem… (Enter para enviar)"
                rows={mensagem.split("\n").length > 3 ? 4 : 2}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md resize-none outline-none transition-colors"
                style={{ lineHeight: "1.5" }}
                onFocus={(e) => (e.target.style.borderColor = VERDE)}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>

            {/* Botão enviar */}
            <button
              onClick={() => enviarMensagem()}
              disabled={!mensagem.trim()}
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white transition-opacity mb-0.5"
              style={{
                backgroundColor: VERDE,
                opacity: mensagem.trim() ? 1 : 0.4,
              }}
              title="Enviar mensagem"
            >
              <Send size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between mt-1.5 px-1">
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Users size={11} />
              {conversas.filter((c) => c.online).length} inquilino(s) online
              agora
            </p>
            <p className="text-xs text-gray-400">Shift+Enter para nova linha</p>
          </div>
        </div>
      </div>

      {/* Modal de Disparo em Massa */}
      {mostrarDisparo && (
        <DisparoEmMassa
          onClose={() => setMostrarDisparo(false)}
          conversas={conversas}
        />
      )}
    </div>
  );
}
