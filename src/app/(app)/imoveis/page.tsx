"use client";

import Link from "next/link";
import {
  Building2,
  Plus,
  Users,
  CheckCircle,
  Clock,
  Wrench,
} from "lucide-react";
import { mockPredios, mockImoveis } from "@/data/mock";

const VERDE = "#111111";
const VERDE_BG = "#F5F5F5";

export default function ImoveisPage() {
  const total = mockImoveis.length;
  const totalOcupado = mockImoveis.filter((i) => i.status === "ocupado").length;
  const totalVago = mockImoveis.filter((i) => i.status === "vago").length;
  const totalManutencao = mockImoveis.filter(
    (i) => i.status === "manutencao",
  ).length;

  return (
    <div className="space-y-6">
      {/* Resumo geral */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total de apartamentos",
            value: total,
            icon: Building2,
            cor: "#1D4ED8",
            bg: "#EFF6FF",
          },
          {
            label: "Ocupados",
            value: totalOcupado,
            icon: CheckCircle,
            cor: VERDE,
            bg: VERDE_BG,
          },
          {
            label: "Vagos",
            value: totalVago,
            icon: Clock,
            cor: "#D97706",
            bg: "#FFFBEB",
          },
          {
            label: "Em manutencao",
            value: totalManutencao,
            icon: Wrench,
            cor: "#7C3AED",
            bg: "#F5F3FF",
          },
        ].map(({ label, value, icon: Icon, cor, bg }) => (
          <div
            key={label}
            className="bg-white rounded-md border border-gray-100 shadow-sm p-4 flex items-center gap-3"
          >
            <Icon size={20} className="text-gray-300 flex-shrink-0" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Predios / Blocos</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Clique em um bloco para ver e gerenciar os apartamentos
          </p>
        </div>
        <Link
          href="/imoveis/novo"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: VERDE }}
        >
          <Plus size={16} />
          Cadastrar apartamento
        </Link>
      </div>

      {/* Cards dos predios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockPredios.map((predio) => {
          const aptos = mockImoveis.filter((i) => i.bloco === predio.bloco);
          const ocupados = aptos.filter((i) => i.status === "ocupado").length;
          const vagos = aptos.filter((i) => i.status === "vago").length;
          const manutencao = aptos.filter(
            (i) => i.status === "manutencao",
          ).length;
          const pctOcupado =
            aptos.length > 0 ? Math.round((ocupados / aptos.length) * 100) : 0;

          return (
            <Link
              key={predio.id}
              href={`/imoveis/predio/${predio.bloco}`}
              className="bg-white rounded-md border border-gray-100 shadow-sm p-5 flex flex-col gap-4 transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ textDecoration: "none" }}
            >
              <div className="flex items-center gap-3">
                <Building2 size={22} className="text-gray-300 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {predio.nome}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {predio.andares} andares x {predio.aptosPorAndar}{" "}
                    aptos/andar
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                {predio.endereco}
              </p>

              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Ocupacao</span>
                  <span className="font-semibold" style={{ color: VERDE }}>
                    {pctOcupado}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pctOcupado}%`, backgroundColor: VERDE }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-50">
                <div className="text-center">
                  <p className="font-bold text-gray-900">{ocupados}</p>
                  <p className="text-xs text-gray-400">Ocupados</p>
                </div>
                <div className="text-center border-x border-gray-100">
                  <p className="font-bold text-gray-900">{vagos}</p>
                  <p className="text-xs text-gray-400">Vagos</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">{manutencao}</p>
                  <p className="text-xs text-gray-400">Manutencao</p>
                </div>
              </div>

              <div
                className="text-xs font-semibold flex items-center justify-between pt-1"
                style={{ color: VERDE }}
              >
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {aptos.length} apartamentos
                </span>
                <span>Ver detalhes</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
