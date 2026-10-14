"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Volume2,
  VolumeX,
  User,
  LayoutGrid,
  CheckCircle2,
  BookOpen,
  Award,
  Sparkles,
  Search,
  ChevronDown,
} from "lucide-react";
import { ROLES_DATA } from "@/lib/data";
import { UserRole } from "@/lib/types";
import { stopSpeaking } from "@/lib/speech";

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  activeRole: UserRole;
  onOpenRoleModal: () => void;
  isAudioPlaying: boolean;
  onToggleMuteAll: () => void;
}

export default function Navbar({
  currentTab,
  onSelectTab,
  activeRole,
  onOpenRoleModal,
  isAudioPlaying,
  onToggleMuteAll,
}: NavbarProps) {
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const role = ROLES_DATA[activeRole] || ROLES_DATA.kader;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const coreNavItems = [
    { id: "beranda", label: "Beranda", icon: LayoutGrid },
    { id: "asesmen", label: "Asesmen", icon: CheckCircle2 },
    { id: "modul", label: "Modul", icon: BookOpen },
    { id: "evaluasi", label: "Evaluasi", icon: Award },
    { id: "konten", label: "Bank Konten", icon: Sparkles },
    { id: "cekhoaks", label: "Cek Hoaks", icon: Search },
  ];

  const handleNavClick = (id: string) => {
    stopSpeaking();
    onSelectTab(id);
    setMoreDropdownOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(13,99,27,0.06)] border-b border-gray-100 no-print">
        <div className="h-16 sm:h-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div
            onClick={() => handleNavClick("beranda")}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer group"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 bg-white rounded-xl p-0.5 shadow-xs border border-gray-100 group-hover:scale-105 transition-transform">
              <Image
                src="/logo-bina-cakap.png"
                alt="Logo BINA CAKAP"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-bold text-sm sm:text-base lg:text-lg text-[#0d631b] tracking-tight leading-none group-hover:text-[#2e7d32] transition-colors">
                BINA CAKAP Digital
              </span>
              <span className="text-[10px] sm:text-xs text-[#556158] leading-tight mt-0.5 sm:mt-1">
                UBK • Desa Cikawao
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 p-1 bg-[#f3f3f3] rounded-xl text-xs sm:text-sm font-semibold shrink-0">
            {coreNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#d9e6da] text-[#0d631b] shadow-xs"
                      : "text-[#40493d] hover:text-[#1a1c1c] hover:bg-white/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onToggleMuteAll}
              title={isAudioPlaying ? "Hentikan Suara" : "Bantuan Suara Ramah Lansia"}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                isAudioPlaying
                  ? "bg-amber-500 text-white animate-bounce shadow-md"
                  : "bg-[#eeeeee] hover:bg-[#d9e6da] text-[#0d631b]"
              }`}
            >
              {isAudioPlaying ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            <button
              onClick={onOpenRoleModal}
              title="Ganti Profil Pengguna"
              className="flex items-center gap-2 pl-1 sm:pl-1.5 pr-1.5 sm:pr-2 py-1 rounded-xl hover:bg-[#f3f3f3] transition-colors shrink-0"
            >
              <div className="hidden 2xl:flex flex-col text-right leading-tight whitespace-nowrap">
                <span className="text-xs font-bold text-[#1a1c1c] truncate max-w-[110px]">
                  {role.name}
                </span>
                <span className="text-[10px] text-[#556158] truncate max-w-[110px]">
                  {role.title}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#0d631b] text-white flex items-center justify-center shrink-0 shadow-xs ring-2 ring-emerald-600/20">
                <User className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-1 py-1.5 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] flex items-center justify-around no-print">
        {coreNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all ${
                isActive
                  ? "text-[#0d631b] font-bold scale-105"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] leading-tight whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
