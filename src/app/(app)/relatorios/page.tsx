"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  mockImoveis,
  mockInquilinos,
  mockContratos,
  mockCobrancas,
  mockChamados,
} from "@/data/mock";
import { FileDown, BarChart2 } from "lucide-react";

type RelType =
  | "imoveis"
  | "inquilinos"
  | "financeiro"
  | "inadimplencia"
  | "contratos_vencendo"
  | "manutencao";

const relatorios: { key: RelType; label: string; desc: string }[] = [
  {
    key: "imoveis",
    label: "Relatório de Imóveis",
    desc: "Status e ocupação de todos os imóveis.",
  },
  {
    key: "inquilinos",
    label: "Relatório de Inquilinos",
    desc: "Lista com dados dos inquilinos ativos.",
  },
  {
    key: "financeiro",
    label: "Relatório Financeiro",
    desc: "Receita, pagamentos e inadimplência por período.",
  },
  {
    key: "inadimplencia",
    label: "Relatório de Inadimplência",
    desc: "Cobranças em atraso com multas e juros.",
  },
  {
    key: "contratos_vencendo",
    label: "Contratos Vencendo",
    desc: "Contratos com término nos próximos 60 dias.",
  },
  {
    key: "manutencao",
    label: "Relatório de Manutenção",
    desc: "Chamados abertos, em andamento e concluídos.",
  },
];

export default function RelatoriosPage() {
  const [ativo, setAtivo] = useState<RelType>("imoveis");

  return (
    <div className="space-y-4">
      {/* Seletor */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {relatorios.map((r) => (
            <button
              key={r.key}
              onClick={() => setAtivo(r.key)}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={
                ativo === r.key
                  ? { backgroundColor: "#111111", color: "#FFFFFF" }
                  : { backgroundColor: "#F3F4F6", color: "#374151" }
              }
              onMouseEnter={(e) => {
                if (ativo !== r.key)
                  e.currentTarget.style.backgroundColor = "#E5E7EB";
              }}
              onMouseLeave={(e) => {
                if (ativo !== r.key)
                  e.currentTarget.style.backgroundColor = "#F3F4F6";
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Conteúdo do relatório */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart2 size={20} style={{ color: "#111111" }} />
            <div>
              <h2 className="font-semibold text-gray-800">
                {relatorios.find((r) => r.key === ativo)?.label}
              </h2>
              <p className="text-xs text-gray-400">
                {relatorios.find((r) => r.key === ativo)?.desc}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => alert("Exportar PDF (mock)")}
            >
              <FileDown size={14} />
              PDF
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => alert("Exportar Excel (mock)")}
            >
              <FileDown size={14} />
              Excel
            </Button>
          </div>
        </div>

        {ativo === "imoveis" && <RelImoveis />}
        {ativo === "inquilinos" && <RelInquilinos />}
        {ativo === "financeiro" && <RelFinanceiro />}
        {ativo === "inadimplencia" && <RelInadimplencia />}
        {ativo === "contratos_vencendo" && <RelContratosVencendo />}
        {ativo === "manutencao" && <RelManutencao />}
      </Card>
    </div>
  );
}

function RelImoveis() {
  const ocupados = mockImoveis.filter((i) => i.status === "ocupado").length;
  const vagos = mockImoveis.filter((i) => i.status === "vago").length;
  const manut = mockImoveis.filter((i) => i.status === "manutencao").length;
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 px-6 py-4 border-b border-gray-100">
        <Stat label="Total" value={mockImoveis.length} />
        <Stat label="Ocupados" value={ocupados} color="#111111" />
        <Stat label="Vagos" value={vagos} color="#D97706" />
        <Stat label="Manutenção" value={manut} color="#1D4ED8" />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr
            style={{ backgroundColor: "#F9FAFB" }}
            className="border-b border-gray-200"
          >
            {[
              "Código",
              "Tipo",
              "Bloco",
              "Nº",
              "Inquilino",
              "Proprietário",
              "Aluguel",
              "Status",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {mockImoveis.map((i) => (
            <tr key={i.id} className="hover:bg-gray-50">
              <td
                className="px-4 py-2.5 font-medium"
                style={{ color: "#111111" }}
              >
                {i.codigo}
              </td>
              <td className="px-4 py-2.5 text-gray-600">{i.tipo}</td>
              <td className="px-4 py-2.5 text-gray-600">{i.bloco}</td>
              <td className="px-4 py-2.5 text-gray-600">{i.numero}</td>
              <td className="px-4 py-2.5 text-gray-700">
                {i.inquilinoNome ?? "—"}
              </td>
              <td className="px-4 py-2.5 text-gray-600">
                {i.proprietarioNome}
              </td>
              <td className="px-4 py-2.5 text-gray-900">
                R$ {i.valorAluguel.toLocaleString("pt-BR")}
              </td>
              <td className="px-4 py-2.5">
                {i.status === "ocupado" && (
                  <Badge variant="success">Ocupado</Badge>
                )}
                {i.status === "vago" && <Badge variant="warning">Vago</Badge>}
                {i.status === "manutencao" && (
                  <Badge variant="info">Manutenção</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RelInquilinos() {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 px-6 py-4 border-b border-gray-100">
        <Stat label="Total" value={mockInquilinos.length} />
        <Stat
          label="Ativos"
          value={
            mockInquilinos.filter((i) => i.statusContrato === "ativo").length
          }
          color="#111111"
        />
        <Stat
          label="Vencendo"
          value={
            mockInquilinos.filter((i) => i.statusContrato === "vencendo").length
          }
          color="#D97706"
        />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr
            style={{ backgroundColor: "#F9FAFB" }}
            className="border-b border-gray-200"
          >
            {["Nome", "CPF", "Telefone", "E-mail", "Imóvel", "Contrato"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {mockInquilinos.map((i) => (
            <tr key={i.id} className="hover:bg-gray-50">
              <td className="px-4 py-2.5 font-medium text-gray-900">
                {i.nome}
              </td>
              <td className="px-4 py-2.5 text-gray-500">{i.cpf}</td>
              <td className="px-4 py-2.5 text-gray-600">{i.telefone}</td>
              <td className="px-4 py-2.5 text-gray-600">{i.email}</td>
              <td
                className="px-4 py-2.5 font-medium"
                style={{ color: "#111111" }}
              >
                {i.imovelCodigo ?? "—"}
              </td>
              <td className="px-4 py-2.5">
                {i.statusContrato === "ativo" && (
                  <Badge variant="success">Ativo</Badge>
                )}
                {i.statusContrato === "vencendo" && (
                  <Badge variant="warning">Vencendo</Badge>
                )}
                {!i.statusContrato && (
                  <Badge variant="neutral">Sem contrato</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RelFinanceiro() {
  const recebido = mockCobrancas
    .filter((c) => c.status === "pago")
    .reduce((a, c) => a + c.valor, 0);
  const pendente = mockCobrancas
    .filter((c) => c.status === "pendente")
    .reduce((a, c) => a + c.valor, 0);
  const atraso = mockCobrancas
    .filter((c) => c.status === "atrasado")
    .reduce((a, c) => a + c.valor + c.multa + c.juros, 0);
  const fmt = (v: number) =>
    `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  return (
    <div className="px-6 py-4">
      <div className="flex gap-6 mb-6">
        <Stat label="Recebido" value={fmt(recebido)} color="#111111" />
        <Stat label="Pendente" value={fmt(pendente)} color="#D97706" />
        <Stat label="Em Atraso" value={fmt(atraso)} color="#DC2626" />
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
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockCobrancas.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-4 py-2.5 text-gray-800">{c.inquilinoNome}</td>
                <td
                  className="px-4 py-2.5 font-medium"
                  style={{ color: "#111111" }}
                >
                  {c.imovelCodigo}
                </td>
                <td className="px-4 py-2.5 text-gray-500">{c.referencia}</td>
                <td className="px-4 py-2.5 text-gray-500">
                  {new Date(c.vencimento).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-4 py-2.5 font-medium text-gray-900">
                  {fmt(c.valor)}
                </td>
                <td className="px-4 py-2.5">
                  {c.status === "pago" && <Badge variant="success">Pago</Badge>}
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
    </div>
  );
}

function RelInadimplencia() {
  const inadimplentes = mockCobrancas.filter((c) => c.status === "atrasado");
  const totalAtraso = inadimplentes.reduce(
    (a, c) => a + c.valor + c.multa + c.juros,
    0,
  );
  const fmt = (v: number) =>
    `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 px-6 py-4 border-b border-gray-100">
        <Stat
          label="Inadimplentes"
          value={inadimplentes.length}
          color="#DC2626"
        />
        <Stat
          label="Total em Atraso"
          value={fmt(totalAtraso)}
          color="#DC2626"
        />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr
            style={{ backgroundColor: "#FFF5F5" }}
            className="border-b border-gray-200"
          >
            {[
              "Inquilino",
              "Imóvel",
              "Referência",
              "Vencimento",
              "Valor",
              "Multa",
              "Juros",
              "Total",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {inadimplentes.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="px-4 py-2.5 font-medium text-gray-900">
                {c.inquilinoNome}
              </td>
              <td
                className="px-4 py-2.5 font-medium"
                style={{ color: "#111111" }}
              >
                {c.imovelCodigo}
              </td>
              <td className="px-4 py-2.5 text-gray-500">{c.referencia}</td>
              <td className="px-4 py-2.5 text-gray-500">
                {new Date(c.vencimento).toLocaleDateString("pt-BR")}
              </td>
              <td className="px-4 py-2.5">{fmt(c.valor)}</td>
              <td className="px-4 py-2.5" style={{ color: "#DC2626" }}>
                {fmt(c.multa)}
              </td>
              <td className="px-4 py-2.5" style={{ color: "#DC2626" }}>
                {fmt(c.juros)}
              </td>
              <td
                className="px-4 py-2.5 font-bold"
                style={{ color: "#DC2626" }}
              >
                {fmt(c.valor + c.multa + c.juros)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RelContratosVencendo() {
  const vencendo = mockContratos.filter(
    (c) => c.status === "vencendo" || c.status === "ativo",
  );
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 px-6 py-4 border-b border-gray-100">
        <Stat
          label="Vencendo"
          value={mockContratos.filter((c) => c.status === "vencendo").length}
          color="#D97706"
        />
        <Stat
          label="Ativos"
          value={mockContratos.filter((c) => c.status === "ativo").length}
          color="#111111"
        />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr
            style={{ backgroundColor: "#F9FAFB" }}
            className="border-b border-gray-200"
          >
            {[
              "Imóvel",
              "Inquilino",
              "Proprietário",
              "Término",
              "Aluguel",
              "Status",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {vencendo.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td
                className="px-4 py-2.5 font-medium"
                style={{ color: "#111111" }}
              >
                {c.imovelCodigo}
              </td>
              <td className="px-4 py-2.5 text-gray-800">{c.inquilinoNome}</td>
              <td className="px-4 py-2.5 text-gray-600">
                {c.proprietarioNome}
              </td>
              <td className="px-4 py-2.5 text-gray-500">
                {new Date(c.dataTermino).toLocaleDateString("pt-BR")}
              </td>
              <td className="px-4 py-2.5">
                R$ {c.valorAluguel.toLocaleString("pt-BR")}
              </td>
              <td className="px-4 py-2.5">
                {c.status === "ativo" && <Badge variant="success">Ativo</Badge>}
                {c.status === "vencendo" && (
                  <Badge variant="warning">Vencendo</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RelManutencao() {
  const abertos = mockChamados.filter((c) => c.status === "aberto").length;
  const andamento = mockChamados.filter(
    (c) => c.status === "em_andamento",
  ).length;
  const concluidos = mockChamados.filter(
    (c) => c.status === "concluido",
  ).length;
  const totalGasto = mockChamados.reduce((a, c) => a + (c.valorGasto ?? 0), 0);
  const fmt = (v: number) =>
    `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 px-6 py-4 border-b border-gray-100 flex-wrap">
        <Stat label="Abertos" value={abertos} color="#DC2626" />
        <Stat label="Em Andamento" value={andamento} color="#D97706" />
        <Stat label="Concluídos" value={concluidos} color="#111111" />
        <Stat label="Total Gasto" value={fmt(totalGasto)} color="#1D4ED8" />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr
            style={{ backgroundColor: "#F9FAFB" }}
            className="border-b border-gray-200"
          >
            {[
              "Imóvel",
              "Inquilino",
              "Tipo",
              "Prioridade",
              "Abertura",
              "Status",
              "Valor Gasto",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {mockChamados.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td
                className="px-4 py-2.5 font-medium"
                style={{ color: "#111111" }}
              >
                {c.imovelCodigo}
              </td>
              <td className="px-4 py-2.5 text-gray-600">
                {c.inquilinoNome ?? "—"}
              </td>
              <td className="px-4 py-2.5 text-gray-700">{c.tipo}</td>
              <td className="px-4 py-2.5 capitalize text-gray-600">
                {c.prioridade}
              </td>
              <td className="px-4 py-2.5 text-gray-500">
                {new Date(c.dataAbertura).toLocaleDateString("pt-BR")}
              </td>
              <td className="px-4 py-2.5">
                {c.status === "aberto" && (
                  <Badge variant="danger">Aberto</Badge>
                )}
                {c.status === "em_andamento" && (
                  <Badge variant="warning">Em Andamento</Badge>
                )}
                {c.status === "concluido" && (
                  <Badge variant="success">Concluído</Badge>
                )}
              </td>
              <td className="px-4 py-2.5 text-gray-700">
                {c.valorGasto ? fmt(c.valorGasto) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p
        className="text-xl font-bold mt-0.5"
        style={{ color: color ?? "#212529" }}
      >
        {value}
      </p>
    </div>
  );
}
