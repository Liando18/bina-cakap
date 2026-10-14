"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Heart,
  Share2,
  PlusCircle,
  MapPin,
  Calendar,
  Tag,
  CheckCircle2,
  X,
  Upload,
} from "lucide-react";
import { POSITIVE_CONTENT_ITEMS } from "@/lib/data";
import { PositiveContentItem } from "@/lib/types";
import { speakText } from "@/lib/speech";

export default function BankKontenSection() {
  const [items, setItems] = useState<PositiveContentItem[]>(POSITIVE_CONTENT_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCreator, setNewCreator] = useState("");
  const [newCategory, setNewCategory] = useState<PositiveContentItem["category"]>("Produk UMKM");
  const [newRw, setNewRw] = useState("RW 01 Kp. Cikawao Tengah");
  const [newDescription, setNewDescription] = useState("");

  const handleLike = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likesCount: item.likesCount + 1 } : item
      )
    );
  };

  const handleCreateContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCreator || !newDescription) return;

    const newItem: PositiveContentItem = {
      id: items.length + 10,
      category: newCategory,
      title: newTitle,
      creator: newCreator,
      rwLocation: newRw,
      description: newDescription,
      likesCount: 1,
      tag: "Karya Baru",
      dateStr: "Hari Ini",
    };

    setItems([newItem, ...items]);
    setIsSubmitModalOpen(false);
    setNewTitle("");
    setNewCreator("");
    setNewDescription("");

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
    });
    speakText("Terima kasih! Karya Anda berhasil ditambahkan ke Bank Konten Positif Desa Cikawao.");
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "Semua") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm mb-6">
        <div>
          <span className="text-xs font-bold text-[#0d631b] uppercase tracking-wider block">
            Luaran Target PPM UBK (Bab 2 Proposal)
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
            Bank Konten Positif & Etalase UMKM Cikawao
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Kumpulan hasil praktik fotografi HP, storytelling potensi desa, dan edukasi warga.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#0d631b] hover:bg-[#2e7d32] text-white font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Kirim Karya Baru</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
        {[
          "Semua",
          "Produk UMKM",
          "Karya Pemuda",
          "Edukasi Warga",
          "Potensi Desa",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-[#0d631b] text-white shadow-xs"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#d9e6da] text-[#0d631b] text-xs font-bold">
                  {item.category}
                </span>
                <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.dateStr}
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-gray-900 leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-[#0d631b] font-semibold mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.rwLocation}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {item.description}
              </p>

              <div className="p-3 bg-gray-50 rounded-2xl text-[11px] font-semibold text-gray-700">
                Karya: <strong className="text-gray-900">{item.creator}</strong>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                #{item.tag}
              </span>

              <button
                onClick={() => handleLike(item.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-transform active:scale-90"
              >
                <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                <span>{item.likesCount}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900">
                Kirim Karya / Ide Konten Desa
              </h2>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateContent} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Kategori Karya
                </label>
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as PositiveContentItem["category"])
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d631b]"
                >
                  <option value="Produk UMKM">Produk UMKM</option>
                  <option value="Karya Pemuda">Karya Pemuda</option>
                  <option value="Edukasi Warga">Edukasi Warga</option>
                  <option value="Potensi Desa">Potensi Desa</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Judul Karya / Produk
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Madu Hutan Asli RW 07 Cikawao"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d631b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Nama Pembuat / Usaha
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bu Eni (PKK)"
                    value={newCreator}
                    onChange={(e) => setNewCreator(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d631b]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Lokasi RW
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: RW 03 Kp. Pasir Kunci"
                    value={newRw}
                    onChange={(e) => setNewRw(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d631b]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Deskripsi Cerita / Keunggulan
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ceritakan proses pembuatan atau pesan positif di balik karya ini..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0d631b]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0d631b] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Kirim ke Kurasi Desa</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
