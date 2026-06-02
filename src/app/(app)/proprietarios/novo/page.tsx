"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function NovoProprietarioPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    cpfCnpj: "",
    telefone: "",
    whatsapp: "",
    email: "",
    endereco: "",
    chavePix: "",
    banco: "",
    agencia: "",
    conta: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Proprietário cadastrado com sucesso! (mock)");
    router.push("/proprietarios");
  };

  return (
    <div className="max-w-2xl space-y-4">
      <Link
        href="/proprietarios"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} /> Voltar para Proprietários
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-800">Dados Pessoais</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Nome / Razão Social *"
              value={form.nome}
              onChange={(e) => set("nome", e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="CPF / CNPJ *"
                value={form.cpfCnpj}
                onChange={(e) => set("cpfCnpj", e.target.value)}
                placeholder="000.000.000-00"
                required
              />
              <Input
                label="E-mail *"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Telefone *"
                type="tel"
                value={form.telefone}
                onChange={(e) => set("telefone", e.target.value)}
                placeholder="(00) 00000-0000"
                required
              />
              <Input
                label="WhatsApp"
                type="tel"
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
            <Input
              label="Endereço completo *"
              value={form.endereco}
              onChange={(e) => set("endereco", e.target.value)}
              required
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-800">
              Dados Bancários (opcional)
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Chave Pix"
              value={form.chavePix}
              onChange={(e) => set("chavePix", e.target.value)}
              placeholder="CPF, e-mail, telefone ou chave aleatória"
            />
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Banco"
                value={form.banco}
                onChange={(e) => set("banco", e.target.value)}
                placeholder="Ex: Itaú"
              />
              <Input
                label="Agência"
                value={form.agencia}
                onChange={(e) => set("agencia", e.target.value)}
                placeholder="0000"
              />
              <Input
                label="Conta"
                value={form.conta}
                onChange={(e) => set("conta", e.target.value)}
                placeholder="00000-0"
              />
            </div>
          </CardBody>
        </Card>

        <div className="flex gap-3">
          <Button type="submit">
            <Save size={16} />
            Salvar Proprietário
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
