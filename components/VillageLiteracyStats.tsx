"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Award,
  Users,
  ShieldCheck,
  Volume2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { VILLAGE_STATISTICS } from "@/lib/data";
import { speakText } from "@/lib/speech";

export default function VillageLiteracyStats() {
  const [showAllRw, setShowAllRw] = useState(false);

  const handleReadStats = () => {
    const text = `Capaian Literasi Digital Desa Cikawao saat ini mencapai 84 persen dari target 90 persen. Sebanyak 312 warga telah lulus uji kompetensi, 48 kader posyandu dan PKK telah terlatih, dan 24 Agen BINA CAKAP siap mendampingi masyarakat di setiap RW.`;
    speakText(text);
  };

  const displayedRw = showAllRw
    ? VILLAGE_STATISTICS.rwData
    : VILLAGE_STATISTICS.rwData.slice(0, 4);

  return (
    <section className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-200/90 shadow-sm transition-all hover:shadow-md mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0d631b]">
            Monitoring Capaian IPTEKS PPM UBK
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
            <span>Indeks Kecakapan Digital Desa Cikawao</span>
            <button
              onClick={handleReadStats}
              title="Dengarkan Uraian Statistik"
              className="w-7 h-7 rounded-full bg-[#d9e6da] hover:bg-[#cbffc2] text-[#0d631b] flex items-center justify-center transition-transform active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Kecamatan Pacet, Kabupaten Bandung • Baseline & Target Tahun 1 (2026/2027)
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#d9e6da]/50 px-3.5 py-1.5 rounded-2xl border border-[#0d631b]/20">
          <TrendingUp className="w-4 h-4 text-[#0d631b]" />
          <span className="text-xs font-bold text-[#0d631b]">
            Target 90% Tercapai di RW 01
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 flex flex-col items-center sm:flex-row sm:items-center gap-6 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-gray-50 border border-emerald-100/80">
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.6"
              />
              <path
                className="text-[#0d631b] transition-all duration-1000 ease-out"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="84, 100"
                strokeLinecap="round"
                strokeWidth="3.6"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-[#0d631b] leading-none">
                84%
              </span>
              <span className="text-[11px] font-bold text-gray-500 mt-1">
                Target 90%
              </span>
            </div>
          </div>

          <div className="flex flex-col text-center sm:text-left">
            <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
              <span className="text-3xl font-black text-[#0d631b]">312</span>
              <span className="text-sm font-bold text-gray-800">Warga Lulus</span>
            </div>
            <p className="text-xs text-gray-600 mt-1 leading-snug">
              Telah menyelesaikan asesmen pemetaan kasus nyata penipuan siber dan etika bermedsos.
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs font-semibold text-gray-700">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#0d631b]" /> 48 Kader
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0d631b]" /> 24 Agen
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-bold text-gray-700">
            <span>Kemajuan per Rukun Warga (RW)</span>
            <button
              onClick={() => setShowAllRw(!showAllRw)}
              className="text-[#0d631b] hover:underline flex items-center gap-0.5"
            >
              <span>{showAllRw ? "Sembunyikan" : "Lihat Semua RW"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {displayedRw.map((rwItem) => (
              <div key={rwItem.rw} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-800">{rwItem.rw}</span>
                  <span className="text-[#0d631b] font-bold">
                    {rwItem.completionRate}% • {rwItem.participants} Peserta
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2e7d32] to-[#0d631b] rounded-full transition-all duration-700"
                    style={{ width: `${rwItem.completionRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
