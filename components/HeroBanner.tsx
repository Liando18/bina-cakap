"use client";

import React from "react";
import {
  Volume2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ArrowLeftRight,
  Compass,
  Clock,
  UserCheck,
  BadgeCheck,
  Users2,
  ShieldCheck,
} from "lucide-react";
import { ROLES_DATA } from "@/lib/data";
import { UserRole } from "@/lib/types";
import { speakText } from "@/lib/speech";

interface HeroBannerProps {
  activeRole: UserRole;
  onOpenRoleModal: () => void;
  onStartAssessment: () => void;
  onOpenModules: () => void;
}

export default function HeroBanner({
  activeRole,
  onOpenRoleModal,
  onStartAssessment,
  onOpenModules,
}: HeroBannerProps) {
  const role = ROLES_DATA[activeRole] || ROLES_DATA.kader;

  const handlePlayGreeting = () => {
    const greeting = `Sampurasun, selamat datang ${role.name}. Anda terdaftar sebagai ${role.title} di platform BINA CAKAP Digital Desa Cikawao, program pengabdian masyarakat Universitas Bhakti Kencana. Mari kita mulai penguatan literasi dan etika digital hari ini.`;
    speakText(greeting);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-6 items-stretch">
      <div className="lg:col-span-5 flex flex-col justify-between bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d9e6da] text-[#0d631b] text-xs font-semibold whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5" />
              {role.badge}
            </span>
            <button
              onClick={onOpenRoleModal}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eeeeee] hover:bg-[#e2e2e2] text-[#40493d] text-xs font-medium transition-colors whitespace-nowrap"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Ganti Profil</span>
            </button>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#cbffc2] text-[#002204] flex items-center justify-center shrink-0 shadow-xs">
              <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#0d631b]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-[#1a1c1c] truncate">
                  Sampurasun, {role.name}
                </h1>
                <button
                  onClick={handlePlayGreeting}
                  title="Dengarkan Suara Salam"
                  className="w-7 h-7 rounded-full bg-[#f3f3f3] hover:bg-[#d9e6da] text-[#0d631b] flex items-center justify-center shrink-0 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[#556158] mt-0.5 leading-snug line-clamp-2">
                {role.subtext}
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#f3f3f3] rounded-xl flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#0d631b] shadow-xs shrink-0">
              <BadgeCheck className="w-5 h-5 text-[#0d631b]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-[#556158]">Status Pelatihan Kader</p>
              <p className="text-xs sm:text-sm font-semibold text-[#1a1c1c] truncate">
                {role.level}
              </p>
            </div>
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#0d631b] shrink-0" />
          </div>
        </div>

        <div className="pt-3.5 mt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#556158]">
          <span className="flex items-center gap-1 font-medium text-[11px] sm:text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0d631b]" />
            Data Tersinkronisasi
          </span>
          <span className="text-gray-400 text-[11px]">Update: Hari ini 09:15</span>
        </div>
      </div>

      <div className="lg:col-span-7 bg-gradient-to-br from-[#2e7d32] to-[#0d631b] text-white p-5 sm:p-7 rounded-2xl shadow-md flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 pointer-events-none blur-2xl"></div>

        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#cbffc2]" />
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">
                Peta Kecakapan Digital Warga
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-[11px] sm:text-xs font-medium text-white whitespace-nowrap">
              <Clock className="w-3 h-3" />
              ± 3–5 Menit
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#cbffc2] max-w-lg leading-relaxed">
            Cek kemampuan pemakaian handphone, kenali potensi penipuan online, dan dapatkan rekomendasi materi ringkas sesuai kebutuhan sehari-hari.
          </p>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 my-3.5">
            <div
              onClick={onStartAssessment}
              className="bg-white/15 hover:bg-white/25 cursor-pointer rounded-xl p-2 sm:p-3 backdrop-blur-xs flex flex-col items-center text-center transition-all border border-white/10"
            >
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#a3f69c] text-[#002204] text-[10px] sm:text-xs font-bold flex items-center justify-center mb-1">
                1
              </span>
              <span className="text-xs sm:text-sm font-semibold leading-tight text-white">
                Asesmen
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#cbffc2] mt-0.5 leading-none">
                Uji 5 Soal
              </span>
            </div>

            <div
              onClick={onOpenModules}
              className="bg-white/10 hover:bg-white/20 cursor-pointer rounded-xl p-2 sm:p-3 backdrop-blur-xs flex flex-col items-center text-center transition-all border border-white/10"
            >
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/30 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center mb-1">
                2
              </span>
              <span className="text-xs sm:text-sm font-semibold leading-tight text-white">
                Edukasi
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#cbffc2] mt-0.5 leading-none">
                Modul Ringkas
              </span>
            </div>

            <div className="bg-white/10 rounded-xl p-2 sm:p-3 backdrop-blur-xs flex flex-col items-center text-center border border-white/10">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/30 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center mb-1">
                3
              </span>
              <span className="text-xs sm:text-sm font-semibold leading-tight text-white">
                Evaluasi
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#cbffc2] mt-0.5 leading-none">
                Tanda Cakap
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#cbffc2] font-medium">
            <Users2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Didampingi kader / mahasiswa UBK</span>
          </div>

          <button
            onClick={onStartAssessment}
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-white text-[#0d631b] hover:bg-[#f9f9f9] font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
          >
            <span>Mulai Asesmen Cakap Digital</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
