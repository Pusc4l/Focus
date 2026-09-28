// Theme metadata. The actual colors live as CSS variables in index.css
// under [data-theme="<key>"], so every screen re-colors together.
export const THEMES = [
  {
    key: "warm",
    label: "Gradasi Hangat",
    desc: "Copper, peach, dan hijau sage.",
    preview: "linear-gradient(160deg, #E8895C 0%, #F3B98A 45%, #CFE0C4 100%)",
    themeColor: "#E8895C",
  },
  {
    key: "cool",
    label: "Pastel Sejuk",
    desc: "Biru langit, lavender, dan mint.",
    preview: "linear-gradient(160deg, #B9CCF5 0%, #D7C9F2 50%, #C9EBDD 100%)",
    themeColor: "#B9CCF5",
  },
  {
    key: "sakura",
    label: "Pastel Sakura",
    desc: "Pink lembut, krem, dan hijau muda.",
    preview: "linear-gradient(160deg, #F7C6D9 0%, #FBE0D0 50%, #D9ECD3 100%)",
    themeColor: "#F7C6D9",
  },
];

export const DEFAULT_THEME = "warm";
export const themeColorOf = (key) => (THEMES.find((t) => t.key === key) ?? THEMES[0]).themeColor;
export const themeLabel = (key) => (THEMES.find((t) => t.key === key) ?? THEMES[0]).label;
