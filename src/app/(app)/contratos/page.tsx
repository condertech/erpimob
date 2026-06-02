"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockContratos } from "@/data/mock";
import type { StatusContrato } from "@/types";

function statusBadge(s: StatusContrato) {
  if (s === "ativo") return <Badge variant="success">Ativo</Badge>;
  if (s === "vencendo") return <Badge variant="warning">Vencendo</Badge>;
  return <Badge variant="neutral">Encerrado</Badge>;
}

export default function ContratosPage() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<StatusContrato | "">("");

  const dados = mockContratos.filter((c) => {
    const t = busca.toLowerCase();
    const match =
      !t ||
      c.imovelCodigo.toLowerCase().includes(t) ||
      c.inquilinoNome.toLowerCase().includes(t) ||
      c.proprietarioNome.toLowerCase().includes(t);
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
              placeholder="Imóvel, inquilino ou proprietário..."
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
            onChange={(e) => setFiltro(e.target.value as StatusContrato | "")}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#111111";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#D1D5DB";
            }}
          >
            <option value="">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="vencendo">Vencendo</option>
            <option value="encerrado">Encerrado</option>
          </select>
        </div>
        <Link href="/contratos/novo">
          <Button>
            <Plus size={16} />
            Novo Contrato
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
                  "Proprietário",
                  "Início",
                  "Término",
                  "Aluguel",
                  "Vencimento",
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
                    Nenhum contrato encontrado.
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
                  <td className="px-4 py-3 text-gray-800">{c.inquilinoNome}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {c.proprietarioNome}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(c.dataInicio).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(c.dataTermino).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
                    R$ {c.valorAluguel.toLocaleString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    Dia {c.diaVencimento}
                  </td>
                  <td className="px-4 py-3">{statusBadge(c.status)}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/contratos/${c.id}`}
                      className="text-xs font-medium"
                      style={{ color: "#111111" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#222222")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#111111")
                      }
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          {dados.length} contrato(s) encontrado(s)
        </div>
      </Card>
    </div>
  );
}
