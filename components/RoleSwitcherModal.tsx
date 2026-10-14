"use client";

import React from "react";
import { X, Check, HeartHandshake, Home, Sparkles, Store } from "lucide-react";
import { ROLES_DATA } from "@/lib/data";
import { UserRole } from "@/lib/types";

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

const roleIcons: Record<string, React.ElementType> = {
  kader: HeartHandshake,
  keluarga: Home,
  remaja: Sparkles,
  umkm: Store,
};

export default function RoleSwitcherModal({
  isOpen,
  onClose,
  activeRole,
  onSelectRole,
}: RoleSwitcherModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 sm:gap-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0d631b]">
              4 Kelompok Sasaran PPM UBK
            </span>
            <h2 className="text-xl font-extrabold text-gray-900">
              Pilih Profil Pengguna
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Setiap kelompok sasaran memiliki fokus asesmen, rekomendasi modul praktis, dan format evaluasi yang disesuaikan dengan kebutuhan di Desa Cikawao.
        </p>

        <div className="flex flex-col gap-3">
          {Object.values(ROLES_DATA).map((role) => {
            const IconComponent = roleIcons[role.id] || HeartHandshake;
            const isSelected = activeRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => {
                  onSelectRole(role.id as UserRole);
                  onClose();
                }}
                className={`flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? "border-[#0d631b] bg-[#d9e6da]/40 shadow-sm"
                    : "border-gray-200 hover:border-[#0d631b]/40 hover:bg-gray-50/80"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#0d631b] text-white shadow-xs"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-bold text-gray-900 truncate">
                      {role.name}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-xs font-bold text-[#0d631b] bg-white px-2 py-0.5 rounded-full border border-[#0d631b]/30">
                        <Check className="w-3.5 h-3.5" />
                        Aktif
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#0d631b] block">
                    {role.title}
                  </span>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {role.focusArea}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
