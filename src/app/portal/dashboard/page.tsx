"use client";

import Link from "next/link";
import {
  Calendar,
  DollarSign,
  CheckCircle,
  Wrench,
  Car,
  FileText,
  ChevronRight,
  AlertCircle,
  Clock,
} from "lucide-react";

const VERDE = "#111111";
const VERDE_ESCURO = "#222222";

const stats = [
  {
    label: "Próximo Vencimento",
    valor: "10/06/2025",
    sub: "em 9 dias",
    icon: Calendar,
    cor: "#DBEAFE",
    corIcone: "#1D4ED8",
  },
  {
    label: "Valor do Aluguel",
    valor: "R$ 1.500,00",
    sub: "aluguel + condomínio",
    icon: DollarSign,
    cor: "#D1FAE5",
    corIcone: VERDE,
  },
  {
    label: "Status do Pagamento",
    valor: "Em dia",
    sub: "junho/2025",
    icon: CheckCircle,
    cor: "#D1FAE5",
    corIcone: VERDE,
  },
  {
    label: "Chamados Abertos",
    valor: "1",
    sub: "torneira da cozinha",
    icon: Wrench,
    cor: "#FEF3C7",
    corIcone: "#D97706",
  },
  {
    label: "Minha Vaga",
    valor: "A-07",
    sub: "Bloco A · Placa ABC-1234",
    icon: Car,
    cor: "#EDE9FE",
    corIcone: "#7C3AED",
  },
];

const acoesRapidas = [
  {
    label: "Ver Boleto",
    desc: "Junho/2025 · R$ 1.200,00",
    icon: FileText,
    href: "/portal/pagamentos",
    cor: VERDE,
  },
  {
    label: "Abrir Chamado",
    desc: "Solicitar manutenção",
    icon: Wrench,
    href: "/portal/solicitacoes",
    cor: "#D97706",
  },
  {
    label: "Ver Contrato",
    desc: "Vigente até 15/01/2026",
    icon: FileText,
    href: "/portal/contrato",
    cor: "#1D4ED8",
  },
];

export default function PortalDashboardPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Saudação */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">Olá, Carlos! 👋</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Aqui está o resumo do seu imóvel.
        </p>
      </div>

      {/* Aviso de vencimento */}
      <div
        className="flex items-start gap-3 p-4 rounded-md border"
        style={{ backgroundColor: "#FFFBEB", borderColor: "#FDE68A" }}
      >
        <AlertCircle
          size={18}
          style={{ color: "#D97706", flexShrink: 0, marginTop: 2 }}
        />
        <div>
          <p className="text-sm font-semibold" style={{ color: "#92400E" }}>
            Vencimento em 9 dias
          </p>
          <p className="text-xs text-yellow-700 mt-0.5">
            O aluguel de junho/2025 vence em 10/06/2025. Valor: R$ 1.200,00 + R$
            300,00 (condomínio).
          </p>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-md p-4 border border-gray-100 shadow-sm flex items-start gap-4"
            >
              <Icon size={18} className="text-gray-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-base font-bold text-gray-800 mt-0.5">
                  {s.valor}
                </p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ações rápidas */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3">Ações rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {acoesRapidas.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.label}
                href={a.href}
                className="bg-white rounded-md p-4 border border-gray-100 shadow-sm flex items-center gap-3 transition-shadow group"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.08)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <Icon size={17} className="text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">
                    {a.label}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{a.desc}</p>
                </div>
                <ChevronRight
                  size={15}
                  className="text-gray-300 flex-shrink-0"
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Histórico recente */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h3 className="text-sm font-bold text-gray-700">Histórico recente</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            {
              desc: "Pagamento de aluguel – Maio/2025 confirmado",
              data: "08/05/2025",
              status: "pago",
            },
            {
              desc: "Chamado aberto – Torneira cozinha",
              data: "01/06/2025",
              status: "aberto",
            },
            {
              desc: "Pagamento de aluguel – Abril/2025 confirmado",
              data: "07/04/2025",
              status: "pago",
            },
          ].map((h, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3">
              <Clock size={14} className="text-gray-300 flex-shrink-0" />
              <p className="flex-1 text-sm text-gray-700">{h.desc}</p>
              <span className="text-xs text-gray-400">{h.data}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={
                  h.status === "pago"
                    ? { backgroundColor: "#D1FAE5", color: "#065F46" }
                    : { backgroundColor: "#FEF3C7", color: "#92400E" }
                }
              >
                {h.status === "pago" ? "Pago" : "Em aberto"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
