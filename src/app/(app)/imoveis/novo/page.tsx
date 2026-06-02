"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { mockProprietarios } from "@/data/mock";

export default function NovoImovelPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    tipo: "",
    bloco: "",
    numero: "",
    endereco: "",
    status: "vago",
    proprietarioId: "",
    valorAluguel: "",
    valorCondominio: "",
    observacoes: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em produção: POST /api/imoveis
    alert("Imóvel cadastrado com sucesso! (mock)");
    router.push("/imoveis");
  };

  const proprietarioOptions = mockProprietarios.map((p) => ({
    value: p.id,
    label: p.nome,
  }));

  return (
    <div className="max-w-2xl space-y-4">
      <Link
        href="/imoveis"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} /> Voltar para Imóveis
      </Link>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-800">Dados do Imóvel</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Tipo do imóvel *"
                value={form.tipo}
                onChange={(e) => set("tipo", e.target.value)}
                required
                options={[
                  { value: "Apartamento", label: "Apartamento" },
                  { value: "Casa", label: "Casa" },
                  { value: "Kitnet", label: "Kitnet" },
                  { value: "Cobertura", label: "Cobertura" },
                  { value: "Sala", label: "Sala Comercial" },
                ]}
                placeholder="Selecione o tipo"
              />
              <Select
                label="Status *"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                required
                options={[
                  { value: "vago", label: "Vago" },
                  { value: "ocupado", label: "Ocupado" },
                  { value: "manutencao", label: "Em Manutenção" },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Bloco *"
                value={form.bloco}
                onChange={(e) => set("bloco", e.target.value)}
                placeholder="Ex: A, B, C"
                required
              />
              <Input
                label="Número *"
                value={form.numero}
                onChange={(e) => set("numero", e.target.value)}
                placeholder="Ex: 101"
                required
              />
            </div>

            <Input
              label="Endereço completo *"
              value={form.endereco}
              onChange={(e) => set("endereco", e.target.value)}
              placeholder="Rua, número, bairro"
              required
            />

            <Select
              label="Proprietário vinculado *"
              value={form.proprietarioId}
              onChange={(e) => set("proprietarioId", e.target.value)}
              required
              options={proprietarioOptions}
              placeholder="Selecione o proprietário"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Valor do aluguel (R$) *"
                type="number"
                min="0"
                step="0.01"
                value={form.valorAluguel}
                onChange={(e) => set("valorAluguel", e.target.value)}
                placeholder="0,00"
                required
              />
              <Input
                label="Valor do condomínio (R$)"
                type="number"
                min="0"
                step="0.01"
                value={form.valorCondominio}
                onChange={(e) => set("valorCondominio", e.target.value)}
                placeholder="0,00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                value={form.observacoes}
                onChange={(e) => set("observacoes", e.target.value)}
                rows={3}
                placeholder="Informações adicionais sobre o imóvel..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none outline-none"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#111111";
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

        <div className="flex gap-3 mt-4">
          <Button type="submit">
            <Save size={16} />
            Salvar Imóvel
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
