export type UserRole = "kader" | "keluarga" | "remaja" | "umkm";

export interface RoleInfo {
  id: UserRole;
  title: string;
  badge: string;
  name: string;
  subtext: string;
  unit: string;
  level: string;
  avatarIcon: string;
  accentColor: string;
  focusArea: string;
}

export interface AssessmentQuestion {
  id: number;
  roleTarget: UserRole[];
  dimension: "Informasi" | "Aman" | "Etika" | "Budaya" | "Karya";
  scenarioType: "WhatsApp" | "Media Sosial" | "Kesehatan" | "UMKM";
  scenarioTitle: string;
  senderName: string;
  senderPhone?: string;
  senderAvatar?: string;
  messageContent: string;
  fileAttachment?: {
    name: string;
    size: string;
    type: string;
    warning?: string;
  };
  audioNarrative: string;
  questionText: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface LearningModule {
  id: number;
  visitNumber: number;
  slug: string;
  category: "wajib" | "keluarga" | "remaja" | "umkm";
  title: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  dimension: string;
  iconName: string;
  isPriority: boolean;
  steps: {
    stepNumber: number;
    title: string;
    content: string[];
    tips: string;
    checklist: string[];
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface PositiveContentItem {
  id: number;
  category: "Produk UMKM" | "Potensi Desa" | "Edukasi Warga" | "Karya Pemuda";
  title: string;
  creator: string;
  rwLocation: string;
  description: string;
  likesCount: number;
  tag: string;
  dateStr: string;
}

export interface HoaxCheckItem {
  id: number;
  keyword: string;
  title: string;
  verdict: "HOAKS" | "FAKTA RESMI" | "DISINFORMASI";
  summary: string;
  officialSource: string;
  tipForVillagers: string;
}
