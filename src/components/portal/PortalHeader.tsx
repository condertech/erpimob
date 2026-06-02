"use client";

import { usePathname } from "next/navigation";
import { Bell, Mail } from "lucide-react";
import Link from "next/link";

const pageTitles: Record<string, string> = {
  "/portal/dashboard": "Início",
  "/portal/contrato": "Meu Contrato",
  "/portal/pagamentos": "Pagamentos",
  "/portal/solicitacoes": "Solicitações",
  "/portal/garagem": "Minha Garagem",
  "/portal/perfil": "Meu Perfil",
};

export default function PortalHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Portal do Inquilino";

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-2">
        {/* Notificações */}
        <button
          className="relative p-2 rounded-md transition-colors"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#F3F4F6")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
          title="Notificações"
        >
          <Bell size={20} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: "#111111" }}
          />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: "#111111" }}
          >
            CE
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800 leading-tight">
              Carlos Eduardo
            </p>
            <p className="text-xs text-gray-500 leading-tight">
              Inquilino · AP-101
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
