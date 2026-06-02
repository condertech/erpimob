"use client";

import { useState } from "react";
import {
  Car,
  MapPin,
  Edit2,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";

const VERDE = "#111111";
const VERDE_ESCURO = "#222222";

export default function PortalGaragemPage() {
  const [editando, setEditando] = useState(false);
  const [placa, setPlaca] = useState("ABC-1234");
  const [modelo, setModelo] = useState("Volkswagen Gol");
  const [cor, setCor] = useState("Prata");
  const [solicitacao, setSolicitacao] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSalvar = () => {
    setEditando(false);
    setEnviado(false);
  };

  const handleSolicitacao = () => {
    if (!solicitacao.trim()) return;
    setSolicitacao("");
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  const vaga = {
    numero: "A-07",
    bloco: "A",
    nivel: "Térreo",
    tipo: "Coberta",
    dimensao: "2,5m × 5m",
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Mapa visual da vaga */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <MapPin size={16} style={{ color: VERDE }} />
          <p className="text-sm font-bold text-gray-700">Minha Vaga</p>
        </div>
        <div className="p-5">
          {/* Mini mapa estilizado */}
          <div className="bg-gray-50 rounded-md p-4 mb-5">
            <p className="text-xs text-gray-400 mb-3 text-center">
              Bloco A — Estacionamento Térreo
            </p>
            <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
              {[
                "A-01",
                "A-02",
                "A-03",
                "A-04",
                "A-05",
                "A-06",
                "A-07",
                "A-08",
                "A-09",
                "A-10",
              ].map((n) => (
                <div
                  key={n}
                  className="h-10 rounded flex items-center justify-center text-xs font-semibold"
                  style={
                    n === "A-07"
                      ? { backgroundColor: VERDE, color: "white" }
                      : { backgroundColor: "#E5E7EB", color: "#9CA3AF" }
                  }
                >
                  {n === "A-07" ? "★ " + n.split("-")[1] : n.split("-")[1]}
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-3" style={{ color: VERDE }}>
              ★ Sua vaga: A-07
            </p>
          </div>

          {/* Detalhes */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Número da Vaga", valor: vaga.numero },
              { label: "Bloco", valor: vaga.bloco },
              { label: "Nível", valor: vaga.nivel },
              { label: "Tipo", valor: vaga.tipo },
              { label: "Dimensão", valor: vaga.dimensao },
            ].map((d) => (
              <div key={d.label} className="bg-gray-50 rounded-md p-3">
                <p className="text-xs text-gray-400">{d.label}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                  {d.valor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meu veículo */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Car size={16} style={{ color: VERDE }} />
            <p className="text-sm font-bold text-gray-700">Meu Veículo</p>
          </div>
          <button
            onClick={() => setEditando(!editando)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border transition-colors"
            style={{
              borderColor: editando ? VERDE : "#E5E7EB",
              color: editando ? VERDE : "#6B7280",
              backgroundColor: editando ? "#F5F5F5" : "white",
            }}
          >
            <Edit2 size={12} />
            {editando ? "Cancelar" : "Editar"}
          </button>
        </div>
        <div className="p-5 space-y-4">
          {editando ? (
            <>
              {[
                {
                  label: "Placa",
                  value: placa,
                  setter: setPlaca,
                  placeholder: "ABC-1234",
                },
                {
                  label: "Modelo",
                  value: modelo,
                  setter: setModelo,
                  placeholder: "Ex: Volkswagen Gol",
                },
                {
                  label: "Cor",
                  value: cor,
                  setter: setCor,
                  placeholder: "Ex: Prata",
                },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {f.label}
                  </label>
                  <input
                    type="text"
                    value={f.value}
                    onChange={(e) => f.setter(e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md outline-none"
                    onFocus={(e) => (e.target.style.borderColor = VERDE)}
                    onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                  />
                </div>
              ))}
              <button
                onClick={handleSalvar}
                className="w-full py-2 rounded-md text-sm font-semibold text-white"
                style={{ backgroundColor: VERDE }}
              >
                Salvar Alterações
              </button>
            </>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Placa", valor: placa },
                { label: "Modelo", valor: modelo },
                { label: "Cor", valor: cor },
              ].map((d) => (
                <div key={d.label} className="bg-gray-50 rounded-md p-3">
                  <p className="text-xs text-gray-400">{d.label}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {d.valor}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Solicitações */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-700">Enviar Solicitação</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Alteração de veículo, troca de placa, etc.
          </p>
        </div>
        <div className="p-5 space-y-3">
          {enviado && (
            <div
              className="flex items-center gap-2 p-3 rounded-md text-sm font-medium"
              style={{ backgroundColor: "#D1FAE5", color: "#065F46" }}
            >
              <CheckCircle size={14} />
              Solicitação enviada! A administração entrará em contato.
            </div>
          )}
          <textarea
            value={solicitacao}
            onChange={(e) => setSolicitacao(e.target.value)}
            placeholder="Ex: Preciso trocar a placa do meu veículo. Nova placa: XYZ-5678."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md resize-none outline-none"
            onFocus={(e) => (e.target.style.borderColor = VERDE)}
            onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
          />
          <button
            onClick={handleSolicitacao}
            disabled={!solicitacao.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition-opacity"
            style={{
              backgroundColor: VERDE,
              opacity: solicitacao.trim() ? 1 : 0.4,
            }}
          >
            <Send size={14} />
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
