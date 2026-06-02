"use client";

import { useState } from "react";
import {
  Plus,
  Zap,
  Droplets,
  Brush,
  Home,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  X,
} from "lucide-react";

const VERDE = "#111111";
const VERDE_ESCURO = "#222222";

type StatusChamado = "aberto" | "em_andamento" | "resolvido";

type Chamado = {
  id: string;
  categoria: string;
  descricao: string;
  status: StatusChamado;
  data: string;
  previsao?: string;
};

const categorias = [
  { id: "eletrica", label: "Elétrica", icon: Zap },
  { id: "hidraulica", label: "Hidráulica", icon: Droplets },
  { id: "limpeza", label: "Limpeza", icon: Brush },
  { id: "estrutura", label: "Estrutura", icon: Home },
  { id: "outros", label: "Outros", icon: MoreHorizontal },
];

const chamadosIniciais: Chamado[] = [
  {
    id: "c1",
    categoria: "Hidráulica",
    descricao:
      "Torneira da cozinha com vazamento leve. Está pingando há 3 dias.",
    status: "aberto",
    data: "01/06/2025",
  },
  {
    id: "c2",
    categoria: "Elétrica",
    descricao: "Tomada do quarto principal não está funcionando.",
    status: "resolvido",
    data: "10/04/2025",
    previsao: "12/04/2025",
  },
  {
    id: "c3",
    categoria: "Limpeza",
    descricao: "Limpeza da caixa d'água.",
    status: "resolvido",
    data: "15/02/2025",
    previsao: "18/02/2025",
  },
];

const statusConfig: Record<
  StatusChamado,
  { label: string; bg: string; color: string; icon: typeof Clock }
> = {
  aberto: { label: "Aberto", bg: "#FEF3C7", color: "#92400E", icon: Clock },
  em_andamento: {
    label: "Em andamento",
    bg: "#DBEAFE",
    color: "#1E40AF",
    icon: AlertCircle,
  },
  resolvido: {
    label: "Resolvido",
    bg: "#D1FAE5",
    color: "#065F46",
    icon: CheckCircle,
  },
};

export default function PortalSolicitacoesPage() {
  const [chamados, setChamados] = useState<Chamado[]>(chamadosIniciais);
  const [abrirForm, setAbrirForm] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [filtro, setFiltro] = useState<"todos" | StatusChamado>("todos");
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = () => {
    if (!categoria || !descricao.trim()) return;
    const novo: Chamado = {
      id: `c${Date.now()}`,
      categoria: categorias.find((c) => c.id === categoria)?.label ?? categoria,
      descricao,
      status: "aberto",
      data: new Date().toLocaleDateString("pt-BR"),
    };
    setChamados((prev) => [novo, ...prev]);
    setCategoria("");
    setDescricao("");
    setAbrirForm(false);
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  const filtrados = chamados.filter(
    (c) => filtro === "todos" || c.status === filtro,
  );

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {chamados.filter((c) => c.status === "aberto").length} chamado(s)
            aberto(s)
          </p>
        </div>
        <button
          onClick={() => setAbrirForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium"
          style={{ backgroundColor: VERDE }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = VERDE_ESCURO)
          }
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = VERDE)}
        >
          <Plus size={15} />
          Novo Chamado
        </button>
      </div>

      {/* Aviso de envio */}
      {enviado && (
        <div
          className="flex items-center gap-2 p-3 rounded-md text-sm font-medium"
          style={{ backgroundColor: "#D1FAE5", color: "#065F46" }}
        >
          <CheckCircle size={15} />
          Chamado aberto com sucesso! A administração foi notificada.
        </div>
      )}

      {/* Formulário novo chamado */}
      {abrirForm && (
        <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
          <div
            className="flex items-center justify-between px-5 py-4 text-white"
            style={{ backgroundColor: VERDE }}
          >
            <p className="text-sm font-semibold">Novo Chamado de Manutenção</p>
            <button onClick={() => setAbrirForm(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="p-5 space-y-4">
            {/* Categoria */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Categoria
              </label>
              <div className="grid grid-cols-5 gap-2">
                {categorias.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoria(cat.id)}
                      className="flex flex-col items-center gap-1 p-2 rounded-md border-2 text-xs font-medium transition-all"
                      style={{
                        borderColor: categoria === cat.id ? VERDE : "#E5E7EB",
                        backgroundColor:
                          categoria === cat.id ? "#F5F5F5" : "white",
                        color: categoria === cat.id ? VERDE : "#6B7280",
                      }}
                    >
                      <Icon size={18} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o problema com detalhes: onde está, há quanto tempo, etc."
                rows={4}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md resize-none outline-none transition-colors"
                onFocus={(e) => (e.target.style.borderColor = VERDE)}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
              <p className="text-xs text-gray-400 mt-1">
                {descricao.length}/500
              </p>
            </div>

            {/* Upload de foto */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Fotos (opcional)
              </label>
              <div
                className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors"
                style={{ borderColor: "#E5E7EB" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = VERDE)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#E5E7EB")
                }
              >
                <Upload size={20} className="mx-auto mb-1 text-gray-300" />
                <p className="text-xs text-gray-400">
                  Clique para anexar fotos do problema
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setAbrirForm(false)}
                className="flex-1 py-2 rounded-md text-sm font-medium border border-gray-200 text-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleEnviar}
                disabled={!categoria || !descricao.trim()}
                className="flex-1 py-2 rounded-md text-sm font-medium text-white transition-opacity"
                style={{
                  backgroundColor: VERDE,
                  opacity: !categoria || !descricao.trim() ? 0.4 : 1,
                }}
              >
                Enviar Chamado
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtros + lista */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-700">Histórico</p>
          <div className="flex gap-2">
            {(["todos", "aberto", "em_andamento", "resolvido"] as const).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFiltro(f)}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: filtro === f ? VERDE : "#F3F4F6",
                    color: filtro === f ? "white" : "#6B7280",
                  }}
                >
                  {f === "todos" ? "Todos" : statusConfig[f].label}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {filtrados.length === 0 && (
            <p className="px-5 py-6 text-sm text-gray-400 text-center">
              Nenhum chamado encontrado.
            </p>
          )}
          {filtrados.map((c) => {
            const cfg = statusConfig[c.status];
            const Icon = cfg.icon;
            return (
              <div key={c.id} className="px-5 py-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
                    >
                      {c.categoria}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: cfg.bg, color: cfg.color }}
                    >
                      <Icon size={10} />
                      {cfg.label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {c.data}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{c.descricao}</p>
                {c.previsao && (
                  <p className="text-xs text-gray-400">
                    Resolvido em: {c.previsao}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
