"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  BookOpen,
  Volume2,
  Clock,
  CheckCircle2,
  Play,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  X,
  CheckSquare,
  AlertCircle,
  Lightbulb,
  FileCheck,
} from "lucide-react";
import { LEARNING_MODULES } from "@/lib/data";
import { LearningModule } from "@/lib/types";
import { speakText, stopSpeaking } from "@/lib/speech";

interface ModulSectionProps {
  onStartAssessment: () => void;
}

export default function ModulSection({ onStartAssessment }: ModulSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("semua");
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completedModules, setCompletedModules] = useState<number[]>([1]);

  const filteredModules = LEARNING_MODULES.filter((mod) => {
    if (activeFilter === "semua") return true;
    if (activeFilter === "wajib") return mod.isPriority || mod.category === "wajib";
    if (activeFilter === "umkm") return mod.category === "umkm";
    if (activeFilter === "keluarga") return mod.category === "keluarga";
    return true;
  });

  const handleOpenModule = (mod: LearningModule) => {
    stopSpeaking();
    setActiveModule(mod);
    setActiveStepIndex(0);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);

    const intro = `Modul ${mod.id}: ${mod.title}. ${mod.description}`;
    speakText(intro);
  };

  const handleCloseModule = () => {
    stopSpeaking();
    setActiveModule(null);
  };

  const handlePlayStepAudio = () => {
    if (!activeModule) return;
    const step = activeModule.steps[activeStepIndex];
    const text = `Langkah ${step.stepNumber}: ${step.title}. ${step.content.join(" ")}. Tips: ${step.tips}`;
    speakText(text);
  };

  const handleCompleteCurrentModule = () => {
    if (!activeModule) return;
    if (!completedModules.includes(activeModule.id)) {
      setCompletedModules([...completedModules, activeModule.id]);
    }
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
    speakText("Selamat! Anda telah menyelesaikan seluruh materi pada modul ini.");
    handleCloseModule();
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-2">
      <div className="w-full bg-gradient-to-r from-[#d9e6da]/70 via-[#cbffc2]/40 to-[#d9e6da]/70 border border-[#0d631b]/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0d631b] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#0d631b] uppercase tracking-wider block">
              Audio Pendamping Tersedia
            </span>
            <p className="text-xs sm:text-sm text-gray-800 font-semibold leading-snug">
              Dengarkan materi pembelajaran berbahasa Sunda & Indonesia yang santun serta mudah dipahami lansia.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            speakText(
              "Katalog Modul Microlearning BINA CAKAP Digital Desa Cikawao. Terdapat empat modul utama sesuai program PPM Universitas Bhakti Kencana."
            )
          }
          className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-[#0d631b] font-bold text-xs shadow-xs border border-[#0d631b]/20 flex items-center justify-center gap-1.5 shrink-0 transition-transform active:scale-95"
        >
          <Volume2 className="w-4 h-4" />
          <span>Putar Ringkasan</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#0d631b] text-white text-xs font-bold uppercase">
              Microlearning Cepat (3–5 Menit)
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              4 Kunjungan PPM UBK
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Katalog Modul BINA CAKAP Desa Cikawao
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Materi praktis hemat kuota dengan checklist latihan langsung untuk warga pedesaan.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: "semua", label: "Semua (4)" },
            { id: "wajib", label: "Wajib Kader" },
            { id: "umkm", label: "UMKM & Usaha" },
            { id: "keluarga", label: "Keluarga Santun" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === tab.id
                  ? "bg-[#0d631b] text-white shadow-xs"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
        {filteredModules.map((mod) => {
          const isDone = completedModules.includes(mod.id);

          return (
            <div
              key={mod.id}
              className={`bg-white rounded-3xl p-6 border transition-all hover:shadow-md flex flex-col justify-between ${
                mod.isPriority
                  ? "border-[#0d631b]/30 shadow-xs ring-1 ring-[#0d631b]/20"
                  : "border-gray-200/90 shadow-xs"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#d9e6da] text-[#0d631b] text-xs font-bold">
                    Kunjungan {mod.visitNumber} • {mod.dimension}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {mod.durationMinutes} Menit
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-[#0d631b] transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#0d631b]">
                    {mod.subtitle}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1">
                    {mod.description}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-2xl flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-600">3 Langkah Belajar Praktis</span>
                  <span className="text-[#0d631b]">{mod.steps.length} Panduan</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  {isDone ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Tuntas
                    </span>
                  ) : (
                    <span className="text-gray-500">Belum Selesai</span>
                  )}
                </div>

                <button
                  onClick={() => handleOpenModule(mod)}
                  className="px-5 py-2.5 rounded-xl bg-[#0d631b] hover:bg-[#2e7d32] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Buka Modul</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-100 flex flex-col gap-5 sm:gap-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-[#0d631b] uppercase tracking-wider block">
                  Kunjungan {activeModule.visitNumber} • Modul Mandiri Desa
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                  {activeModule.title}
                </h2>
              </div>
              <button
                onClick={handleCloseModule}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-gray-100">
              {activeModule.steps.map((st, idx) => (
                <button
                  key={st.stepNumber}
                  onClick={() => {
                    stopSpeaking();
                    setActiveStepIndex(idx);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeStepIndex === idx
                      ? "bg-[#0d631b] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Langkah {st.stepNumber}
                </button>
              ))}
              <button
                onClick={() => {
                  stopSpeaking();
                  setActiveStepIndex(activeModule.steps.length);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeStepIndex === activeModule.steps.length
                    ? "bg-[#0d631b] text-white"
                    : "bg-emerald-50 text-[#0d631b] border border-[#0d631b]/30"
                }`}
              >
                Kuis Evaluasi Kilat
              </button>
            </div>

            {activeStepIndex < activeModule.steps.length ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-black text-gray-900">
                    {activeModule.steps[activeStepIndex].title}
                  </h3>
                  <button
                    onClick={handlePlayStepAudio}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d9e6da] hover:bg-[#cbffc2] text-[#0d631b] text-xs font-bold shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Dengar Suara</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {activeModule.steps[activeStepIndex].content.map((par, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs sm:text-sm text-gray-800 leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#cbffc2] text-[#0d631b] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{par}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Tips Lapangan:</span>
                    <p>{activeModule.steps[activeStepIndex].tips}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Checklist Praktik Warga:
                  </span>
                  {activeModule.steps[activeStepIndex].checklist.map((chk, ci) => (
                    <label
                      key={ci}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs sm:text-sm text-gray-800 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#0d631b] rounded focus:ring-[#0d631b]"
                      />
                      <span>{chk}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <button
                    onClick={() => {
                      if (activeStepIndex > 0) setActiveStepIndex(activeStepIndex - 1);
                    }}
                    disabled={activeStepIndex === 0}
                    className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold disabled:opacity-40"
                  >
                    Sebelumnya
                  </button>

                  <button
                    onClick={() => setActiveStepIndex(activeStepIndex + 1)}
                    className="px-5 py-2.5 rounded-xl bg-[#0d631b] hover:bg-[#2e7d32] text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Langkah Lanjutan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#0d631b] uppercase tracking-wider">
                    Uji Pemahaman Kilat
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-gray-900">
                    {activeModule.quiz.question}
                  </h3>
                </div>

                <div className="flex flex-col gap-2.5">
                  {activeModule.quiz.options.map((opt, oi) => {
                    const isSelected = quizSelectedOption === oi;
                    let style = "border-gray-200 hover:border-gray-300";

                    if (quizSubmitted) {
                      if (oi === activeModule.quiz.correctIndex) {
                        style = "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400";
                      } else if (isSelected) {
                        style = "border-red-500 bg-red-50 ring-2 ring-red-400";
                      }
                    } else if (isSelected) {
                      style = "border-[#0d631b] bg-[#d9e6da]/40";
                    }

                    return (
                      <button
                        key={oi}
                        onClick={() => {
                          if (!quizSubmitted) setQuizSelectedOption(oi);
                        }}
                        className={`p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950">
                    <span className="font-bold block mb-1">Penjelasan Ilmiah:</span>
                    <p>{activeModule.quiz.explanation}</p>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <button
                    onClick={() => setActiveStepIndex(activeModule.steps.length - 1)}
                    className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
                  >
                    Kembali ke Materi
                  </button>

                  {!quizSubmitted ? (
                    <button
                      onClick={() => setQuizSubmitted(true)}
                      disabled={quizSelectedOption === null}
                      className="px-5 py-2.5 rounded-xl bg-[#0d631b] text-white text-xs font-bold disabled:opacity-40"
                    >
                      Periksa Kuis
                    </button>
                  ) : (
                    <button
                      onClick={handleCompleteCurrentModule}
                      className="px-5 py-2.5 rounded-xl bg-[#0d631b] hover:bg-[#2e7d32] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Selesaikan & Simpan Rapor</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
