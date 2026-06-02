"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  FileText,
  DollarSign,
  CreditCard,
  Wrench,
  Car,
  BarChart2,
  MessageCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/imoveis", label: "Imóveis", icon: Building2 },
  { href: "/inquilinos", label: "Inquilinos", icon: Users },
  { href: "/proprietarios", label: "Proprietários", icon: UserCog },
  { href: "/contratos", label: "Contratos", icon: FileText },
  { href: "/financeiro", label: "Financeiro", icon: DollarSign },
  { href: "/cobrancas", label: "Cobranças", icon: CreditCard },
  { href: "/manutencao", label: "Manutenção", icon: Wrench },
  { href: "/garagens", label: "Garagens", icon: Car },
  { href: "/relatorios", label: "Relatórios", icon: BarChart2 },
  { href: "/whatsapp", label: "WhatsApp", icon: MessageCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col h-screen transition-all duration-200 flex-shrink-0 bg-[#111111] ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      {/* Topo */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 text-white/40 hover:text-white transition-colors ml-auto"
          title={collapsed ? "Expandir" : "Recolher"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
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
              title={collapsed ? item.label : undefined}
              className={`relative flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                isActive ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-white rounded-r-full" />
              )}
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && (
                <span className={isActive ? "font-medium" : "font-normal"}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div className="px-4 py-4 border-t border-white/10">
        <div
          className={`flex items-center gap-2.5 mb-3 ${collapsed ? "justify-center" : ""}`}
        >
          <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            A
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">
                Administrador
              </p>
              <p className="text-[11px] text-white/40 truncate">
                admin@gestao.com
              </p>
            </div>
          )}
        </div>
        <Link
          href="/login"
          className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors"
          title={collapsed ? "Sair" : undefined}
        >
          <LogOut size={14} />
          {!collapsed && <span>Sair</span>}
        </Link>
      </div>
    </aside>
  );
}
