"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, MapPin, Shield, Users, Award } from "lucide-react";

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export default function Footer({ onSelectTab }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 pt-12 pb-24 lg:pb-12 text-gray-600 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-gray-100">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-2xl p-1 shadow-xs border border-gray-100">
                <Image
                  src="/logo-bina-cakap.png"
                  alt="Logo BINA CAKAP"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-base font-black text-[#0d631b] block">
                  BINA CAKAP Digital Desa Cikawao
                </span>
                <span className="text-xs text-gray-500 font-semibold block">
                  Universitas Bhakti Kencana • DRPM / LPPM
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed max-w-sm">
              Program Pengabdian Kepada Masyarakat: Penguatan Kader, Keluarga, Remaja, dan Pelaku Usaha Melalui Etika, Budaya, dan Kecakapan Digital di Desa Cikawao, Kecamatan Pacet, Kabupaten Bandung.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#0d631b]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Desa Cikawao, Kec. Pacet, Kab. Bandung, Jawa Barat</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
              Tim Pelaksana Pengabdian UBK
            </span>
            <ul className="text-xs text-gray-600 space-y-1.5">
              <li className="font-semibold text-gray-800">
                • Nadia Ushfuri Amini, S.I.Kom., M.I.Kom. (Ketua)
              </li>
              <li>• Mufti Fauzi Rahman, S.Pd., M.I.Kom.</li>
              <li>• Alfi Fauzia Hakim, S.I.Kom., M.I.Kom.</li>
              <li>• Mamay Maulana Sobandi, S.Pd., MM.</li>
              <li>• Aprilian Gevindo, S.Kom., M.Kom.</li>
              <li className="text-gray-500 text-[11px] pt-1">
                Mahasiswa Pendamping: Najwa Sova Azzahra & Raditya Anugrah J.
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
              Menu Cepat Aplikasi
            </span>
            <div className="flex flex-col gap-2 text-xs font-semibold">
              <button
                onClick={() => onSelectTab("beranda")}
                className="text-left text-gray-600 hover:text-[#0d631b] transition-colors"
              >
                Beranda & Statistik Desa
              </button>
              <button
                onClick={() => onSelectTab("asesmen")}
                className="text-left text-gray-600 hover:text-[#0d631b] transition-colors"
              >
                Simulasi Asesmen Kasus Lapangan
              </button>
              <button
                onClick={() => onSelectTab("modul")}
                className="text-left text-gray-600 hover:text-[#0d631b] transition-colors"
              >
                Katalog Modul Microlearning 4 Kunjungan
              </button>
              <button
                onClick={() => onSelectTab("evaluasi")}
                className="text-left text-gray-600 hover:text-[#0d631b] transition-colors"
              >
                Rapor & Piagam Pengukuhan Agen
              </button>
              <button
                onClick={() => onSelectTab("konten")}
                className="text-left text-gray-600 hover:text-[#0d631b] transition-colors"
              >
                Bank Konten Positif & UMKM
              </button>
              <button
                onClick={() => onSelectTab("cekhoaks")}
                className="text-left text-gray-600 hover:text-[#0d631b] transition-colors"
              >
                Posko Cek Fakta WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 text-center sm:text-left text-xs text-gray-500">
          <p>
            © 2026 BINA CAKAP Digital. Universitas Bhakti Kencana & Pemerintah Desa Cikawao.
          </p>
        </div>
      </div>
    </footer>
  );
}
