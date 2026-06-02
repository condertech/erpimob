"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { mockCobrancas, mockDashboardStats } from "@/data/mock";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockReceitaMensal } from "@/data/mock";

const stats = mockDashboardStats;

function fmt(v: number) {
  return `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

export default function FinanceiroPage() {
  const [mes, setMes] = useState("");
  const [imovel, setImovel] = useState("");

  const receitaTotal = mockCobrancas
    .filter((c) => c.status === "pago")
    .reduce((a, c) => a + c.valor, 0);
  const valorAtraso = mockCobrancas
    .filter((c) => c.status === "atrasado")
    .reduce((a, c) => a + c.valor + c.multa + c.juros, 0);
  const valorPendente = mockCobrancas
    .filter((c) => c.status === "pendente")
    .reduce((a, c) => a + c.valor, 0);

  const dados = mockCobrancas.filter((c) => {
    const matchMes =
      !mes || c.referencia.toLowerCase().includes(mes.toLowerCase());
    const matchImovel =
      !imovel || c.imovelCodigo.toLowerCase().includes(imovel.toLowerCase());
    return matchMes && matchImovel;
  });

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Receita Recebida",
            value: fmt(receitaTotal),
            icon: CheckCircle,
            color: "#111111",
            bg: "#F5F5F5",
          },
          {
            label: "Em Aberto",
            value: fmt(valorPendente),
            icon: DollarSign,
            color: "#D97706",
            bg: "#FEF9C3",
          },
          {
            label: "Em Atraso",
            value: fmt(valorAtraso),
            icon: AlertTriangle,
            color: "#DC2626",
            bg: "#FEE2E2",
          },
          {
            label: "Receita Mensal",
            value: fmt(stats.receitaMensal),
            icon: TrendingUp,
            color: "#1D4ED8",
            bg: "#DBEAFE",
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {s.label}
                  </p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {s.value}
                  </p>
                </div>
                <Icon
                  size={18}
                  className="text-gray-300 flex-shrink-0 mt-0.5"
                />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Gráfico */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Receita por Mês (R$)</h2>
        </div>
        <div className="px-6 py-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={mockReceitaMensal}
              margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip formatter={(v: number) => [fmt(v), "Receita"]} />
              <Bar dataKey="valor" fill="#111111" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Extrato */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <h2 className="font-semibold text-gray-800">Extrato de Cobranças</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Filtrar por mês (ex: Jun/2024)"
              value={mes}
              onChange={(e) => setMes(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#111111";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#D1D5DB";
              }}
            />
            <input
              type="text"
              placeholder="Filtrar por imóvel"
              value={imovel}
              onChange={(e) => setImovel(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none w-36"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#111111";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#D1D5DB";
              }}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{ backgroundColor: "#F9FAFB" }}
                className="border-b border-gray-200"
              >
                {[
                  "Inquilino",
                  "Imóvel",
                  "Referência",
                  "Vencimento",
                  "Valor",
                  "Multa/Juros",
                  "Pgto",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dados.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{c.inquilinoNome}</td>
                  <td
                    className="px-4 py-3 font-medium"
                    style={{ color: "#111111" }}
                  >
                    {c.imovelCodigo}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{c.referencia}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(c.vencimento).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {fmt(c.valor)}
                  </td>
                  <td
                    className="px-4 py-3 whitespace-nowrap"
                    style={{ color: c.multa > 0 ? "#DC2626" : "#9CA3AF" }}
                  >
                    {c.multa > 0 ? fmt(c.multa + c.juros) : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {c.dataPagamento
                      ? new Date(c.dataPagamento).toLocaleDateString("pt-BR")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {c.status === "pago" && (
                      <Badge variant="success">Pago</Badge>
                    )}
                    {c.status === "pendente" && (
                      <Badge variant="warning">Pendente</Badge>
                    )}
                    {c.status === "atrasado" && (
                      <Badge variant="danger">Atrasado</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
