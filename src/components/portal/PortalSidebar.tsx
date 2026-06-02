"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  Wrench,
  Car,
  User,
  LogOut,
} from "lucide-react";

const VERDE = "#111111";
const VERDE_ESCURO = "#222222";

const navItems = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/contrato", label: "Meu Contrato", icon: FileText },
  { href: "/portal/pagamentos", label: "Pagamentos", icon: DollarSign },
  { href: "/portal/solicitacoes", label: "Solicitações", icon: Wrench },
  { href: "/portal/garagem", label: "Minha Garagem", icon: Car },
  { href: "/portal/perfil", label: "Meu Perfil", icon: User },
];

export default function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col h-screen w-60 flex-shrink-0"
      style={{ backgroundColor: VERDE }}
    >
      {/* Inquilino logado */}
      <div
        className="px-5 py-3 flex items-center gap-3"
        style={{ borderBottom: "1px solid #222222" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ backgroundColor: VERDE_ESCURO }}
        >
          CE
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            Carlos Eduardo
          </p>
          <p className="text-xs truncate" style={{ color: "#d4d4d4" }}>
            AP-101 · Bloco A
          </p>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? VERDE_ESCURO : "transparent",
                color: isActive ? "#FFFFFF" : "#d4d4d4",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sair */}
      <div className="p-5" style={{ borderTop: "1px solid #222222" }}>
        <Link
          href="/login-inquilino"
          className="flex items-center gap-2 text-sm transition-colors"
          style={{ color: "#d4d4d4" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#d4d4d4")}
        >
          <LogOut size={16} />
          <span>Sair</span>
        </Link>
      </div>
    </aside>
  );
}
