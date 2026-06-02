"use client";

import { useState, useMemo } from "react";
import Card from "@/components/ui/Card";
import {
  mockReceitaMensal,
  mockCobrancas,
  mockChamados,
  mockImoveis,
  mockContratos,
} from "@/data/mock";
import {
  Building2,
  Users,
  FileText,
  DollarSign,
  AlertTriangle,
  Wrench,
  TrendingUp,
  Clock,
  Filter,
  X,
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

function formatCurrency(v: number) {
  return `R$ ${v.toLocaleString("pt-BR")}`;
}

const mesAbreviado: Record<number, string> = {
  0: "Jan",
  1: "Fev",
  2: "Mar",
  3: "Abr",
  4: "Mai",
  5: "Jun",
  6: "Jul",
  7: "Ago",
  8: "Set",
  9: "Out",
  10: "Nov",
  11: "Dez",
};

function matchPeriodoData(dataStr: string, periodo: string): boolean {
  const [mesAbrev, anoStr] = periodo.split("/");
  const d = new Date(dataStr + "T00:00:00");
  return (
    mesAbreviado[d.getMonth()] === mesAbrev &&
    d.getFullYear().toString() === anoStr
  );
}

const periodosDisponiveis = Array.from(
  new Set(mockCobrancas.map((c) => c.referencia)),
).sort();

export default function DashboardPage() {
  const [blocoFiltro, setBlocoFiltro] = useState("todos");
  const [periodoFiltro, setPeriodoFiltro] = useState("todos");

  const temFiltro = blocoFiltro !== "todos" || periodoFiltro !== "todos";

  const imoveisFiltrados = useMemo(
    () =>
      blocoFiltro === "todos"
        ? mockImoveis
        : mockImoveis.filter((i) => i.bloco === blocoFiltro),
    [blocoFiltro],
  );

  const cobrancasFiltradas = useMemo(
    () =>
      mockCobrancas.filter((c) => {
        const blocoOk =
          blocoFiltro === "todos" ||
          c.imovelCodigo.startsWith(blocoFiltro + "-");
        const periodoOk =
          periodoFiltro === "todos" || c.referencia === periodoFiltro;
        return blocoOk && periodoOk;
      }),
    [blocoFiltro, periodoFiltro],
  );

  const chamadosFiltrados = useMemo(
    () =>
      mockChamados.filter((c) => {
        const blocoOk =
          blocoFiltro === "todos" ||
          c.imovelCodigo.startsWith(blocoFiltro + "-");
        const periodoOk =
          periodoFiltro === "todos" ||
          matchPeriodoData(c.dataAbertura, periodoFiltro);
        return blocoOk && periodoOk;
      }),
    [blocoFiltro, periodoFiltro],
  );

  const contratosFiltrados = useMemo(
    () =>
      blocoFiltro === "todos"
        ? mockContratos
        : mockContratos.filter((c) =>
            c.imovelCodigo.startsWith(blocoFiltro + "-"),
          ),
    [blocoFiltro],
  );

  const totalImoveis = imoveisFiltrados.length;
  const imoveisOcupados = imoveisFiltrados.filter(
    (i) => i.status === "ocupado",
  ).length;
  const imoveisVagos = imoveisFiltrados.filter(
    (i) => i.status === "vago",
  ).length;
  const contratosAtivos = contratosFiltrados.filter(
    (c) => c.status === "ativo",
  ).length;
  const contratosVencendo = contratosFiltrados.filter(
    (c) => c.status === "vencendo",
  ).length;
  const inadimplentes = cobrancasFiltradas.filter(
    (c) => c.status === "atrasado",
  ).length;
  const receitaMensal = cobrancasFiltradas
    .filter((c) => c.status === "pago")
    .reduce((sum, c) => sum + c.valor, 0);
  const chamadosAbertosQtd = chamadosFiltrados.filter(
    (c) => c.status === "aberto" || c.status === "em_andamento",
  ).length;

  const cards = [
    { label: "Total de Imóveis", value: totalImoveis, icon: Building2 },
    { label: "Imóveis Ocupados", value: imoveisOcupados, icon: Building2 },
    { label: "Imóveis Vagos", value: imoveisVagos, icon: Building2 },
    { label: "Inquilinos Ativos", value: imoveisOcupados, icon: Users },
    { label: "Contratos Ativos", value: contratosAtivos, icon: FileText },
    { label: "Contratos Vencendo", value: contratosVencendo, icon: Clock },
    { label: "Inadimplentes", value: inadimplentes, icon: AlertTriangle },
    {
      label: "Receita Mensal",
      value: receitaMensal > 0 ? formatCurrency(receitaMensal) : "R$ 0",
      icon: DollarSign,
    },
    { label: "Chamados em Aberto", value: chamadosAbertosQtd, icon: Wrench },
  ];

  const atrasados = cobrancasFiltradas.filter((c) => c.status === "atrasado");
  const chamadosAbertos = chamadosFiltrados.filter(
    (c) => c.status === "aberto" || c.status === "em_andamento",
  );

  return (
    <div className="space-y-6">
      {/* Barra de filtros */}
      <Card className="px-6 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={16} style={{ color: "#111111" }} />
            Filtros
          </div>
          <div className="flex flex-wrap items-center gap-4 flex-1">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Bloco / Prédio</label>
              <select
                value={blocoFiltro}
                onChange={(e) => setBlocoFiltro(e.target.value)}
                className="text-sm border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-verde-400 bg-white"
              >
                <option value="todos">Todos os Blocos</option>
                <option value="A">Bloco A</option>
                <option value="B">Bloco B</option>
                <option value="C">Bloco C</option>
                <option value="D">Bloco D</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Período</label>
              <select
                value={periodoFiltro}
                onChange={(e) => setPeriodoFiltro(e.target.value)}
                className="text-sm border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-verde-400 bg-white"
              >
                <option value="todos">Todos os Períodos</option>
                {periodosDisponiveis.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {temFiltro && (
            <button
              onClick={() => {
                setBlocoFiltro("todos");
                setPeriodoFiltro("todos");
              }}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <X size={14} />
              Limpar filtros
            </button>
          )}
        </div>
        {temFiltro && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
            {blocoFiltro !== "todos" && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: "#F5F5F5", color: "#111111" }}
              >
                Bloco {blocoFiltro}
                <button
                  onClick={() => setBlocoFiltro("todos")}
                  className="hover:opacity-70"
                >
                  <X size={10} />
                </button>
              </span>
            )}
            {periodoFiltro !== "todos" && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: "#DBEAFE", color: "#1D4ED8" }}
              >
                {periodoFiltro}
                <button
                  onClick={() => setPeriodoFiltro("todos")}
                  className="hover:opacity-70"
                >
                  <X size={10} />
                </button>
              </span>
            )}
          </div>
        )}
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest truncate">
                    {card.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums">
                    {card.value}
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

      {/* Gráfico + Inadimplentes */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Receita mensal */}
        <Card className="xl:col-span-2">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <TrendingUp size={18} style={{ color: "#111111" }} />
            <h2 className="font-semibold text-gray-800">Receita Mensal (R$)</h2>
            {blocoFiltro !== "todos" && (
              <span className="ml-auto text-xs text-gray-400">
                * total geral de todos os blocos
              </span>
            )}
          </div>
          <div className="px-6 py-4">
            <ResponsiveContainer width="100%" height={220}>
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
                <Tooltip
                  formatter={(v: number) => [formatCurrency(v), "Receita"]}
                />
                <Bar dataKey="valor" fill="#111111" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Inadimplentes */}
        <Card>
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <AlertTriangle size={18} style={{ color: "#DC2626" }} />
            <h2 className="font-semibold text-gray-800">Inadimplentes</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {atrasados.length === 0 ? (
              <p className="px-6 py-8 text-sm text-gray-400 text-center">
                Nenhum inadimplente
              </p>
            ) : (
              atrasados.map((c) => (
                <div key={c.id} className="px-6 py-3">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {c.inquilinoNome}
                  </p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-gray-400">
                      {c.imovelCodigo} · {c.referencia}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#DC2626" }}
                    >
                      {formatCurrency(c.valor + c.multa + c.juros)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Chamados recentes */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
          <Wrench size={18} style={{ color: "#111111" }} />
          <h2 className="font-semibold text-gray-800">Chamados em Aberto</h2>
        </div>
        <div className="overflow-x-auto">
          {chamadosAbertos.length === 0 ? (
            <p className="px-6 py-8 text-sm text-gray-400 text-center">
              Nenhum chamado encontrado para os filtros selecionados.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr
                  className="border-b border-gray-100"
                  style={{ backgroundColor: "#F9FAFB" }}
                >
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Imóvel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inquilino
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {chamadosAbertos.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {c.imovelCodigo}
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {c.inquilinoNome ?? "—"}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{c.tipo}</td>
                    <td className="px-6 py-3">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                        style={
                          c.prioridade === "urgente"
                            ? { backgroundColor: "#FEE2E2", color: "#991B1B" }
                            : c.prioridade === "alta"
                              ? { backgroundColor: "#FFEDD5", color: "#9A3412" }
                              : c.prioridade === "media"
                                ? {
                                    backgroundColor: "#FEF9C3",
                                    color: "#854D0E",
                                  }
                                : {
                                    backgroundColor: "#F3F4F6",
                                    color: "#374151",
                                  }
                        }
                      >
                        {c.prioridade.charAt(0).toUpperCase() +
                          c.prioridade.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500">
                      {new Date(c.dataAbertura).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
