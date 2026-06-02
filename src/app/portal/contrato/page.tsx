"use client";

import {
  Building2,
  Calendar,
  DollarSign,
  FileText,
  Download,
  CheckCircle,
  Clock,
} from "lucide-react";

const VERDE = "#111111";

const info = [
  { label: "Imóvel", valor: "AP-101 – Bloco A" },
  { label: "Endereço", valor: "Rua das Acácias, 450 – Centro" },
  { label: "Tipo", valor: "Apartamento" },
  { label: "Proprietário", valor: "João Pereira Alves" },
  { label: "Data de Início", valor: "15/01/2024" },
  { label: "Data de Término", valor: "15/01/2026" },
  { label: "Valor do Aluguel", valor: "R$ 1.200,00" },
  { label: "Valor do Condomínio", valor: "R$ 300,00" },
  { label: "Total Mensal", valor: "R$ 1.500,00" },
  { label: "Dia de Vencimento", valor: "Todo dia 10" },
  { label: "Reajuste Anual", valor: "IGPM" },
  { label: "Situação", valor: "Ativo" },
];

const arquivos = [
  {
    nome: "Contrato de Locação – Jan 2024.pdf",
    tamanho: "245 KB",
    data: "15/01/2024",
  },
  {
    nome: "Termo Aditivo – Jun 2024.pdf",
    tamanho: "98 KB",
    data: "15/06/2024",
  },
  {
    nome: "Laudo de Vistoria – Jan 2024.pdf",
    tamanho: "1,2 MB",
    data: "15/01/2024",
  },
];

export default function PortalContratoPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Status */}
      <div
        className="flex items-center gap-3 p-4 rounded-md"
        style={{ backgroundColor: "#D1FAE5", border: "1px solid #6EE7B7" }}
      >
        <CheckCircle size={20} style={{ color: VERDE }} />
        <div>
          <p className="text-sm font-bold" style={{ color: "#065F46" }}>
            Contrato Ativo
          </p>
          <p className="text-xs" style={{ color: "#047857" }}>
            Vigência: 15/01/2024 a 15/01/2026 · 18 meses restantes
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-gray-500">Tempo restante</p>
          <div className="w-28 bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="h-2 rounded-full"
              style={{ width: "75%", backgroundColor: VERDE }}
            />
          </div>
        </div>
      </div>

      {/* Informações do contrato */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <Building2 size={16} style={{ color: VERDE }} />
          <h3 className="text-sm font-bold text-gray-700">
            Informações do Contrato
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-gray-50 sm:divide-y-0">
          {info.map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-5 py-3 border-b border-gray-50"
            >
              <span className="text-xs text-gray-500">{row.label}</span>
              <span
                className="text-sm font-medium"
                style={
                  row.label === "Situação" || row.label === "Total Mensal"
                    ? { color: VERDE, fontWeight: 700 }
                    : { color: "#111827" }
                }
              >
                {row.valor}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Próximos vencimentos */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <Calendar size={16} style={{ color: VERDE }} />
          <h3 className="text-sm font-bold text-gray-700">
            Próximos Vencimentos
          </h3>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { mes: "Junho/2025", data: "10/06/2025", status: "pendente" },
            { mes: "Julho/2025", data: "10/07/2025", status: "futuro" },
            { mes: "Agosto/2025", data: "10/08/2025", status: "futuro" },
          ].map((v) => (
            <div key={v.mes} className="flex items-center px-5 py-3 gap-4">
              <Clock size={14} className="text-gray-300 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{v.mes}</p>
                <p className="text-xs text-gray-400">{v.data}</p>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                R$ 1.500,00
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={
                  v.status === "pendente"
                    ? { backgroundColor: "#FEF3C7", color: "#92400E" }
                    : { backgroundColor: "#F3F4F6", color: "#6B7280" }
                }
              >
                {v.status === "pendente" ? "Pendente" : "Futuro"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Arquivos */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <FileText size={16} style={{ color: VERDE }} />
          <h3 className="text-sm font-bold text-gray-700">Documentos</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {arquivos.map((arq) => (
            <div key={arq.nome} className="flex items-center gap-4 px-5 py-3">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#EFF6FF" }}
              >
                <FileText size={16} style={{ color: "#1D4ED8" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {arq.nome}
                </p>
                <p className="text-xs text-gray-400">
                  {arq.tamanho} · {arq.data}
                </p>
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                style={{ backgroundColor: "#F3F4F6", color: "#374151" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#D1FAE5";
                  e.currentTarget.style.color = VERDE;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F3F4F6";
                  e.currentTarget.style.color = "#374151";
                }}
              >
                <Download size={13} />
                Baixar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
