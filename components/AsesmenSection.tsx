"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  ShieldAlert,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Info,
  Award,
  AlertTriangle,
  Download,
  Users,
} from "lucide-react";
import { ASSESSMENT_QUESTIONS, ROLES_DATA } from "@/lib/data";
import { UserRole } from "@/lib/types";
import { speakText, stopSpeaking } from "@/lib/speech";

interface AsesmenSectionProps {
  activeRole: UserRole;
  onCompleteToEvaluation: (score: number) => void;
}

export default function AsesmenSection({
  activeRole,
  onCompleteToEvaluation,
}: AsesmenSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [scoreList, setScoreList] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex];
  const role = ROLES_DATA[activeRole] || ROLES_DATA.kader;

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;

    const chosenOption = currentQuestion.options.find(
      (opt) => opt.id === selectedOptionId
    );
    const isCorrect = chosenOption ? chosenOption.isCorrect : false;

    setIsAnswerSubmitted(true);
    setScoreList([...scoreList, isCorrect]);

    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }

    const narrationFeedback = isCorrect
      ? "Jawaban Anda Benar. " + (chosenOption?.explanation || "")
      : "Jawaban Kurang Tepat. " + (chosenOption?.explanation || "");
    speakText(narrationFeedback);
  };

  const handleNextQuestion = () => {
    stopSpeaking();
    if (currentIndex + 1 < ASSESSMENT_QUESTIONS.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      speakText(
        "Selamat! Anda telah menyelesaikan seluruh simulasi asesmen lapangan BINA CAKAP Digital. Hasil evaluasi siap ditinjau."
      );
    }
  };

  const handleRestart = () => {
    stopSpeaking();
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScoreList([]);
    setIsFinished(false);
  };

  const handlePlayQuestionAudio = () => {
    const textToSpeak = `${currentQuestion.scenarioTitle}. ${currentQuestion.audioNarrative}. Pertanyaan: ${currentQuestion.questionText}`;
    speakText(textToSpeak);
  };

  const totalCorrect = scoreList.filter(Boolean).length;
  const calculatedScore = Math.round(
    (totalCorrect / ASSESSMENT_QUESTIONS.length) * 100
  );

  if (isFinished) {
    return (
      <div className="w-full max-w-3xl mx-auto py-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-md text-center flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#cbffc2] text-[#0d631b] flex items-center justify-center shadow-sm">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0d631b] bg-[#d9e6da] px-3.5 py-1 rounded-full">
              Asesmen Selesai
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Hasil Simulasi Asesmen Desa
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Terima kasih {role.name}. Anda telah menguji kepekaan terhadap 5 pilar kecakapan digital di Desa Cikawao.
            </p>
          </div>

          <div className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-gray-50 border border-emerald-100 w-full max-w-md justify-center">
            <div className="text-center">
              <span className="text-xs text-gray-500 font-medium">Skor Asesmen</span>
              <div className="text-4xl sm:text-5xl font-black text-[#0d631b] mt-1">
                {calculatedScore}
              </div>
              <span className="text-xs font-bold text-gray-600">
                {totalCorrect} dari {ASSESSMENT_QUESTIONS.length} Soal Benar
              </span>
            </div>
            <div className="h-12 w-px bg-gray-200"></div>
            <div className="text-left">
              <span className="text-xs text-gray-500 font-medium">Predikat</span>
              <div className="text-lg font-black text-gray-900 mt-0.5">
                {calculatedScore >= 80 ? "Sangat Cakap" : "Perlu Pengayaan"}
              </div>
              <span className="text-xs text-[#0d631b] font-semibold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Layak Modul Lanjutan
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-2">
            <button
              onClick={() => onCompleteToEvaluation(calculatedScore)}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-[#0d631b] hover:bg-[#2e7d32] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span>Lihat Rapor & Piagam</span>
            </button>
            <button
              onClick={handleRestart}
              className="py-3.5 px-6 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Asesmen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedOption = currentQuestion.options.find(
    (opt) => opt.id === selectedOptionId
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-2">
      <div className="w-full bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-sm flex flex-col gap-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d9e6da] text-[#0d631b] text-xs font-bold">
              <Users className="w-3.5 h-3.5" />
              {role.title}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
              Dimensi: {currentQuestion.dimension}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              Kasus #{currentQuestion.id}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <span className="text-lg text-[#0d631b]">
              Soal {currentIndex + 1}
            </span>
            <span className="text-gray-400">/ {ASSESSMENT_QUESTIONS.length}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
              Simulasi Uji Lapangan Warga Pedesaan
            </span>
            <h1 className="text-lg sm:text-xl font-black text-gray-900 mt-0.5">
              {currentQuestion.scenarioTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-56">
            <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-[#0d631b] rounded-full transition-all duration-500"
                style={{
                  width: `${((currentIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs font-bold text-[#0d631b] whitespace-nowrap">
              {Math.round(
                ((currentIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100
              )}
              %
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-gray-800">
                  Skenario Kasus Nyata di Lapangan
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {currentQuestion.scenarioType}
              </span>
            </div>

            <div className="w-full bg-[#efeae2] rounded-2xl p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden border border-[#d1c7b7]/60">
              <div className="text-center my-0.5">
                <span className="px-3 py-1 rounded-md bg-white/90 text-[11px] font-semibold text-gray-600 shadow-xs">
                  Hari Ini • Pesan WhatsApp
                </span>
              </div>

              <div className="flex items-start gap-2.5 max-w-[95%]">
                <div className="w-8 h-8 rounded-full bg-[#075e54] text-white flex items-center justify-center shrink-0 shadow-xs font-bold text-xs">
                  WA
                </div>
                <div className="flex flex-col bg-white rounded-2xl rounded-tl-xs p-4 shadow-sm gap-2 border border-gray-100">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-bold text-[#075e54]">
                      {currentQuestion.senderName}
                    </span>
                    <span className="text-[10px] text-gray-400">10:42</span>
                  </div>
                  {currentQuestion.senderPhone && (
                    <span className="inline-block self-start px-2 py-0.5 rounded bg-gray-100 text-[10px] font-medium text-gray-600">
                      {currentQuestion.senderPhone}
                    </span>
                  )}
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                    {currentQuestion.messageContent}
                  </p>

                  {currentQuestion.fileAttachment && (
                    <div className="w-full rounded-xl bg-red-50 border border-red-200 p-3 flex flex-col gap-1.5 mt-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-gray-900 truncate">
                              {currentQuestion.fileAttachment.name}
                            </span>
                            <span className="text-[10px] text-gray-600">
                              {currentQuestion.fileAttachment.size} •{" "}
                              {currentQuestion.fileAttachment.type}
                            </span>
                          </div>
                        </div>
                        <Download className="w-5 h-5 text-red-600 shrink-0" />
                      </div>
                      {currentQuestion.fileAttachment.warning && (
                        <div className="flex items-center gap-1.5 text-red-700 text-[11px] font-semibold pt-1 border-t border-red-200">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                          <span>{currentQuestion.fileAttachment.warning}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handlePlayQuestionAudio}
              className="w-full py-2.5 px-4 rounded-xl bg-[#d9e6da]/70 hover:bg-[#cbffc2] text-[#0d631b] flex items-center justify-center gap-2 transition-colors text-xs font-bold"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Rekaman Suara Soal (Bahasa Indonesia & Sunda)</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-sm flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Cakupan 5 Pilar BINA CAKAP
            </span>
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              {[
                { name: "Informasi", active: currentQuestion.dimension === "Informasi" },
                { name: "Aman", active: currentQuestion.dimension === "Aman" },
                { name: "Etika", active: currentQuestion.dimension === "Etika" },
                { name: "Budaya", active: currentQuestion.dimension === "Budaya" },
                { name: "Karya", active: currentQuestion.dimension === "Karya" },
              ].map((pilar) => (
                <div
                  key={pilar.name}
                  className={`py-2 px-1 rounded-xl font-bold transition-all ${
                    pilar.active
                      ? "bg-[#0d631b] text-white shadow-xs scale-105"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {pilar.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-sm flex flex-col gap-5">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#0d631b] uppercase tracking-wider">
                Pertanyaan Analisis
              </span>
              <h2 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
                {currentQuestion.questionText}
              </h2>
              <p className="text-xs text-gray-500">
                Pilih opsi paling bijak sesuai etika, keamanan, dan budaya warga Desa Cikawao.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let optionStyle =
                  "border-gray-200 hover:border-gray-300 hover:bg-gray-50";

                if (isAnswerSubmitted) {
                  if (option.isCorrect) {
                    optionStyle = "border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-400";
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = "border-red-500 bg-red-50/80 ring-2 ring-red-400";
                  }
                } else if (isSelected) {
                  optionStyle = "border-[#0d631b] bg-[#d9e6da]/40 ring-2 ring-[#0d631b]/30";
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={isAnswerSubmitted}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 text-left transition-all ${optionStyle}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 transition-colors ${
                        isAnswerSubmitted
                          ? option.isCorrect
                            ? "bg-emerald-600 text-white"
                            : isSelected
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-600"
                          : isSelected
                          ? "bg-[#0d631b] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {option.id}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 leading-relaxed">
                        {option.text}
                      </span>
                    </div>

                    {isAnswerSubmitted && option.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                    )}
                    {isAnswerSubmitted && isSelected && !option.isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswerSubmitted && selectedOption && (
              <div
                className={`p-4 rounded-2xl border flex flex-col gap-1.5 animate-in fade-in duration-300 ${
                  selectedOption.isCorrect
                    ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                    : "bg-amber-50 border-amber-200 text-amber-950"
                }`}
              >
                <div className="flex items-center gap-2">
                  {selectedOption.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  )}
                  <span className="text-xs font-bold uppercase">
                    {selectedOption.isCorrect
                      ? "Pilihan Tepat & Aman!"
                      : "Perlu Lebih Berhati-Hati!"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-gray-800">
                  {selectedOption.explanation}
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs text-gray-500 font-medium text-center sm:text-left">
                {isAnswerSubmitted
                  ? "Jawaban telah dicatat"
                  : selectedOptionId
                  ? "Siap untuk diperiksa"
                  : "Pilih salah satu jawaban"}
              </span>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId}
                  className={`w-full sm:w-auto py-3 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    selectedOptionId
                      ? "bg-[#0d631b] hover:bg-[#2e7d32] text-white shadow-sm"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span>Kirim Jawaban</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-[#0d631b] hover:bg-[#2e7d32] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>
                    {currentIndex + 1 < ASSESSMENT_QUESTIONS.length
                      ? "Soal Selanjutnya"
                      : "Tinjau Hasil Akhir"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
