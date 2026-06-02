"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Lock,
  Bell,
  LogOut,
  CheckCircle,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";
import Link from "next/link";

const VERDE = "#111111";
const VERDE_ESCURO = "#222222";

export default function PortalPerfilPage() {
  const [nome, setNome] = useState("Carlos Eduardo Silva");
  const [telefone, setTelefone] = useState("(11) 99123-4567");
  const [whatsapp, setWhatsapp] = useState("(11) 99123-4567");
  const [email, setEmail] = useState("carlos.silva@email.com");
  const [salvo, setSalvo] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [senhaOk, setSenhaOk] = useState(false);
  const [erroSenha, setErroSenha] = useState("");

  const [notifEmail, setNotifEmail] = useState(true);
  const [notifWhatsapp, setNotifWhatsapp] = useState(true);
  const [notifBoleto, setNotifBoleto] = useState(true);
  const [notifManutencao, setNotifManutencao] = useState(false);

  const handleSalvar = () => {
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  };

  const handleSenha = () => {
    setErroSenha("");
    if (!senhaAtual || !novaSenha || !confirmar) {
      setErroSenha("Preencha todos os campos.");
      return;
    }
    if (novaSenha !== confirmar) {
      setErroSenha("As senhas não coincidem.");
      return;
    }
    if (novaSenha.length < 6) {
      setErroSenha("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmar("");
    setSenhaOk(true);
    setTimeout(() => setSenhaOk(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Avatar */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm p-6 flex items-center gap-5">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
          style={{ backgroundColor: VERDE }}
        >
          CE
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Carlos Eduardo Silva
          </h2>
          <p className="text-sm text-gray-500">Inquilino · AP-101 · Bloco A</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Contrato ativo desde 15/01/2024
          </p>
        </div>
      </div>

      {/* Dados pessoais */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <User size={15} style={{ color: VERDE }} />
          <p className="text-sm font-bold text-gray-700">Dados Pessoais</p>
        </div>
        <div className="p-5 space-y-4">
          {salvo && (
            <div
              className="flex items-center gap-2 p-3 rounded-md text-sm font-medium"
              style={{ backgroundColor: "#D1FAE5", color: "#065F46" }}
            >
              <CheckCircle size={14} />
              Dados atualizados com sucesso!
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Nome completo",
                value: nome,
                setter: setNome,
                icon: User,
                type: "text",
              },
              {
                label: "E-mail",
                value: email,
                setter: setEmail,
                icon: Mail,
                type: "email",
              },
              {
                label: "Telefone",
                value: telefone,
                setter: setTelefone,
                icon: Phone,
                type: "tel",
              },
              {
                label: "WhatsApp",
                value: whatsapp,
                setter: setWhatsapp,
                icon: Phone,
                type: "tel",
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {f.label}
                  </label>
                  <div className="relative">
                    <Icon
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={f.type}
                      value={f.value}
                      onChange={(e) => f.setter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-md outline-none transition-colors"
                      onFocus={(e) => (e.target.style.borderColor = VERDE)}
                      onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-2">
            <button
              onClick={handleSalvar}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium"
              style={{ backgroundColor: VERDE }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = VERDE_ESCURO)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = VERDE)
              }
            >
              <Save size={14} />
              Salvar dados
            </button>
          </div>
        </div>
      </div>

      {/* Alterar senha */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <Lock size={15} style={{ color: VERDE }} />
          <p className="text-sm font-bold text-gray-700">Alterar Senha</p>
        </div>
        <div className="p-5 space-y-3">
          {senhaOk && (
            <div
              className="flex items-center gap-2 p-3 rounded-md text-sm font-medium"
              style={{ backgroundColor: "#D1FAE5", color: "#065F46" }}
            >
              <CheckCircle size={14} />
              Senha alterada com sucesso!
            </div>
          )}
          {erroSenha && (
            <div
              className="p-3 rounded-md text-sm"
              style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}
            >
              {erroSenha}
            </div>
          )}
          {[
            { label: "Senha atual", value: senhaAtual, setter: setSenhaAtual },
            { label: "Nova senha", value: novaSenha, setter: setNovaSenha },
            {
              label: "Confirmar nova senha",
              value: confirmar,
              setter: setConfirmar,
            },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {f.label}
              </label>
              <div className="relative">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-200 rounded-md outline-none transition-colors"
                  onFocus={(e) => (e.target.style.borderColor = VERDE)}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {mostrarSenha ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleSenha}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium mt-2"
            style={{ backgroundColor: VERDE }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = VERDE_ESCURO)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = VERDE)
            }
          >
            <Lock size={14} />
            Alterar senha
          </button>
        </div>
      </div>

      {/* Notificações */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <Bell size={15} style={{ color: VERDE }} />
          <p className="text-sm font-bold text-gray-700">Notificações</p>
        </div>
        <div className="p-5 space-y-4">
          {[
            {
              label: "Receber notificações por e-mail",
              sub: "Boletos, avisos e confirmações",
              value: notifEmail,
              setter: setNotifEmail,
            },
            {
              label: "Receber notificações por WhatsApp",
              sub: "Cobranças e lembretes de vencimento",
              value: notifWhatsapp,
              setter: setNotifWhatsapp,
            },
            {
              label: "Alertas de boleto gerado",
              sub: "Aviso quando um novo boleto for emitido",
              value: notifBoleto,
              setter: setNotifBoleto,
            },
            {
              label: "Atualizações de manutenção",
              sub: "Status dos chamados abertos",
              value: notifManutencao,
              setter: setNotifManutencao,
            },
          ].map((n) => (
            <div
              key={n.label}
              className="flex items-start justify-between gap-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{n.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{n.sub}</p>
              </div>
              <button
                onClick={() => n.setter(!n.value)}
                className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5"
                style={{ backgroundColor: n.value ? VERDE : "#D1D5DB" }}
              >
                <span
                  className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                  style={{
                    transform: n.value ? "translateX(20px)" : "translateX(0)",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sair */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm p-5">
        <Link
          href="/login-inquilino"
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
        >
          <LogOut size={16} />
          Sair da conta
        </Link>
      </div>
    </div>
  );
}
