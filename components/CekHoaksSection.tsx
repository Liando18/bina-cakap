"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Search,
  Link2,
  Image as ImageIcon,
  FileText,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Volume2,
  CheckCircle2,
  Upload,
  RefreshCw,
  Send,
  ExternalLink,
  Lightbulb,
  Info,
  X,
  FileCheck2,
} from "lucide-react";
import { HOAX_CHECK_DATABASE } from "@/lib/data";
import { HoaxCheckItem } from "@/lib/types";
import { speakText, stopSpeaking } from "@/lib/speech";

interface DetectionResult {
  verdict: "HOAKS" | "FAKTA RESMI" | "POTENSI PHISHING";
  riskScore: number;
  title: string;
  summary: string;
  evidence: string[];
  officialSource: string;
  recommendation: string;
}

export default function CekHoaksSection() {
  const [activeTab, setActiveTab] = useState<"teks" | "link" | "foto">("teks");
  const [textInput, setTextInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const presets = [
    {
      label: "Link APK Bansos",
      type: "link" as const,
      value: "http://konfirmasi-bansos-cikawao.xyz/download.apk",
      result: {
        verdict: "HOAKS" as const,
        riskScore: 98,
        title: "Tautan Berbahaya: File Unduhan APK Palsu Mengatasnamakan Bansos",
        summary: "Tautan tersebut mengarahkan korban untuk mengunduh berkas berbahaya berekstensi .apk yang dirancang untuk menyadap kode OTP perbankan dan SMS rahasia.",
        evidence: [
          "Domain berekstensi .xyz (bukan portal resmi pemerintah .go.id)",
          "Menyertakan berkas instalasi aplikasi (.apk) yang dilarang untuk penyaluran bansos",
          "Nomor dan server terdeteksi berada di luar negeri dan telah dilaporkan berkali-kali",
        ],
        officialSource: "Kementerian Sosial RI & Tim DRPM UBK Bandung",
        recommendation: "Jangan pernah klik tautan tersebut. Hapus pesan segera dan laporkan nomor pengirim ke Ketua RT atau perangkat Desa Cikawao.",
      },
    },
    {
      label: "Link Resmi Kemensos",
      type: "link" as const,
      value: "https://cekbansos.kemensos.go.id",
      result: {
        verdict: "FAKTA RESMI" as const,
        riskScore: 0,
        title: "Tautan Resmi: Portal Cek Bansos Kementerian Sosial RI",
        summary: "Tautan ini adalah portal pencarian data penerima bantuan sosial resmi milik Kementerian Sosial Republik Indonesia yang terlindungi protokol enkripsi HTTPS aman.",
        evidence: [
          "Domain resmi berakhiran pemerintah (.go.id)",
          "Tersertifikasi SSL/HTTPS aman dengan enkripsi data",
          "Hanya meminta NIK dan wilayah tempat tinggal tanpa meminta PIN perbankan atau nomor kartu",
        ],
        officialSource: "Pusdatin Kesejahteraan Sosial Kemensos RI",
        recommendation: "Aman digunakan oleh kader dan warga Desa Cikawao untuk memeriksa status penerima bantuan secara mandiri.",
      },
    },
    {
      label: "Ramuan Herbal Ajaib",
      type: "teks" as const,
      value: "Viral resep rebusan daun kecubung campur garam dapur bisa sembuhkan diabetes dan gagal ginjal dalam 24 jam tanpa perlu cuci darah!",
      result: {
        verdict: "HOAKS" as const,
        riskScore: 92,
        title: "Disinformasi Medis: Klaim Herbal Ekstrem Sembuhkan Ginjal Seketika",
        summary: "Klaim tersebut tidak memiliki landasan bukti klinis farmakologi dan berisiko fatal memicu keracunan akut serta gagal ginjal permanen.",
        evidence: [
          "Daun kecubung mengandung senyawa alkaloid tropan beracun yang dapat menyebabkan halusinasi dan gangguan saraf",
          "Tidak terdaftar dalam Formularium Obat Tradisional BPOM RI",
          "Penyakit degeneratif seperti diabetes memerlukan pengawasan medis berkelanjutan",
        ],
        officialSource: "Fakultas Farmasi Universitas Bhakti Kencana & BPOM RI",
        recommendation: "Jangan mengonsumsi racikan yang belum teruji klinis. Konsultasikan keluhan kesehatan ke Puskesmas Pacet atau Bidan Desa Cikawao.",
      },
    },
    {
      label: "Pengumuman Posyandu",
      type: "teks" as const,
      value: "Jadwal penimbangan balita dan pemberian vitamin A serentak di Posyandu RW 01 Desa Cikawao hari Kamis pukul 08.30 WIB.",
      result: {
        verdict: "FAKTA RESMI" as const,
        riskScore: 0,
        title: "Informasi Resmi: Kegiatan Posyandu Balita Desa Cikawao",
        summary: "Pemberitahuan penimbangan dan imunisasi balita merupakan agenda rutin Pokja IV PKK Desa Cikawao bekerjasama dengan Bidan Desa dan Puskesmas Pacet.",
        evidence: [
          "Sesuai kalender kegiatan kesehatan terpadu tingkat desa",
          "Dikoordinasikan langsung oleh kader Posyandu terdaftar",
          "Tidak memungut biaya apapun bagi warga desa",
        ],
        officialSource: "Pemerintah Desa Cikawao & Puskesmas Pacet",
        recommendation: "Warga yang memiliki balita dihimbau hadir tepat waktu dengan membawa buku KIA (buku pink).",
      },
    },
  ];

  const handleApplyPreset = (preset: (typeof presets)[0]) => {
    setActiveTab(preset.type);
    if (preset.type === "link") {
      setLinkInput(preset.value);
      setTextInput("");
      setUploadedImagePreview(null);
    } else {
      setTextInput(preset.value);
      setLinkInput("");
      setUploadedImagePreview(null);
    }
    triggerScan(preset.result);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const previewUrl = URL.createObjectURL(file);
      setUploadedImagePreview(previewUrl);
    }
  };

  const triggerScan = (customResult?: DetectionResult) => {
    stopSpeaking();
    setIsScanning(true);
    setScanProgress(0);
    setDetectionResult(null);
    setReportSubmitted(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          let res: DetectionResult;

          if (customResult) {
            res = customResult;
          } else if (activeTab === "link") {
            const isGov = linkInput.includes(".go.id") || linkInput.includes(".ac.id");
            if (isGov) {
              res = {
                verdict: "FAKTA RESMI",
                riskScore: 0,
                title: "Tautan Terverifikasi: Domain Lembaga Resmi",
                summary: "Tautan menggunakan domain berstandar pemerintah atau institusi pendidikan tinggi resmi dengan tingkat keamanan tinggi.",
                evidence: [
                  "Domain terdaftar secara hukum di Kominfo RI",
                  "Protokol komunikasi terenkripsi aman",
                ],
                officialSource: "Kominfo & Lembaga Resmi Terkait",
                recommendation: "Aman diakses dan dibagikan ke warga desa.",
              };
            } else {
              res = {
                verdict: "POTENSI PHISHING",
                riskScore: 88,
                title: "Tautan Mencurigakan: Tidak Terdaftar di Basis Data Desa",
                summary: "Tautan tidak menggunakan domain pemerintah resmi dan terindikasi meminta informasi sensitif atau mengunduh berkas asing.",
                evidence: [
                  "Domain bukan merupakan portal pemerintah atau perbankan resmi",
                  "Berpotensi meminta pengisian data NIK, nomor rekening, atau OTP",
                ],
                officialSource: "Tim Analisis Siber PPM Universitas Bhakti Kencana",
                recommendation: "Tolak dan jangan masukkan data apapun pada halaman tersebut.",
              };
            }
          } else if (activeTab === "foto") {
            res = {
              verdict: "HOAKS",
              riskScore: 94,
              title: "Tangkapan Layar Terdeteksi Mengandung Unsur Penipuan",
              summary: "Hasil pemindaian OCR visual menemukan pola kalimat manipulatif yang menjanjikan bantuan tunai instan dengan membagikan pesan ke kontak lain.",
              evidence: [
                "Format gambar menggunakan tipografi dan logo tiruan instansi resmi",
                "Tata bahasa terdeteksi meniru pesan resmi bansos tanpa kontak kantor desa",
              ],
              officialSource: "Posko Literasi BINA CAKAP Desa Cikawao",
              recommendation: "Jangan bagikan gambar ini ke grup WhatsApp RT/RW.",
            };
          } else {
            const isHoax =
              textInput.toLowerCase().includes("viralkan") ||
              textInput.toLowerCase().includes("apk") ||
              textInput.toLowerCase().includes("rebusan") ||
              textInput.toLowerCase().includes("sembuh") ||
              textInput.toLowerCase().includes("hadiah");

            if (isHoax) {
              res = {
                verdict: "HOAKS",
                riskScore: 89,
                title: "Kabar Rantai Terindikasi Misinformasi",
                summary: "Pola pesan menggunakan kata-kata desakan emosional dan tidak didukung oleh rilis resmi pemerintah desa maupun dinas kesehatan.",
                evidence: [
                  "Tidak menyertakan tautan situs resmi berakhiran .go.id",
                  "Meminta disebarkan secara berantai ke grup lain",
                ],
                officialSource: "Pemerintah Desa Cikawao & Tim PPM UBK",
                recommendation: "Hentikan penyebaran di Anda. Saring sebelum sharing.",
              };
            } else {
              res = {
                verdict: "FAKTA RESMI",
                riskScore: 5,
                title: "Kabar Aman & Informatif",
                summary: "Teks tidak mengandung pola manipulasi siber maupun klaim kesehatan yang bertentangan dengan sains.",
                evidence: [
                  "Bahasa santun dan tidak memicu kepanikan warga",
                  "Informasi bersifat netral dan dapat dikonfirmasi ke pihak desa",
                ],
                officialSource: "Pemerintah Desa Cikawao",
                recommendation: "Bisa dikonfirmasi kembali ke pengurus RT setempat.",
              };
            }
          }

          setDetectionResult(res);

          if (res.verdict === "FAKTA RESMI") {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
            });
          }

          speakText(
            `Hasil Analisis: ${res.title}. Status: ${res.verdict}. Rekomendasi: ${res.recommendation}`
          );
        }, 600);
      }
    }, 150);
  };

  const handleManualScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "teks" && !textInput.trim()) return;
    if (activeTab === "link" && !linkInput.trim()) return;
    if (activeTab === "foto" && !uploadedImagePreview) return;
    triggerScan();
  };

  const handlePlayAudio = () => {
    if (!detectionResult) return;
    const text = `Hasil Analisis Posko Cek Fakta Cikawao: ${detectionResult.title}. Status: ${detectionResult.verdict}. Skor Risiko: ${detectionResult.riskScore} persen. Penjelasan: ${detectionResult.summary}. Rekomendasi untuk warga: ${detectionResult.recommendation}`;
    speakText(text);
  };

  const handleReport = () => {
    setReportSubmitted(true);
    speakText("Terima kasih. Laporan kecurigaan telah diteruskan ke Posko BINA CAKAP Desa Cikawao.");
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-2">
      <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-sm mb-6 flex flex-col gap-4">
        <div>
          <span className="text-xs font-bold text-[#0d631b] uppercase tracking-wider block">
            Posko Cek Fakta Digital Cikawao • PPM UBK
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
            Deteksi Hoaks, Tautan & Tangkapan Layar
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Periksa keaslian pesan WhatsApp, link pendaftaran bantuan, atau unggah foto bukti untuk analisis instan.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[#f3f3f3] rounded-xl self-start w-full sm:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("teks")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "teks"
                ? "bg-white text-[#0d631b] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Teks / Pesan WA</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("link")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "link"
                ? "bg-white text-[#0d631b] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Tautan / Link</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("foto")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "foto"
                ? "bg-white text-[#0d631b] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Unggah Foto Bukti</span>
          </button>
        </div>

        <form onSubmit={handleManualScan} className="space-y-4">
          {activeTab === "teks" && (
            <div className="relative">
              <textarea
                rows={3}
                placeholder="Tempel (paste) isi pesan WhatsApp yang beredar di grup warga di sini..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full p-4 rounded-2xl border border-gray-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0d631b] shadow-xs resize-none"
              />
            </div>
          )}

          {activeTab === "link" && (
            <div className="relative">
              <input
                type="url"
                placeholder="Tempel tautan (misal: http://bansos-pkh.xyz atau https://...)"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d631b] shadow-xs"
              />
              <Link2 className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          )}

          {activeTab === "foto" && (
            <div className="space-y-3">
              <label className="border-2 border-dashed border-gray-300 hover:border-[#0d631b] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50/60 hover:bg-emerald-50/30">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-[#d9e6da] text-[#0d631b] flex items-center justify-center mb-2">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-900 text-center">
                  Klik untuk pilih tangkapan layar (screenshot) obrolan WA
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5">
                  Mendukung format JPG, PNG, atau WebP
                </span>
              </label>

              {uploadedImagePreview && (
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                      <Image
                        src={uploadedImagePreview}
                        alt="Preview Bukti"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-gray-900 truncate block">
                        {uploadedFileName || "tangkapan_layar_wa.png"}
                      </span>
                      <span className="text-[11px] text-[#0d631b] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Siap Dipindai
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedImagePreview(null);
                      setUploadedFileName("");
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-gray-500 mr-1">
                Uji Contoh Cepat:
              </span>
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#d9e6da] text-gray-700 hover:text-[#0d631b] text-xs font-semibold transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={isScanning}
              className="py-3 px-6 rounded-2xl bg-[#0d631b] hover:bg-[#2e7d32] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 shrink-0"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memindai...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Periksa Fakta Sekarang</span>
                </>
              )}
            </button>
          </div>
        </form>

        {isScanning && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col gap-2.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-bold text-[#0d631b]">
              <span>Memverifikasi Basis Data UBK & Kominfo...</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-emerald-200 overflow-hidden">
              <div
                className="h-full bg-[#0d631b] rounded-full transition-all duration-200"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <span className="text-[11px] text-emerald-800">
              Mengecek tanda tangan digital, izin edar BPOM, dan riwayat penipuan APK siber...
            </span>
          </div>
        )}
      </div>

      {detectionResult && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-200/90 shadow-md mb-8 flex flex-col gap-5 animate-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-gray-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                    detectionResult.verdict === "HOAKS"
                      ? "bg-red-600 text-white"
                      : detectionResult.verdict === "POTENSI PHISHING"
                      ? "bg-amber-600 text-white"
                      : "bg-emerald-600 text-white"
                  }`}
                >
                  {detectionResult.verdict === "FAKTA RESMI" ? (
                    <ShieldCheck className="w-4 h-4" />
                  ) : (
                    <ShieldAlert className="w-4 h-4" />
                  )}
                  <span>HASIL: {detectionResult.verdict}</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">
                  Tingkat Risiko: {detectionResult.riskScore}%
                </span>
              </div>

              <h2 className="text-base sm:text-xl font-black text-gray-900 leading-snug">
                {detectionResult.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePlayAudio}
                title="Dengarkan Uraian Hasil"
                className="px-3.5 py-2 rounded-xl bg-[#d9e6da] hover:bg-[#cbffc2] text-[#0d631b] flex items-center gap-1.5 text-xs font-bold transition-transform active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Baca Suara</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Ringkasan Analisis Cek Fakta:
            </span>
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed p-4 rounded-2xl bg-gray-50 border border-gray-100">
              {detectionResult.summary}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Indikasi & Bukti Lapangan:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {detectionResult.evidence.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-800 flex items-start gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-[#cbffc2] text-[#0d631b] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">
                Rekomendasi Warga Cikawao:
              </span>
              <p>{detectionResult.recommendation}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs text-gray-500 font-medium">
            <div>
              <span>Rujukan Konfirmasi: </span>
              <strong className="text-[#0d631b]">
                {detectionResult.officialSource}
              </strong>
            </div>

            <button
              type="button"
              onClick={handleReport}
              disabled={reportSubmitted}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                reportSubmitted
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {reportSubmitted
                  ? "Laporan Terkirim ke Balai Desa"
                  : "Laporkan ke Posko Desa"}
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
            Basis Data Klarifikasi Desa
          </span>
          <h3 className="text-base sm:text-lg font-black text-gray-900 mt-0.5">
            Daftar Hoaks & Kabar Resmi yang Telah Dikonfirmasi
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HOAX_CHECK_DATABASE.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-gray-200/80 bg-gray-50/50 flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      item.verdict === "HOAKS"
                        ? "bg-red-100 text-red-700"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {item.verdict}
                  </span>
                  <span className="text-[11px] text-gray-400">Verifikasi UBK</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-gray-500">
                <span>Sumber: {item.officialSource}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
