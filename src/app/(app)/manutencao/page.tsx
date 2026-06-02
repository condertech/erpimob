"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockChamados } from "@/data/mock";
import type { StatusChamado, PrioridadeChamado } from "@/types";

function statusBadge(s: StatusChamado) {
  if (s === "aberto") return <Badge variant="danger">Aberto</Badge>;
  if (s === "em_andamento")
    return <Badge variant="warning">Em Andamento</Badge>;
  return <Badge variant="success">Concluído</Badge>;
}

function prioridadeStyle(p: PrioridadeChamado): React.CSSProperties {
  if (p === "urgente") return { backgroundColor: "#FEE2E2", color: "#991B1B" };
  if (p === "alta") return { backgroundColor: "#FFEDD5", color: "#9A3412" };
  if (p === "media") return { backgroundColor: "#FEF9C3", color: "#854D0E" };
  return { backgroundColor: "#F3F4F6", color: "#374151" };
}

export default function ManutencaoPage() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<StatusChamado | "">("");

  const dados = mockChamados.filter((c) => {
    const t = busca.toLowerCase();
    const match =
      !t ||
      c.imovelCodigo.toLowerCase().includes(t) ||
      (c.inquilinoNome?.toLowerCase().includes(t) ?? false) ||
      c.tipo.toLowerCase().includes(t);
    return match && (!filtro || c.status === filtro);
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar imóvel, inquilino, tipo..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm outline-none w-64"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#111111";
                e.currentTarget.style.boxShadow = "0 0 0 2px #d4d4d4";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#D1D5DB";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value as StatusChamado | "")}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#111111";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#D1D5DB";
            }}
          >
            <option value="">Todos os status</option>
            <option value="aberto">Aberto</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>
        <Link href="/manutencao/novo">
          <Button>
            <Plus size={16} />
            Abrir Chamado
          </Button>
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
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
                  "Descrição",
                  "Prioridade",
                  "Responsável",
                  "Data Abertura",
                  "Status",
                  "",
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
              {dados.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-10 text-center text-gray-400"
                  >
                    Nenhum chamado encontrado.
                  </td>
                </tr>
              )}
              {dados.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td
                    className="px-4 py-3 font-medium"
                    style={{ color: "#111111" }}
                  >
                    {c.imovelCodigo}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {c.inquilinoNome ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {c.tipo}
                  </td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                    {c.descricao}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium"
                      style={prioridadeStyle(c.prioridade)}
                    >
                      {c.prioridade.charAt(0).toUpperCase() +
                        c.prioridade.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {c.responsavel ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(c.dataAbertura).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3">{statusBadge(c.status)}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/manutencao/${c.id}`}
                      className="text-xs font-medium"
                      style={{ color: "#111111" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#222222")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#111111")
                      }
                    >
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          {dados.length} chamado(s) encontrado(s)
        </div>
      </Card>
    </div>
  );
}
