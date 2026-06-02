"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { mockProprietarios } from "@/data/mock";

export default function ProprietariosPage() {
  const [busca, setBusca] = useState("");

  const dados = mockProprietarios.filter((p) => {
    const t = busca.toLowerCase();
    return (
      !t ||
      p.nome.toLowerCase().includes(t) ||
      p.cpfCnpj.includes(t) ||
      p.email.toLowerCase().includes(t)
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
            placeholder="Buscar por nome ou CPF/CNPJ..."
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
        <Link href="/proprietarios/novo">
          <Button>
            <Plus size={16} />
            Cadastrar Proprietário
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
                  "CPF / CNPJ",
                  "Telefone",
                  "WhatsApp",
                  "E-mail",
                  "Imóveis",
                  "Chave Pix",
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
                    Nenhum proprietário encontrado.
                  </td>
                </tr>
              )}
              {dados.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {p.nome}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {p.cpfCnpj}
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {p.telefone}
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {p.whatsapp}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.email}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.imoveis.map((cod) => (
                        <span
                          key={cod}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "#F5F5F5",
                            color: "#111111",
                          }}
                        >
                          {cod}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                    {p.chavePix ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/proprietarios/${p.id}`}
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
          {dados.length} proprietário(s) encontrado(s)
        </div>
      </Card>
    </div>
  );
}
