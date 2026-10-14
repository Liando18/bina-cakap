"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Award,
  CheckCircle2,
  Printer,
  Sparkles,
  Volume2,
  FileBadge,
  ShieldCheck,
  Building,
  GraduationCap,
  MapPin,
  Calendar,
  Share2,
} from "lucide-react";
import { ROLES_DATA, VILLAGE_STATISTICS } from "@/lib/data";
import { UserRole } from "@/lib/types";
import { speakText } from "@/lib/speech";

interface EvaluasiSectionProps {
  activeRole: UserRole;
  assessmentScore?: number;
}

export default function EvaluasiSection({
  activeRole,
  assessmentScore = 86,
}: EvaluasiSectionProps) {
  const role = ROLES_DATA[activeRole] || ROLES_DATA.kader;
  const [recipientName, setRecipientName] = useState(role.name);
  const [recipientRw, setRecipientRw] = useState(role.subtext);

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    speakText(
      `Selamat kepada ${recipientName}! Anda dinyatakan lulus sebagai Agen BINA CAKAP Digital Desa Cikawao dengan predikat Istimewa.`
    );
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-2">
      <div className="no-print mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-sm">
        <div>
          <span className="text-xs font-bold text-[#0d631b] uppercase tracking-wider block">
            Rapor Kecakapan Digital Warga
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
            Evaluasi Mandiri & Sertifikasi Agen
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Pengukuran baseline 5 pilar kecakapan dan penerbitan piagam pengukuhan kader desa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCelebrate}
            className="px-4 py-2.5 rounded-xl bg-[#cbffc2] hover:bg-[#a3f69c] text-[#002204] font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#0d631b]" />
            <span>Rayakan Kelulusan</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-[#0d631b] hover:bg-[#2e7d32] text-white font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Piagam</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8 no-print">
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200/90 shadow-sm flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d9e6da] text-[#0d631b] text-xs font-bold">
                <FileBadge className="w-3.5 h-3.5" />
                Rapor Kelulusan Digital
              </span>
              <span className="text-xs text-gray-500 font-medium">Tahun 2026</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#cbffc2] border border-[#0d631b]/20 flex items-center justify-center text-[#0d631b] shadow-xs shrink-0">
                <GraduationCap className="w-9 h-9" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-black text-gray-900 truncate">
                  {recipientName}
                </h2>
                <p className="text-xs text-gray-600 line-clamp-1">{recipientRw}</p>
                <div className="flex items-center gap-1 text-xs text-[#0d631b] font-semibold mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kec. Pacet, Kab. Bandung</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100 flex flex-col justify-center">
                <span className="text-xs text-gray-500 font-medium">
                  Indeks Literasi
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-black text-[#0d631b]">
                    {assessmentScore}
                  </span>
                  <span className="text-xs text-gray-400 font-bold">/ 100</span>
                </div>
                <span className="text-[11px] text-[#0d631b] font-bold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Tingkat Mandiri
                </span>
              </div>

              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100 flex flex-col justify-center">
                <span className="text-xs text-gray-500 font-medium">
                  Penghargaan
                </span>
                <span className="text-xs font-black text-gray-900 leading-tight mt-1">
                  Pelopor Digital Desa Cikawao
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5">
                  PPM Mandiri UBK
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-xs text-gray-800 leading-relaxed">
              Peserta berhasil melampaui batas standar kecakapan digital dengan predikat <strong className="text-[#0d631b]">Istimewa</strong>. Berhak dikukuhkan menjadi Agen BINA CAKAP keberlanjutan.
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-2">
            <label className="text-xs font-bold text-gray-700 block">
              Ubah Nama untuk Piagam:
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d631b]"
            />
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200/90 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-900">
                Penguasaan 5 Dimensi Kecakapan
              </h2>
              <span className="text-xs text-gray-500">
                Berdasarkan indikator capaian Tahun 1 Proposal PPM
              </span>
            </div>
            <button
              onClick={() =>
                speakText(
                  "Rincian 5 dimensi kecakapan: Cakap Informasi 90 persen, Cakap Aman 88 persen, Cakap Etika 85 persen, Cakap Budaya 82 persen, Cakap Berkarya 80 persen."
                )
              }
              className="w-8 h-8 rounded-full bg-[#d9e6da] hover:bg-[#cbffc2] text-[#0d631b] flex items-center justify-center shrink-0"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {VILLAGE_STATISTICS.pillars.map((pillar) => (
              <div key={pillar.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-800">{pillar.name}</span>
                  <span className="text-[#0d631b]">
                    {pillar.score}% • {pillar.status}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2e7d32] to-[#0d631b] rounded-full transition-all duration-700"
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 mt-2">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
              Rekomendasi Tindak Lanjut Program:
            </span>
            <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
              <li>Mendampingi minimal 3 keluarga lansia dalam verifikasi kabar di grup WhatsApp RT.</li>
              <li>Menerapkan foto produk berkala dengan pencahayaan jendela untuk UMKM RW binaan.</li>
              <li>Menghadiri forum evaluasi rutin Tim PPM Universitas Bhakti Kencana di Balai Desa.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border-4 border-[#0d631b]/30 shadow-xl relative overflow-hidden my-6">
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-[#0d631b] via-[#2e7d32] to-[#0d631b]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#0d631b] via-[#2e7d32] to-[#0d631b]"></div>

        <div className="flex flex-col items-center text-center space-y-5 sm:space-y-6 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <Image
                src="/logo-bina-cakap.png"
                alt="Logo BINA CAKAP"
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block h-10 w-px bg-gray-300"></div>
            <div className="text-center sm:text-left">
              <span className="text-xs font-black uppercase text-[#0d631b] tracking-wider block">
                Universitas Bhakti Kencana
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-gray-700 block">
                Pemerintah Desa Cikawao • Kab. Bandung
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Surat Tanda Pengukuhan
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0d631b] tracking-tight">
              PIAGAM AGEN BINA CAKAP
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Nomor Registrasi: 04.02.00/PPM-UBK/CKW/2026
            </p>
          </div>

          <p className="text-xs sm:text-sm text-gray-600">
            Diberikan sebagai bentuk pengakuan kompetensi dan pengabdian kepada:
          </p>

          <div className="w-full py-2 border-b-2 border-gray-300">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-wide uppercase">
              {recipientName}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#0d631b] mt-0.5">
              {recipientRw}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-xl">
            Telah menyelesaikan seluruh rangkaian pelatihan, asesmen simulasi, dan praktik mandiri dalam program <strong>BINA CAKAP DESA CIKAWAO: Penguatan Kader, Keluarga, Remaja, dan Pelaku Usaha Melalui Etika, Budaya, dan Kecakapan Digital</strong> yang diselenggarakan oleh LPPM / DRPM Universitas Bhakti Kencana bekerjasama dengan Pemerintah Desa Cikawao.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full pt-6 border-t border-gray-200 text-center">
            <div className="space-y-1">
              <span className="text-[11px] text-gray-500 block">Bandung, 2026</span>
              <div className="h-12 flex items-center justify-center">
                <span className="text-xs font-serif italic text-gray-400">Ttd Digital</span>
              </div>
              <span className="text-xs font-bold text-gray-900 block">
                Nadia Ushfuri Amini, M.I.Kom.
              </span>
              <span className="text-[10px] text-gray-500 block">Ketua Tim Pengusul UBK</span>
            </div>

            <div className="hidden sm:flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#0d631b] p-1 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#cbffc2]/50 flex items-center justify-center text-[#0d631b]">
                  <Award className="w-8 h-8" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#0d631b] mt-1">CAP RESMI PENGMAS</span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-gray-500 block">Mengetahui,</span>
              <div className="h-12 flex items-center justify-center">
                <span className="text-xs font-serif italic text-gray-400">Ttd Digital</span>
              </div>
              <span className="text-xs font-bold text-gray-900 block">
                Kepala Desa Cikawao
              </span>
              <span className="text-[10px] text-gray-500 block">Pemerintah Desa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
