"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/imoveis": "Imóveis",
  "/imoveis/novo": "Novo Imóvel",
  "/inquilinos": "Inquilinos",
  "/inquilinos/novo": "Novo Inquilino",
  "/proprietarios": "Proprietários",
  "/proprietarios/novo": "Novo Proprietário",
  "/contratos": "Contratos",
  "/contratos/novo": "Novo Contrato",
  "/financeiro": "Financeiro",
  "/cobrancas": "Cobranças",
  "/manutencao": "Manutenção",
  "/manutencao/novo": "Novo Chamado",
  "/garagens": "Garagens",
  "/relatorios": "Relatórios",
  "/whatsapp": "WhatsApp",
};

export default function Header() {
  const pathname = usePathname();
  // Para rotas dinâmicas de predio, extrai o bloco do pathname
  const predioMatch = pathname.match(/^\/imoveis\/predio\/([A-Z])$/);
  const title = predioMatch
    ? `Bloco ${predioMatch[1]}`
    : (pageTitles[pathname] ?? "gestorimob");

  return (
    <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between flex-shrink-0">
      <h1 className="text-sm font-semibold text-gray-900 tracking-tight">
        {title}
      </h1>
      <div className="flex items-center gap-2">
        <button
          className="relative p-2 rounded-md transition-colors"
          style={{ color: "#9CA3AF" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#F3F4F6")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          title="Notificações"
        >
          <Bell size={18} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#DC2626" }}
          />
        </button>
        <div
          className="flex items-center gap-2 pl-3"
          style={{ borderLeft: "1px solid #E5E7EB" }}
        >
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: "#111111" }}
          >
            A
          </div>
          <span className="text-sm font-medium text-gray-700">
            Administrador
          </span>
        </div>
      </div>
    </header>
  );
}
