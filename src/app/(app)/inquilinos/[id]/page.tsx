"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  User,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Copy,
  Info,
} from "lucide-react";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { mockImoveis } from "@/data/mock";

const VERDE = "#111111";
const VERDE_ESCURO = "#222222";

function mascararCpf(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 11);
  return n
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function mascararTelefone(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 11);
  if (n.length <= 10)
    return n
      .replace(/(\d{2})(\d{4})(\d)/, "($1) $2-$3")
      .replace(/(\d{2})(\d{4})-(\d{4})/, "($1) $2-$3");
  return n.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

export default function NovoInquilinoPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    whatsapp: "",
    email: "",
    profissao: "",
    empresa: "",
    imovelId: "",
    observacoes: "",
    senha: "",
    confirmarSenha: "",
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [erroSenha, setErroSenha] = useState("");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const gerarSenhaAutomatica = () => {
    // Usa os 6 primeiros dígitos do CPF se disponível, senão gera aleatório
    const cpfNums = form.cpf.replace(/\D/g, "");
    const senha =
      cpfNums.length >= 6
        ? cpfNums.slice(0, 6)
        : Math.floor(100000 + Math.random() * 900000).toString();
    set("senha", senha);
    set("confirmarSenha", senha);
    setErroSenha("");
  };

  const copiarSenha = () => {
    navigator.clipboard.writeText(form.senha);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErroSenha("");

    if (!form.senha || form.senha.length < 6) {
      setErroSenha("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      setErroSenha("As senhas não coincidem.");
      return;
    }

    setSalvo(true);
  };

  const imoveisVagos = mockImoveis
    .filter((i) => i.status === "vago")
    .map((i) => ({ value: i.id, label: `${i.codigo} — ${i.endereco}` }));

  // ── Tela de sucesso ────────────────────────────────────────────────────────
  if (salvo) {
    const imovelSel = mockImoveis.find((i) => i.id === form.imovelId);
    return (
      <div className="max-w-xl">
        <div className="bg-white rounded-md border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#D1FAE5" }}
          >
            <CheckCircle size={34} style={{ color: VERDE }} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Inquilino cadastrado!
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              O acesso ao portal foi criado com sucesso.
            </p>
          </div>

          {/* Resumo do acesso */}
          <div
            className="w-full p-4 rounded-md border text-left"
            style={{ backgroundColor: "#F5F5F5", borderColor: "#BBF7D0" }}
          >
            <p
              className="text-xs font-bold mb-3"
              style={{ color: VERDE_ESCURO }}
            >
              🔑 Credenciais de acesso — envie ao inquilino
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Portal:</span>
                <span className="font-mono font-semibold text-gray-800 text-xs">
                  /login-inquilino
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Login (CPF):</span>
                <span className="font-mono font-semibold text-gray-800">
                  {form.cpf}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Senha inicial:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-gray-800">
                    {form.senha}
                  </span>
                  <button
                    onClick={copiarSenha}
                    className="p-1 rounded transition-colors"
                    style={{ color: VERDE }}
                    title="Copiar senha"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
              {imovelSel && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Imóvel:</span>
                  <span className="font-semibold text-gray-800">
                    {imovelSel.codigo}
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-400 flex items-start gap-1.5">
            <Info size={13} className="flex-shrink-0 mt-0.5" />
            Recomende ao inquilino trocar a senha no primeiro acesso em{" "}
            <strong>Portal → Meu Perfil</strong>.
          </p>

          <div className="flex gap-3 w-full">
            <Button
              onClick={() => router.push("/inquilinos")}
              className="flex-1"
            >
              Ver lista de inquilinos
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setSalvo(false);
                setForm({
                  nome: "",
                  cpf: "",
                  telefone: "",
                  whatsapp: "",
                  email: "",
                  profissao: "",
                  empresa: "",
                  imovelId: "",
                  observacoes: "",
                  senha: "",
                  confirmarSenha: "",
                });
              }}
              className="flex-1"
            >
              Cadastrar outro
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Formulário ─────────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl space-y-4">
      <Link
        href="/inquilinos"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} /> Voltar para Inquilinos
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card: Dados pessoais */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User size={16} style={{ color: VERDE }} />
              <h2 className="font-semibold text-gray-800">
                Dados do Inquilino
              </h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Nome completo *"
              value={form.nome}
              onChange={(e) => set("nome", e.target.value)}
              placeholder="Ex: Carlos Eduardo Silva"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="CPF *"
                value={form.cpf}
                onChange={(e) => set("cpf", mascararCpf(e.target.value))}
                placeholder="000.000.000-00"
                required
              />
              <Input
                label="Profissão *"
                value={form.profissao}
                onChange={(e) => set("profissao", e.target.value)}
                placeholder="Ex: Engenheiro"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Telefone *"
                type="tel"
                value={form.telefone}
                onChange={(e) =>
                  set("telefone", mascararTelefone(e.target.value))
                }
                placeholder="(11) 99999-9999"
                required
              />
              <Input
                label="WhatsApp"
                type="tel"
                value={form.whatsapp}
                onChange={(e) =>
                  set("whatsapp", mascararTelefone(e.target.value))
                }
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="E-mail *"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="email@exemplo.com"
                required
              />
              <Input
                label="Empresa"
                value={form.empresa}
                onChange={(e) => set("empresa", e.target.value)}
                placeholder="Nome da empresa (opcional)"
              />
            </div>

            <Select
              label="Imóvel a vincular"
              value={form.imovelId}
              onChange={(e) => set("imovelId", e.target.value)}
              options={imoveisVagos}
              placeholder="Selecione um imóvel vago (opcional)"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                value={form.observacoes}
                onChange={(e) => set("observacoes", e.target.value)}
                rows={3}
                placeholder="Informações adicionais sobre o inquilino..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none outline-none"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = VERDE;
                  e.currentTarget.style.boxShadow = "0 0 0 2px #d4d4d4";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#D1D5DB";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </CardBody>
        </Card>

        {/* Card: Acesso ao portal */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock size={16} style={{ color: VERDE }} />
              <h2 className="font-semibold text-gray-800">
                Acesso ao Portal do Inquilino
              </h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            {/* Aviso informativo */}
            <div
              className="flex items-start gap-2 p-3 rounded-md text-sm"
              style={{ backgroundColor: "#F5F5F5", color: "#065F46" }}
            >
              <Info size={15} className="flex-shrink-0 mt-0.5" />
              <p>
                O inquilino usará o <strong>CPF</strong> como login e a senha
                definida abaixo para acessar o{" "}
                <strong>Portal do Inquilino</strong>. Você pode gerar a senha
                automaticamente a partir do CPF.
              </p>
            </div>

            {/* Botão gerar senha */}
            <button
              type="button"
              onClick={gerarSenhaAutomatica}
              className="w-full py-2 rounded-md border-2 text-sm font-semibold transition-colors"
              style={{
                borderColor: VERDE,
                color: VERDE,
                backgroundColor: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
              }}
            >
              ⚡ Gerar senha automaticamente (6 primeiros dígitos do CPF)
            </button>

            {/* Campos de senha */}
            <div className="grid grid-cols-2 gap-4">
              {/* Senha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha inicial *
                </label>
                <div className="relative">
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    value={form.senha}
                    onChange={(e) => set("senha", e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm outline-none transition-colors"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = VERDE;
                      e.currentTarget.style.boxShadow = "0 0 0 2px #d4d4d4";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#D1D5DB";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {mostrarSenha ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirmar senha */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar senha *
                </label>
                <div className="relative">
                  <input
                    type={mostrarConfirmar ? "text" : "password"}
                    value={form.confirmarSenha}
                    onChange={(e) => set("confirmarSenha", e.target.value)}
                    placeholder="Repita a senha"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm outline-none transition-colors"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = VERDE;
                      e.currentTarget.style.boxShadow = "0 0 0 2px #d4d4d4";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#D1D5DB";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {mostrarConfirmar ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Indicador de força/coincidência */}
            {form.senha && form.confirmarSenha && (
              <p
                className="text-xs font-medium"
                style={{
                  color: form.senha === form.confirmarSenha ? VERDE : "#DC2626",
                }}
              >
                {form.senha === form.confirmarSenha
                  ? "✓ Senhas coincidem"
                  : "✗ Senhas não coincidem"}
              </p>
            )}

            {/* Erro */}
            {erroSenha && (
              <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-md">
                {erroSenha}
              </p>
            )}
          </CardBody>
        </Card>

        {/* Ações */}
        <div className="flex gap-3">
          <Button type="submit">
            <Save size={16} />
            Cadastrar Inquilino
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
