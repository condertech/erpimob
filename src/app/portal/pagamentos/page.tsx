"use client";

import { useState } from "react";
import {
  Download,
  Copy,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  QrCode,
  FileText,
} from "lucide-react";

const VERDE = "#111111";
const VERDE_ESCURO = "#222222";

type Pagamento = {
  id: string;
  referencia: string;
  vencimento: string;
  pagamento?: string;
  valor: number;
  multa: number;
  juros: number;
  status: "pago" | "pendente" | "atrasado";
};

const pagamentos: Pagamento[] = [
  {
    id: "p1",
    referencia: "Junho/2025",
    vencimento: "10/06/2025",
    valor: 1200,
    multa: 0,
    juros: 0,
    status: "pendente",
  },
  {
    id: "p2",
    referencia: "Maio/2025",
    vencimento: "10/05/2025",
    pagamento: "08/05/2025",
    valor: 1200,
    multa: 0,
    juros: 0,
    status: "pago",
  },
  {
    id: "p3",
    referencia: "Abril/2025",
    vencimento: "10/04/2025",
    pagamento: "07/04/2025",
    valor: 1200,
    multa: 0,
    juros: 0,
    status: "pago",
  },
  {
    id: "p4",
    referencia: "Março/2025",
    vencimento: "10/03/2025",
    pagamento: "15/03/2025",
    valor: 1200,
    multa: 24,
    juros: 6,
    status: "pago",
  },
  {
    id: "p5",
    referencia: "Fevereiro/2025",
    vencimento: "10/02/2025",
    pagamento: "09/02/2025",
    valor: 1200,
    multa: 0,
    juros: 0,
    status: "pago",
  },
  {
    id: "p6",
    referencia: "Janeiro/2025",
    vencimento: "10/01/2025",
    pagamento: "10/01/2025",
    valor: 1200,
    multa: 0,
    juros: 0,
    status: "pago",
  },
];

const PIX_KEY = "admin@gestao.com";

export default function PortalPagamentosPage() {
  const [filtro, setFiltro] = useState<
    "todos" | "pago" | "pendente" | "atrasado"
  >("todos");
  const [pixCopiado, setPixCopiado] = useState(false);
  const [detalhe, setDetalhe] = useState<Pagamento | null>(null);

  const copiarPix = () => {
    navigator.clipboard.writeText(PIX_KEY).catch(() => {});
    setPixCopiado(true);
    setTimeout(() => setPixCopiado(false), 2000);
  };

  const filtrados = pagamentos.filter(
    (p) => filtro === "todos" || p.status === filtro,
  );

  const pendentes = pagamentos.filter((p) => p.status === "pendente");
  const total = pagamentos
    .filter((p) => p.status === "pago")
    .reduce((s, p) => s + p.valor + p.multa + p.juros, 0);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Cards resumo */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Pago (2025)",
            valor: `R$ ${total.toLocaleString("pt-BR")},00`,
            cor: "#D1FAE5",
            corT: "#065F46",
          },
          {
            label: "Pendentes",
            valor: pendentes.length.toString(),
            cor: "#FEF3C7",
            corT: "#92400E",
          },
          { label: "Imóvel", valor: "AP-101", cor: "#EDE9FE", corT: "#5B21B6" },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-md px-4 py-3 flex flex-col"
            style={{ backgroundColor: c.cor }}
          >
            <p className="text-xs font-medium" style={{ color: c.corT }}>
              {c.label}
            </p>
            <p className="text-lg font-bold mt-1" style={{ color: c.corT }}>
              {c.valor}
            </p>
          </div>
        ))}
      </div>

      {/* Boleto/Pix do mês vigente */}
      {pendentes.length > 0 && (
        <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-700">Pagamento do Mês</p>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500">Referência</p>
                <p className="text-base font-bold text-gray-800">
                  {pendentes[0].referencia}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Vencimento</p>
                <p className="text-sm font-semibold text-red-600">
                  {pendentes[0].vencimento}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Valor</p>
                <p className="text-xl font-bold" style={{ color: VERDE }}>
                  R$ {(pendentes[0].valor + 300).toLocaleString("pt-BR")},00
                </p>
                <p className="text-xs text-gray-400">aluguel + condomínio</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium"
                style={{ backgroundColor: VERDE }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = VERDE_ESCURO)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = VERDE)
                }
              >
                <Download size={14} />
                Baixar Boleto
              </button>

              <button
                onClick={copiarPix}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border"
                style={{
                  borderColor: pixCopiado ? VERDE : "#E5E7EB",
                  color: pixCopiado ? VERDE : "#374151",
                  backgroundColor: pixCopiado ? "#D1FAE5" : "white",
                }}
              >
                {pixCopiado ? <CheckCircle size={14} /> : <Copy size={14} />}
                {pixCopiado ? "Copiado!" : "Copiar Chave Pix"}
              </button>

              <button
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-gray-200 text-gray-600"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F9FAFB")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                <Upload size={14} />
                Enviar Comprovante
              </button>

              <button
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-gray-200 text-gray-600"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F9FAFB")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                <QrCode size={14} />
                QR Code Pix
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Chave Pix: <strong>{PIX_KEY}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Histórico */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-700">
            Histórico de Pagamentos
          </p>
          <div className="flex gap-2">
            {(["todos", "pago", "pendente", "atrasado"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className="text-xs px-2.5 py-1 rounded-full font-medium capitalize"
                style={{
                  backgroundColor: filtro === f ? VERDE : "#F3F4F6",
                  color: filtro === f ? "white" : "#6B7280",
                }}
              >
                {f === "todos"
                  ? "Todos"
                  : f === "pago"
                    ? "Pagos"
                    : f === "pendente"
                      ? "Pendentes"
                      : "Atrasados"}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {filtrados.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={
                  p.status === "pago"
                    ? { backgroundColor: "#D1FAE5" }
                    : p.status === "atrasado"
                      ? { backgroundColor: "#FEE2E2" }
                      : { backgroundColor: "#FEF3C7" }
                }
              >
                {p.status === "pago" ? (
                  <CheckCircle size={14} style={{ color: VERDE }} />
                ) : p.status === "atrasado" ? (
                  <AlertCircle size={14} style={{ color: "#DC2626" }} />
                ) : (
                  <Clock size={14} style={{ color: "#D97706" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">
                  {p.referencia}
                </p>
                <p className="text-xs text-gray-400">
                  Vence: {p.vencimento}
                  {p.pagamento && ` · Pago: ${p.pagamento}`}
                  {(p.multa > 0 || p.juros > 0) && (
                    <span className="text-red-500"> · Multa + Juros</span>
                  )}
                </p>
              </div>
              <p className="text-sm font-bold text-gray-800">
                R$ {(p.valor + p.multa + p.juros).toLocaleString("pt-BR")},00
              </p>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={
                  p.status === "pago"
                    ? { backgroundColor: "#D1FAE5", color: "#065F46" }
                    : p.status === "atrasado"
                      ? { backgroundColor: "#FEE2E2", color: "#991B1B" }
                      : { backgroundColor: "#FEF3C7", color: "#92400E" }
                }
              >
                {p.status === "pago"
                  ? "Pago"
                  : p.status === "atrasado"
                    ? "Atrasado"
                    : "Pendente"}
              </span>
              {p.status === "pago" && (
                <button
                  className="text-gray-400 hover:text-gray-600"
                  title="Baixar comprovante"
                >
                  <FileText size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
