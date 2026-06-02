"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockInquilinos } from "@/data/mock";

export default function InquilinosPage() {
  const [busca, setBusca] = useState("");

  const dados = mockInquilinos.filter((i) => {
    const t = busca.toLowerCase();
    return (
      !t ||
      i.nome.toLowerCase().includes(t) ||
      i.cpf.includes(t) ||
      (i.imovelCodigo?.toLowerCase().includes(t) ?? false) ||
      i.email.toLowerCase().includes(t)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou imóvel..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm outline-none w-72"
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
        <Link href="/inquilinos/novo">
          <Button>
            <Plus size={16} />
            Cadastrar Inquilino
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
                  "Nome",
                  "CPF",
                  "Telefone",
                  "WhatsApp",
                  "E-mail",
                  "Imóvel",
                  "Contrato",
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
                    colSpan={8}
                    className="px-4 py-10 text-center text-gray-400"
                  >
                    Nenhum inquilino encontrado.
                  </td>
                </tr>
              )}
              {dados.map((i) => (
                <tr key={i.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {i.nome}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {i.cpf}
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {i.telefone}
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {i.whatsapp}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{i.email}</td>
                  <td className="px-4 py-3">
                    {i.imovelCodigo ? (
                      <span
                        className="font-medium"
                        style={{ color: "#111111" }}
                      >
                        {i.imovelCodigo}
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {i.statusContrato === "ativo" && (
                      <Badge variant="success">Ativo</Badge>
                    )}
                    {i.statusContrato === "vencendo" && (
                      <Badge variant="warning">Vencendo</Badge>
                    )}
                    {i.statusContrato === "encerrado" && (
                      <Badge variant="neutral">Encerrado</Badge>
                    )}
                    {!i.statusContrato && (
                      <Badge variant="neutral">Sem contrato</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/inquilinos/${i.id}`}
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
          {dados.length} inquilino(s) encontrado(s)
        </div>
      </Card>
    </div>
  );
}
