"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { mockImoveis, mockInquilinos, mockProprietarios } from "@/data/mock";

export default function NovoContratoPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    imovelId: "",
    inquilinoId: "",
    proprietarioId: "",
    dataInicio: "",
    dataTermino: "",
    valorAluguel: "",
    valorCondominio: "",
    diaVencimento: "5",
    observacoes: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Contrato cadastrado com sucesso! (mock)");
    router.push("/contratos");
  };

  const imoveisOpts = mockImoveis.map((i) => ({
    value: i.id,
    label: `${i.codigo} — ${i.tipo} Bloco ${i.bloco}`,
  }));
  const inquilinosOpts = mockInquilinos.map((i) => ({
    value: i.id,
    label: i.nome,
  }));
  const proprietariosOpts = mockProprietarios.map((p) => ({
    value: p.id,
    label: p.nome,
  }));
  const diasOpts = Array.from({ length: 28 }, (_, i) => ({
    value: String(i + 1),
    label: `Dia ${i + 1}`,
  }));

  return (
    <div className="max-w-2xl space-y-4">
      <Link
        href="/contratos"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} /> Voltar para Contratos
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-800">Partes do Contrato</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Select
              label="Imóvel *"
              value={form.imovelId}
              onChange={(e) => set("imovelId", e.target.value)}
              required
              options={imoveisOpts}
              placeholder="Selecione o imóvel"
            />
            <Select
              label="Inquilino *"
              value={form.inquilinoId}
              onChange={(e) => set("inquilinoId", e.target.value)}
              required
              options={inquilinosOpts}
              placeholder="Selecione o inquilino"
            />
            <Select
              label="Proprietário *"
              value={form.proprietarioId}
              onChange={(e) => set("proprietarioId", e.target.value)}
              required
              options={proprietariosOpts}
              placeholder="Selecione o proprietário"
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-800">Vigência e Valores</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Data de início *"
                type="date"
                value={form.dataInicio}
                onChange={(e) => set("dataInicio", e.target.value)}
                required
              />
              <Input
                label="Data de término *"
                type="date"
                value={form.dataTermino}
                onChange={(e) => set("dataTermino", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Aluguel (R$) *"
                type="number"
                min="0"
                step="0.01"
                value={form.valorAluguel}
                onChange={(e) => set("valorAluguel", e.target.value)}
                required
              />
              <Input
                label="Condomínio (R$)"
                type="number"
                min="0"
                step="0.01"
                value={form.valorCondominio}
                onChange={(e) => set("valorCondominio", e.target.value)}
              />
              <Select
                label="Dia vencimento *"
                value={form.diaVencimento}
                onChange={(e) => set("diaVencimento", e.target.value)}
                required
                options={diasOpts}
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
                placeholder="Cláusulas especiais, condições..."
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

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-800">Contrato em PDF</h2>
          </CardHeader>
          <CardBody>
            <label
              className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-green-400 transition-colors"
              style={{ borderColor: "#D1D5DB" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#111111")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#D1D5DB")
              }
            >
              <Upload size={24} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                Clique para fazer upload do PDF
              </span>
              <span className="text-xs text-gray-400 mt-1">PDF até 10 MB</span>
              <input type="file" accept=".pdf" className="hidden" />
            </label>
          </CardBody>
        </Card>

        <div className="flex gap-3">
          <Button type="submit">
            <Save size={16} />
            Salvar Contrato
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
