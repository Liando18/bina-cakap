"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import AsesmenSection from "@/components/AsesmenSection";
import ModulSection from "@/components/ModulSection";
import EvaluasiSection from "@/components/EvaluasiSection";
import BankKontenSection from "@/components/BankKontenSection";
import CekHoaksSection from "@/components/CekHoaksSection";
import RoleSwitcherModal from "@/components/RoleSwitcherModal";
import Footer from "@/components/Footer";
import {
  HeroSkeleton,
  StatCardSkeleton,
  ModuleCardSkeleton,
  AssessmentSkeleton,
  ProfileReportSkeleton,
  ContentCardSkeleton,
} from "@/components/SkeletonLoader";
import { UserRole } from "@/lib/types";
import { ROLES_DATA, VILLAGE_STATISTICS } from "@/lib/data";
import { speakText, stopSpeaking } from "@/lib/speech";
import {
  BookOpen,
  Volume2,
  Clock,
  CheckCircle2,
  Play,
  ArrowRight,
  ShieldCheck,
  Search,
  School,
  MapPin,
  MessageSquare,
  Lightbulb,
  AlertTriangle,
  ChevronRight,
  Check,
} from "lucide-react";

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState<string>("beranda");
  const [activeRole, setActiveRole] = useState<UserRole>("kader");
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isSeniorMode, setIsSeniorMode] = useState(false);
  const [isDataSaver, setIsDataSaver] = useState(false);
  const [isSimulateLoading, setIsSimulateLoading] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(88);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const interval = setInterval(() => {
      setIsAudioPlaying(window.speechSynthesis.speaking);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleSelectTab = (tab: string) => {
    stopSpeaking();
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleMuteAll = () => {
    stopSpeaking();
    setIsAudioPlaying(false);
  };

  const handleCompleteAssessment = (score: number) => {
    setAssessmentScore(score);
    setCurrentTab("evaluasi");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const role = ROLES_DATA[activeRole] || ROLES_DATA.kader;
  const isLoading = initialLoading || isSimulateLoading;

  const berandaModules = [
    {
      id: 1,
      tag: "01 • Cakap Informasi",
      time: "3 Mnt",
      title: "Cek Hoaks WA Grup & Kabar Rantai",
      desc: "Cara membedakan info bansos asli dan pesan forwarded palsu yang menyesatkan.",
      progress: 100,
      status: "Selesai",
      statusColor: "text-[#0d631b]",
      iconBg: "bg-[#d9e6da] text-[#0d631b]",
    },
    {
      id: 2,
      tag: "02 • Cakap Beretika",
      time: "4 Mnt",
      title: "Privasi & Santun Berkomunikasi Online",
      desc: "Jangan unggah KTP dan foto KK ke medsos. Tata krama kirim pesan ke aparat desa.",
      progress: 60,
      status: "Sedang Berjalan",
      statusColor: "text-[#556158]",
      iconBg: "bg-[#f3f3f3] text-[#556158]",
    },
    {
      id: 3,
      tag: "03 • Cakap Berbudaya",
      time: "5 Mnt",
      title: "Guyub Kearifan Lokal Desa Cikawao",
      desc: "Memelihara budaya gotong royong dan silaturahmi Sunda di era serba WhatsApp.",
      progress: 0,
      status: "Belum Mulai",
      statusColor: "text-gray-400",
      iconBg: "bg-[#f3f3f3] text-gray-500",
    },
    {
      id: 4,
      tag: "04 • Cakap Berkarya UMKM",
      time: "6 Mnt",
      title: "Foto Produk HP Desa & Jualan WA Story",
      desc: "Memanfaatkan cahaya jendela untuk foto olahan singkong, kerajinan, dan madu lokal.",
      progress: 0,
      status: "Belum Mulai",
      statusColor: "text-gray-400",
      iconBg: "bg-[#f3f3f3] text-gray-500",
    },
    {
      id: 5,
      tag: "05 • Cakap Aman & Sehat",
      time: "5 Mnt",
      title: "Cegah File APK Penipuan & Atur Mata Sehat",
      desc: "Trik mengenali undangan nikah .APK kurir paket dan istirahat mata 20-20-20.",
      progress: 0,
      status: "Prioritas Pekan Ini",
      statusColor: "text-[#ba1a1a]",
      iconBg: "bg-[#ffdad6] text-[#ba1a1a]",
      isPriority: true,
    },
  ];

  return (
    <div
      className={`min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col transition-all ${
        isSeniorMode ? "text-lg" : "text-base"
      }`}
    >
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        activeRole={activeRole}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleMuteAll={handleToggleMuteAll}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {isLoading ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            {currentTab === "beranda" && (
              <>
                <HeroSkeleton />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 space-y-4">
                    <ModuleCardSkeleton />
                    <ModuleCardSkeleton />
                  </div>
                  <div className="lg:col-span-5 space-y-4">
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                  </div>
                </div>
              </>
            )}
            {currentTab === "asesmen" && <AssessmentSkeleton />}
            {currentTab === "modul" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModuleCardSkeleton />
                <ModuleCardSkeleton />
                <ModuleCardSkeleton />
                <ModuleCardSkeleton />
              </div>
            )}
            {currentTab === "evaluasi" && <ProfileReportSkeleton />}
            {currentTab === "konten" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ContentCardSkeleton />
                <ContentCardSkeleton />
                <ContentCardSkeleton />
              </div>
            )}
            {currentTab === "cekhoaks" && <AssessmentSkeleton />}
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            {currentTab === "beranda" && (
              <>
                <HeroBanner
                  activeRole={activeRole}
                  onOpenRoleModal={() => setIsRoleModalOpen(true)}
                  onStartAssessment={() => handleSelectTab("asesmen")}
                  onOpenModules={() => handleSelectTab("modul")}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <section className="lg:col-span-7 flex flex-col gap-4">
                    <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#d9e6da] flex items-center justify-center text-[#0d631b]">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-[#1a1c1c]">
                            Modul Belajar Mandiri
                          </h2>
                          <p className="text-xs text-[#556158]">
                            Materi praktis hemat kuota untuk warga Desa Cikawao
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#acf4a4] text-[#002203] text-xs font-bold whitespace-nowrap">
                        5 Topik Praktis
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {berandaModules.map((item) => (
                        <article
                          key={item.id}
                          onClick={() => handleSelectTab("modul")}
                          className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all hover:shadow-md cursor-pointer flex items-start gap-4 group ${
                            item.isPriority
                              ? "border-[#ba1a1a]/40 ring-1 ring-[#ba1a1a]/20 shadow-xs"
                              : "border-gray-200/80 shadow-xs"
                          }`}
                        >
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${item.iconBg}`}
                          >
                            <BookOpen className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span
                                className={`text-xs font-bold ${
                                  item.isPriority ? "text-[#ba1a1a]" : "text-[#0d631b]"
                                }`}
                              >
                                {item.tag}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-[#556158]">
                                <Clock className="w-3.5 h-3.5" /> {item.time}
                              </span>
                            </div>

                            <h3 className="text-sm sm:text-base font-bold text-[#1a1c1c] group-hover:text-[#0d631b] transition-colors leading-snug">
                              {item.title}
                            </h3>

                            <p className="text-xs text-[#40493d] line-clamp-1 mt-0.5">
                              {item.desc}
                            </p>

                            <div className="mt-3 flex items-center gap-3">
                              <div className="flex-1 h-2 rounded-full bg-[#f3f3f3] overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    item.progress > 0 ? "bg-[#0d631b]" : "bg-gray-200"
                                  }`}
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                              <span
                                className={`text-xs font-semibold flex items-center gap-0.5 whitespace-nowrap ${item.statusColor}`}
                              >
                                {item.progress === 100 && <Check className="w-3.5 h-3.5" />}
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="lg:col-span-5 flex flex-col gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xs font-semibold text-[#556158]">
                            Capaian Desa
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-[#1a1c1c]">
                            Literasi Digital Cikawao
                          </h3>
                        </div>
                        <ShieldCheck className="w-6 h-6 text-[#0d631b]" />
                      </div>

                      <div className="flex items-center gap-5 my-2">
                        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-gray-200"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3.8"
                            />
                            <path
                              className="text-[#0d631b] transition-all duration-1000 ease-out"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeDasharray="84, 100"
                              strokeLinecap="round"
                              strokeWidth="3.8"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-black text-[#0d631b] leading-none">
                              84%
                            </span>
                            <span className="text-[10px] text-[#556158] mt-0.5">
                              Target 90%
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col justify-center">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-[#0d631b]">
                              312
                            </span>
                            <span className="text-xs font-bold text-[#1a1c1c]">
                              Warga Lulus
                            </span>
                          </div>
                          <p className="text-xs text-[#40493d] leading-tight mt-0.5">
                            Telah menyelesaikan asesmen & memahami dasar keamanan siber desa.
                          </p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className="w-2 h-2 rounded-full bg-[#0d631b]"></span>
                            <span className="text-xs font-medium text-[#556158]">
                              Target RW 01: 94% tuntas
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between text-xs text-[#556158]">
                        <span>Data Posko PPM UBK</span>
                        <button
                          onClick={() => handleSelectTab("evaluasi")}
                          className="text-[#0d631b] font-semibold hover:underline flex items-center gap-0.5"
                        >
                          <span>Lihat Statistik RW</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#d9e6da]/50 p-5 rounded-2xl border border-[#0d631b]/20 shadow-xs">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-xs text-[#0d631b] font-bold">
                          <Lightbulb className="w-4 h-4" /> Rekomendasi Pekan Ini
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white text-[#556158] text-[11px] font-medium">
                          Untuk {role.name}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#1a1c1c] leading-snug">
                        Simulasi: Kenali Modus APK Bansos Palsu
                      </h4>
                      <p className="text-xs text-[#40493d] mt-1 leading-relaxed">
                        Uji ketelitian membedakan tautan resmi Kemensos dengan file tiruan yang sering dikirim lewat grup pengajian.
                      </p>

                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={() => handleSelectTab("asesmen")}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-[#0d631b] text-white text-xs font-bold hover:bg-[#2e7d32] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Buka Latihan Interaktif</span>
                        </button>
                        <button
                          onClick={() =>
                            speakText(
                              "Rekomendasi Pekan Ini: Simulasi Kenali Modus APK Bansos Palsu. Uji ketelitian membedakan tautan resmi Kemensos dengan file tiruan."
                            )
                          }
                          className="w-10 h-10 rounded-xl bg-white text-[#0d631b] hover:bg-[#cbffc2] flex items-center justify-center shrink-0 shadow-xs transition-colors"
                          title="Dengarkan Penjelasan"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#cbffc2] text-[#002204] flex items-center justify-center shrink-0">
                          <School className="w-6 h-6 text-[#0d631b]" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-[#1a1c1c] truncate">
                              Tim Pendamping PPM UBK
                            </h4>
                            <span
                              className="w-2 h-2 rounded-full bg-[#0d631b] animate-pulse"
                              title="Posko Siaga"
                            ></span>
                          </div>
                          <p className="text-xs text-[#556158] leading-tight mt-0.5">
                            Universitas Bhakti Kencana di Posko Balai Desa Cikawao
                          </p>
                        </div>
                      </div>

                      <div className="my-3 p-3 bg-[#f3f3f3] rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-[#1a1c1c]">
                          <MapPin className="w-4 h-4 text-[#0d631b]" />
                          <span>Ruang Pelayanan Balai Desa</span>
                        </div>
                        <span className="font-semibold text-[#0d631b]">
                          08.00 - 15.00 WIB
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleSelectTab("cekhoaks")}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-[#eeeeee] text-[#1a1c1c] text-xs font-semibold hover:bg-[#d9e6da] hover:text-[#0d631b] transition-colors flex items-center justify-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Tanya Pendamping / Cek Fakta</span>
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              </>
            )}

            {currentTab === "asesmen" && (
              <AsesmenSection
                activeRole={activeRole}
                onCompleteToEvaluation={handleCompleteAssessment}
              />
            )}

            {currentTab === "modul" && (
              <ModulSection onStartAssessment={() => handleSelectTab("asesmen")} />
            )}

            {currentTab === "evaluasi" && (
              <EvaluasiSection
                activeRole={activeRole}
                assessmentScore={assessmentScore}
              />
            )}

            {currentTab === "konten" && <BankKontenSection />}

            {currentTab === "cekhoaks" && <CekHoaksSection />}
          </div>
        )}
      </main>

      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        activeRole={activeRole}
        onSelectRole={(newRole) => setActiveRole(newRole)}
      />

      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
