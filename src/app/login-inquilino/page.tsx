"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import Link from "next/link";

const VERDE = "#111111";
const VERDE_ESCURO = "#222222";

// ── Credenciais de teste ────────────────────────────────────────────────────
const TESTE_CPF = "123.456.789-00";
const TESTE_SENHA = "123456";

export default function LoginInquilinoPage() {
  const router = useRouter();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const formatarCpf = (v: string) => {
    const nums = v.replace(/\D/g, "").slice(0, 11);
    return nums
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  };

  const preencherTeste = () => {
    setCpf(TESTE_CPF);
    setSenha(TESTE_SENHA);
    setErro("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    if (!cpf || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (cpf !== TESTE_CPF || senha !== TESTE_SENHA) {
      setErro("CPF ou senha incorretos.");
      return;
    }
    setCarregando(true);
    setTimeout(() => router.push("/portal/dashboard"), 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#F0F9F4" }}
    >
      <div className="w-full max-w-sm">
        {/* Voltar */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm mb-6 transition-colors"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = VERDE)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
        >
          <ArrowLeft size={15} />
          Voltar à seleção
        </Link>

        {/* Card */}
        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6">
          {/* Box de credenciais de teste */}
          <div
            className="mb-5 p-3 rounded-md border"
            style={{ backgroundColor: "#F5F5F5", borderColor: "#BBF7D0" }}
          >
            <p
              className="text-xs font-bold mb-2"
              style={{ color: VERDE_ESCURO }}
            >
              🔑 Credenciais de teste
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>CPF:</span>
                <code className="font-mono font-semibold text-gray-800">
                  {TESTE_CPF}
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span>Senha:</span>
                <code className="font-mono font-semibold text-gray-800">
                  {TESTE_SENHA}
                </code>
              </div>
            </div>
            <button
              type="button"
              onClick={preencherTeste}
              className="mt-2 w-full text-xs font-semibold py-1.5 rounded-md transition-colors"
              style={{ backgroundColor: VERDE, color: "white" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = VERDE_ESCURO)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = VERDE)
              }
            >
              Preencher automaticamente
            </button>
          </div>

          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Bem-vindo!
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Acesse sua área com CPF e senha.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* CPF */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CPF
              </label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(formatarCpf(e.target.value))}
                placeholder="000.000.000-00"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm outline-none transition-colors"
                onFocus={(e) => (e.target.style.borderColor = VERDE)}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                autoComplete="off"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 pr-10 border border-gray-200 rounded-md text-sm outline-none transition-colors"
                  onFocus={(e) => (e.target.style.borderColor = VERDE)}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {erro && (
              <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-md">
                {erro}
              </p>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={carregando}
              className="w-full py-2.5 rounded-md text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity"
              style={{ backgroundColor: VERDE, opacity: carregando ? 0.7 : 1 }}
              onMouseEnter={(e) => {
                if (!carregando)
                  e.currentTarget.style.backgroundColor = VERDE_ESCURO;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = VERDE;
              }}
            >
              {carregando ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {carregando ? "Entrando…" : "Entrar"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Esqueceu a senha?{" "}
            <span
              className="font-medium cursor-pointer"
              style={{ color: VERDE }}
            >
              Fale com a administração
            </span>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          É administrador?{" "}
          <Link href="/login" className="font-medium" style={{ color: VERDE }}>
            Acesse o painel
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-2">
          © {new Date().getFullYear()} gestorimob
        </p>
      </div>
    </div>
  );
}
