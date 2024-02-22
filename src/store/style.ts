import { create } from "zustand";

type StyleStore = {
  textColor: string;
  backgroundColor: string;
  setTextColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  bold: boolean;
  setBold: (bold: boolean) => void;
  italic: boolean;
  setItalic: (italic: boolean) => void;
  underline: boolean;
  setUnderline: (underline: boolean) => void;
  decimals: number;
  setDecimals: (decimals: number) => void;
};

export const useStyleStore = create<StyleStore>((set) => ({
  textColor: "black",
  backgroundColor: "white",
  setTextColor: (color) => set({ textColor: color }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  fontSize: 12,
  setFontSize: (size) => set({ fontSize: size }),
  bold: false,
  setBold: (bold) => set({ bold }),
  italic: false,
  setItalic: (italic) => set({ italic }),
  underline: false,
  setUnderline: (underline) => set({ underline }),
  decimals: 0,
  setDecimals: (decimals) => set({ decimals }),
}));
