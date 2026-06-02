"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import Link from "next/link";

const VERDE = "#111111";
const VERDE_ESCURO = "#222222";

// ── Credenciais de teste ─────────────────────────────────────────────────────
const TESTE_EMAIL = "admin@gestao.com";
const TESTE_SENHA = "admin123";

export default function LoginAdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const preencherTeste = () => {
    setEmail(TESTE_EMAIL);
    setSenha(TESTE_SENHA);
    setErro("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    if (email !== TESTE_EMAIL || senha !== TESTE_SENHA) {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 800);
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
                <span>E-mail:</span>
                <code className="font-mono font-semibold text-gray-800">
                  {TESTE_EMAIL}
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

          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Entrar como administrador
          </h2>

          {erro && (
            <div
              className="mb-4 px-3 py-2.5 rounded-md text-sm"
              style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}
            >
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gestao.com"
                className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors"
                onFocus={(e) => (e.currentTarget.style.borderColor = VERDE)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
              />
            </div>

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
                  className="w-full border border-gray-200 rounded-md px-3 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors"
                  onFocus={(e) => (e.currentTarget.style.borderColor = VERDE)}
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#E5E7EB")
                  }
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md text-white font-semibold text-sm flex items-center justify-center gap-2"
              style={{
                backgroundColor: loading ? VERDE_ESCURO : VERDE,
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading)
                  e.currentTarget.style.backgroundColor = VERDE_ESCURO;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = VERDE;
              }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          É inquilino?{" "}
          <Link
            href="/login-inquilino"
            className="font-medium"
            style={{ color: VERDE }}
          >
            Acesse o portal
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-2">
          © {new Date().getFullYear()} gestorimob
        </p>
      </div>
    </div>
  );
}
