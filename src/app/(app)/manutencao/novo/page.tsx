"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Card, { CardHeader, CardBody } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { mockImoveis, mockInquilinos } from "@/data/mock";

export default function NovoChamadoPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    imovelId: "",
    inquilinoId: "",
    tipo: "",
    descricao: "",
    prioridade: "media",
    status: "aberto",
    responsavel: "",
    valorGasto: "",
    observacoes: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Chamado aberto com sucesso! (mock)");
    router.push("/manutencao");
  };

  const imoveisOpts = mockImoveis.map((i) => ({
    value: i.id,
    label: `${i.codigo} — ${i.tipo}`,
  }));
  const inquilinosOpts = [
    { value: "", label: "— Nenhum inquilino —" },
    ...mockInquilinos.map((i) => ({ value: i.id, label: i.nome })),
  ];

  return (
    <div className="max-w-2xl space-y-4">
      <Link
        href="/manutencao"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} /> Voltar para Manutenção
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-800">Dados do Chamado</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Imóvel *"
                value={form.imovelId}
                onChange={(e) => set("imovelId", e.target.value)}
                required
                options={imoveisOpts}
                placeholder="Selecione o imóvel"
              />
              <Select
                label="Inquilino"
                value={form.inquilinoId}
                onChange={(e) => set("inquilinoId", e.target.value)}
                options={inquilinosOpts}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Tipo de manutenção *"
                value={form.tipo}
                onChange={(e) => set("tipo", e.target.value)}
                required
                options={[
                  { value: "Hidráulica", label: "Hidráulica" },
                  { value: "Elétrica", label: "Elétrica" },
                  { value: "Estrutural", label: "Estrutural" },
                  { value: "Pintura", label: "Pintura" },
                  { value: "Serralheria", label: "Serralheria" },
                  { value: "Limpeza", label: "Limpeza" },
                  { value: "Outros", label: "Outros" },
                ]}
                placeholder="Selecione o tipo"
              />
              <Select
                label="Prioridade *"
                value={form.prioridade}
                onChange={(e) => set("prioridade", e.target.value)}
                required
                options={[
                  { value: "baixa", label: "Baixa" },
                  { value: "media", label: "Média" },
                  { value: "alta", label: "Alta" },
                  { value: "urgente", label: "Urgente" },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição do problema *
              </label>
              <textarea
                value={form.descricao}
                onChange={(e) => set("descricao", e.target.value)}
                required
                rows={4}
                placeholder="Descreva o problema detalhadamente..."
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

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Status *"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                required
                options={[
                  { value: "aberto", label: "Aberto" },
                  { value: "em_andamento", label: "Em Andamento" },
                  { value: "concluido", label: "Concluído" },
                ]}
              />
              <Input
                label="Responsável"
                value={form.responsavel}
                onChange={(e) => set("responsavel", e.target.value)}
                placeholder="Nome do técnico / prestador"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Valor gasto (R$)"
                type="number"
                min="0"
                step="0.01"
                value={form.valorGasto}
                onChange={(e) => set("valorGasto", e.target.value)}
                placeholder="0,00"
              />
              <div />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                value={form.observacoes}
                onChange={(e) => set("observacoes", e.target.value)}
                rows={2}
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
            <h2 className="font-semibold text-gray-800">Fotos / Anexos</h2>
          </CardHeader>
          <CardBody>
            <label
              className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#111111")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#D1D5DB")
              }
            >
              <Upload size={22} className="text-gray-400 mb-1" />
              <span className="text-sm text-gray-500">
                Adicionar fotos ou documentos
              </span>
              <span className="text-xs text-gray-400">JPG, PNG, PDF</span>
              <input
                type="file"
                accept="image/*,.pdf"
                multiple
                className="hidden"
              />
            </label>
          </CardBody>
        </Card>

        <div className="flex gap-3">
          <Button type="submit">
            <Save size={16} />
            Salvar Chamado
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
