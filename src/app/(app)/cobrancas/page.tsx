"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockCobrancas } from "@/data/mock";
import type { StatusCobranca } from "@/types";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

function fmt(v: number) {
  return `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

export default function CobrancasPage() {
  const [filtro, setFiltro] = useState<StatusCobranca | "">("");
  const [busca, setBusca] = useState("");

  const dados = mockCobrancas.filter((c) => {
    const t = busca.toLowerCase();
    const matchBusca =
      !t ||
      c.inquilinoNome.toLowerCase().includes(t) ||
      c.imovelCodigo.toLowerCase().includes(t);
    return matchBusca && (!filtro || c.status === filtro);
  });

  const marcarPago = (id: string) => {
    alert(`Cobrança ${id} marcada como paga! (mock)`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Buscar inquilino ou imóvel..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none w-64"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#111111";
              e.currentTarget.style.boxShadow = "0 0 0 2px #d4d4d4";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#D1D5DB";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value as StatusCobranca | "")}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#111111";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#D1D5DB";
            }}
          >
            <option value="">Todos</option>
            <option value="pago">Pago</option>
            <option value="pendente">Pendente</option>
            <option value="atrasado">Atrasado</option>
          </select>
        </div>
        {/* Legendas */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <CheckCircle size={14} style={{ color: "#111111" }} />
            Pago: {mockCobrancas.filter((c) => c.status === "pago").length}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} style={{ color: "#D97706" }} />
            Pendente:{" "}
            {mockCobrancas.filter((c) => c.status === "pendente").length}
          </span>
          <span className="flex items-center gap-1">
            <AlertTriangle size={14} style={{ color: "#DC2626" }} />
            Atrasado:{" "}
            {mockCobrancas.filter((c) => c.status === "atrasado").length}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {dados.length === 0 && (
          <Card className="p-10 text-center text-gray-400">
            Nenhuma cobrança encontrada.
          </Card>
        )}
        {dados.map((c) => {
          const total = c.valor + c.multa + c.juros;
          return (
            <Card key={c.id} className="px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-gray-900">
                      {c.inquilinoNome}
                    </span>
                    <span
                      className="text-sm font-medium px-2 py-0.5 rounded"
                      style={{ backgroundColor: "#F5F5F5", color: "#111111" }}
                    >
                      {c.imovelCodigo}
                    </span>
                    <span className="text-sm text-gray-400">
                      {c.referencia}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>
                      Vencimento:{" "}
                      <b className="text-gray-700">
                        {new Date(c.vencimento).toLocaleDateString("pt-BR")}
                      </b>
                    </span>
                    <span>
                      Valor: <b className="text-gray-700">{fmt(c.valor)}</b>
                    </span>
                    {c.multa > 0 && (
                      <span style={{ color: "#DC2626" }}>
                        Multa/Juros: <b>{fmt(c.multa + c.juros)}</b>
                      </span>
                    )}
                    {c.dataPagamento && (
                      <span style={{ color: "#111111" }}>
                        Pago em:{" "}
                        <b>
                          {new Date(c.dataPagamento).toLocaleDateString(
                            "pt-BR",
                          )}
                        </b>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Total</p>
                    <p
                      className="text-lg font-bold"
                      style={{
                        color: c.status === "atrasado" ? "#DC2626" : "#212529",
                      }}
                    >
                      {fmt(total)}
                    </p>
                  </div>

                  <div>
                    {c.status === "pago" && (
                      <Badge variant="success">Pago</Badge>
                    )}
                    {c.status === "pendente" && (
                      <Badge variant="warning">Pendente</Badge>
                    )}
                    {c.status === "atrasado" && (
                      <Badge variant="danger">Atrasado</Badge>
                    )}
                  </div>

                  {c.status !== "pago" && (
                    <Button size="sm" onClick={() => marcarPago(c.id)}>
                      <CheckCircle size={14} /> Marcar pago
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
