"use client";

import Link from "next/link";
import { ShieldCheck, UserRound } from "lucide-react";

const VERDE = "#111111";
const VERDE_ESCURO = "#222222";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: "#F0F9F4" }}
    >
      {/* Cards de acesso */}
      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-lg">
        {/* Admin */}
        <Link
          href="/login"
          className="flex-1 bg-white rounded-md border-2 p-7 flex flex-col items-center gap-4 shadow-sm transition-all group"
          style={{ borderColor: "#E5E7EB" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = VERDE;
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 4px 20px rgba(0,155,58,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "#E5E7EB";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 1px 3px rgba(0,0,0,0.05)";
          }}
        >
          <ShieldCheck size={28} className="text-gray-400" />
          <div className="text-center">
            <p className="font-bold text-gray-800 text-base">Administrador</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Painel completo de gestão de imóveis, contratos e financeiro
            </p>
          </div>
          <span
            className="w-full text-center py-2 rounded-md text-white text-sm font-semibold transition-colors"
            style={{ backgroundColor: VERDE }}
          >
            Acessar painel
          </span>
        </Link>

        {/* Inquilino */}
        <Link
          href="/login-inquilino"
          className="flex-1 bg-white rounded-md border-2 p-7 flex flex-col items-center gap-4 shadow-sm transition-all"
          style={{ borderColor: "#E5E7EB" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = VERDE;
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 4px 20px rgba(0,155,58,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "#E5E7EB";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 1px 3px rgba(0,0,0,0.05)";
          }}
        >
          <UserRound size={28} className="text-gray-400" />
          <div className="text-center">
            <p className="font-bold text-gray-800 text-base">Inquilino</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Portal do inquilino — boletos, contratos, solicitações e mais
            </p>
          </div>
          <span
            className="w-full text-center py-2 rounded-md text-sm font-semibold border-2 transition-colors"
            style={{ borderColor: VERDE, color: VERDE }}
          >
            Acessar portal
          </span>
        </Link>
      </div>
    </div>
  );
}
