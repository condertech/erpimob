"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockVagas } from "@/data/mock";

export default function GaragensPage() {
  const [busca, setBusca] = useState("");

  const dados = mockVagas.filter((v) => {
    const t = busca.toLowerCase();
    return (
      !t ||
      v.numero.includes(t) ||
      v.bloco.toLowerCase().includes(t) ||
      (v.placa?.toLowerCase().includes(t) ?? false) ||
      (v.imovelCodigo?.toLowerCase().includes(t) ?? false) ||
      (v.inquilinoNome?.toLowerCase().includes(t) ?? false)
    );
  });

  const livres = mockVagas.filter((v) => v.status === "livre").length;
  const ocupadas = mockVagas.filter((v) => v.status === "ocupada").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Placa, vaga, apartamento..."
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
        <div className="flex gap-4 text-sm text-gray-500">
          <span>
            Total: <b className="text-gray-800">{mockVagas.length}</b>
          </span>
          <span style={{ color: "#111111" }}>
            Ocupadas: <b>{ocupadas}</b>
          </span>
          <span style={{ color: "#D97706" }}>
            Livres: <b>{livres}</b>
          </span>
        </div>
      </div>

      {/* Grid visual de vagas */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Mapa de Vagas</h2>
        </div>
        <div className="p-6 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-10 gap-3">
          {mockVagas.map((v) => (
            <div
              key={v.id}
              title={
                v.status === "ocupada"
                  ? `${v.imovelCodigo} — ${v.inquilinoNome}\n${v.placa} | ${v.modelo}`
                  : "Livre"
              }
              className="flex flex-col items-center justify-center h-14 rounded-md border-2 text-xs font-bold cursor-default transition-all"
              style={
                v.status === "ocupada"
                  ? {
                      backgroundColor: "#F5F5F5",
                      borderColor: "#111111",
                      color: "#222222",
                    }
                  : {
                      backgroundColor: "#FEF9C3",
                      borderColor: "#FCD34D",
                      color: "#92400E",
                    }
              }
            >
              <span>
                {v.bloco}
                {v.numero}
              </span>
              <span className="text-xs font-normal mt-0.5 opacity-70">
                {v.status === "ocupada" ? "Ocup." : "Livre"}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabela */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{ backgroundColor: "#F9FAFB" }}
                className="border-b border-gray-200"
              >
                {[
                  "Vaga",
                  "Bloco",
                  "Status",
                  "Imóvel",
                  "Inquilino",
                  "Placa",
                  "Modelo",
                  "Cor",
                  "Ação",
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
                    Nenhuma vaga encontrada.
                  </td>
                </tr>
              )}
              {dados.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-gray-900">
                    {v.numero}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{v.bloco}</td>
                  <td className="px-4 py-3">
                    {v.status === "ocupada" ? (
                      <Badge variant="success">Ocupada</Badge>
                    ) : (
                      <Badge variant="warning">Livre</Badge>
                    )}
                  </td>
                  <td
                    className="px-4 py-3 font-medium"
                    style={{ color: v.imovelCodigo ? "#111111" : "#D1D5DB" }}
                  >
                    {v.imovelCodigo ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {v.inquilinoNome ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-700">
                    {v.placa ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{v.modelo ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-600">{v.cor ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert(`Editar vaga ${v.numero} (mock)`)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          {dados.length} vaga(s) encontrada(s)
        </div>
      </Card>
    </div>
  );
}
