"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Search, LayoutGrid, List, Pencil } from "lucide-react";
import { mockImoveis, mockPredios } from "@/data/mock";

const statusLabel: Record<string, string> = {
  ocupado: "Ocupado",
  vago: "Vago",
  manutencao: "Manutenção",
};

const statusStyle: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  ocupado: { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
  vago: { bg: "#FFFBEB", text: "#92400E", border: "#FDE68A" },
  manutencao: { bg: "#F9FAFB", text: "#374151", border: "#E5E7EB" },
};

export default function PredioPage() {
  const { bloco } = useParams<{ bloco: string }>();
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [view, setView] = useState<"grade" | "lista">("grade");

  const predio = mockPredios.find((p) => p.bloco === bloco);
  const aptos = useMemo(
    () => mockImoveis.filter((i) => i.bloco === bloco),
    [bloco],
  );

  const filtrados = useMemo(
    () =>
      aptos.filter((a) => {
        const buscaOk =
          busca === "" ||
          a.numero.toLowerCase().includes(busca.toLowerCase()) ||
          (a.inquilinoNome ?? "").toLowerCase().includes(busca.toLowerCase());
        const statusOk = filtroStatus === "todos" || a.status === filtroStatus;
        return buscaOk && statusOk;
      }),
    [aptos, busca, filtroStatus],
  );

  const ocupados = aptos.filter((a) => a.status === "ocupado").length;
  const vagos = aptos.filter((a) => a.status === "vago").length;
  const manutencao = aptos.filter((a) => a.status === "manutencao").length;
  const pct =
    aptos.length > 0 ? Math.round((ocupados / aptos.length) * 100) : 0;

  // Agrupa por andar (primeiro dígito do número)
  const andares = useMemo(() => {
    const map = new Map<string, typeof filtrados>();
    filtrados.forEach((a) => {
      const andar = a.numero.charAt(0);
      if (!map.has(andar)) map.set(andar, []);
      map.get(andar)!.push(a);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtrados]);

  if (!predio) {
    return (
      <div className="p-8 text-gray-400 text-sm">
        Bloco não encontrado.{" "}
        <Link href="/imoveis" className="underline">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <Link
        href="/imoveis"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={15} />
        Imóveis
      </Link>

      {/* Header do prédio */}
      <div className="bg-white border border-gray-100 rounded-md shadow-sm p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{predio.nome}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{predio.endereco}</p>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-xl font-bold text-gray-900">{ocupados}</p>
              <p className="text-xs text-gray-400">Ocupados</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{vagos}</p>
              <p className="text-xs text-gray-400">Vagos</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{manutencao}</p>
              <p className="text-xs text-gray-400">Manutenção</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Taxa de ocupação</span>
            <span className="font-semibold text-gray-700">{pct}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-800 rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Barra de busca + filtro + toggle */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nº ou inquilino..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md outline-none focus:border-gray-400"
          />
        </div>
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-white outline-none focus:border-gray-400"
        >
          <option value="todos">Todos</option>
          <option value="ocupado">Ocupados</option>
          <option value="vago">Vagos</option>
          <option value="manutencao">Manutenção</option>
        </select>
        <div className="flex border border-gray-200 rounded-md overflow-hidden">
          <button
            onClick={() => setView("grade")}
            className={`px-3 py-2 transition-colors ${view === "grade" ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
            title="Grade"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView("lista")}
            className={`px-3 py-2 transition-colors ${view === "lista" ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
            title="Lista"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {filtrados.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-8">
          Nenhum apartamento encontrado.
        </p>
      )}

      {/* Visão Grade — agrupada por andar */}
      {view === "grade" && andares.length > 0 && (
        <div className="space-y-4">
          {andares.map(([andar, aptosAndar]) => (
            <div key={andar}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                {andar}º Andar
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-10 gap-2">
                {aptosAndar.map((apto) => {
                  const s = statusStyle[apto.status];
                  return (
                    <Link
                      key={apto.id}
                      href={`/imoveis/${apto.id}`}
                      className="border rounded-md p-2.5 flex flex-col gap-1 transition-all hover:shadow-sm hover:-translate-y-0.5"
                      style={{ borderColor: s.border, backgroundColor: s.bg }}
                    >
                      <span className="text-xs font-bold text-gray-900">
                        {apto.numero}
                      </span>
                      <span
                        className="text-[10px] font-medium leading-tight"
                        style={{ color: s.text }}
                      >
                        {statusLabel[apto.status]}
                      </span>
                      {apto.inquilinoNome && (
                        <span className="text-[10px] text-gray-500 truncate leading-tight">
                          {apto.inquilinoNome.split(" ")[0]}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visão Lista */}
      {view === "lista" && filtrados.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nº
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inquilino
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aluguel
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtrados.map((apto) => {
                const s = statusStyle[apto.status];
                return (
                  <tr
                    key={apto.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {apto.numero}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{apto.codigo}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: s.bg,
                          color: s.text,
                          border: `1px solid ${s.border}`,
                        }}
                      >
                        {statusLabel[apto.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {apto.inquilinoNome ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {apto.valorAluguel > 0
                        ? `R$ ${apto.valorAluguel.toLocaleString("pt-BR")}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/imoveis/${apto.id}`}
                        className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <Pencil size={13} />
                        Editar
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
