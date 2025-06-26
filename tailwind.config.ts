import type { Config } from "tailwindcss";

const { heroui } = require("@heroui/react");
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  theme: {
    screens: {
      sm: "0px",
      md: "768px",
      lg: "1024px",
      xl: "1536px",
    },
    extend: {
      fontFamily: {
        poppins: "var(--font-poppins)",
        ttnorms: "var(--font-ttnorms)",
      },
      colors: {
        // primary: "var(--primary)",
        // logosecondary: "#0A1153",
      },
      animation: {
        "line-shadow": "line-shadow 15s linear infinite",
      },
      keyframes: {
        "line-shadow": {
          "0%": { "background-position": "0 0" },
          "100%": { "background-position": "100% -100%" },
        },
      },
    },
  },
  plugins: [
    heroui({
      defaultTheme: "light",
      addCommonColors: false,

      themes: {
        light: {
          layout: {
            borderWidth: {
              small: "1px",
              medium: "1px",
              large: "1px",
            },
          },
          colors: {
            default: "#d1d5db",
            background: "#ffffff",
            foreground: "#171717",
            primary: "#FF6600",
            secondary: "#0A1153",

            //// setup //
            setupbackground: "#fafafa",

            /// input ///
            inputborder: "#d4d4d4",

            //// Button ////
            buttontext: "#171717",

            //// Switch ////
            switchbackground: "#e5e5e5",

            /////themeswitchicon//////
            themeswitchicon: "#171717",

            sidebarbg: "#fafafa",
            sidebaractivebg: "#e5e5e5",

            itemsbordercolor: "#f4f4f5",
            iconcolor: "#171717",
          },
        },
        dark: {
          layout: {
            borderWidth: {
              small: "1px",
              medium: "1px",
              large: "1px",
            },
          },

          colors: {
            default: "#3f3f46",
            background: "#09090b",
            foreground: "#ededed",
            primary: "#FF6600",
            secondary: "#0A1153",

            /// input ///
            inputbg: "#18181b",
            inputtext: "#d4d4d8",
            inputborder: "#262626",

            //// setup //
            setupbackground: "#171717",

            //// Button ////
            buttontext: "#ededed",

            //// Switch ////
            switchbackground: "#000000",

            /////themeswitchicon//////
            themeswitchicon: "#ededed",

            sidebarbg: "#18181b",
            sidebaractivebg: "#0a0a0a",

            itemsbordercolor: "#27272a",
            iconcolor: "#ededed",
          },
        },
        mint: {
          layout: {
            borderWidth: {
              small: "1px",
              medium: "1px",
              large: "1px",
            },
          },

          colors: {
            default: "#a3e635",
            background: "#ffffff",
            foreground: "#171717",
            primary: "#ff6600",
            secondary: "#0A1153",

            /// input ///
            inputbg: "#f0fdf4",
            inputtext: "#171717",
            inputborder: "#d4d4d4",

            /// text color ///
            textcolor: "#000000",

            ///iconcolor ///
            iconcolor: "#84cc16",
            //// setup //
            setupbackground: "#ecfccb",

            //// Button ////
            buttontext: "#ffffff",

            /////themeswitchicon//////
            themeswitchicon: "#ffffff",

            sidebarbg: "#f7fee7",
            sidebaractivebg: "#bef264",

            itemsbordercolor: "#ecfccb",
          },
        },
        artic: {
          layout: {
            borderWidth: {
              small: "1px",
              medium: "1px",
              large: "1px",
            },
          },

          colors: {
            default: "#38bdf8",
            background: "#ffffff",
            foreground: "#171717",
            primary: "#ff6600",
            secondary: "#0A1153",

            /// input ///
            inputbg: "#f0f9ff",
            inputtext: "#171717",
            inputborder: "#d4d4d4",

            /// text color ///
            textcolor: "#000000",

            ///iconcolor ///
            iconcolor: "#0ea5e9",

            //// setup //
            setupbackground: "#e0f2fe",

            //// Button ////
            buttontext: "#ffffff",
            /////themeswitchicon//////
            themeswitchicon: "#ffffff",

            sidebarbg: "#f0f9ff",
            sidebaractivebg: "#7dd3fc",
            itemsbordercolor: "#e0f2fe",
          },
        },
        coral: {
          layout: {
            borderWidth: {
              small: "1px",
              medium: "1px",
              large: "1px",
            },
          },

          colors: {
            default: "#ff6600",
            background: "#ffffff",
            foreground: "#171717",
            primary: "#192935",
            secondary: "#0A1153",

            /// input ///
            inputbg: "#fff7ed",
            inputtext: "#171717",
            inputborder: "#d4d4d4",

            /// text color ///
            textcolor: "#000000",

            ///iconcolor ///
            iconcolor: "#f97316",

            //// setup //
            setupbackground: "#ffedd5",

            //// Button ////
            buttontext: "#ffffff",

            /////themeswitchicon//////
            themeswitchicon: "#ffffff",

            sidebarbg: "#fff7ed",
            sidebaractivebg: "#fdba74",
            itemsbordercolor: "#ffedd5",
          },
        },
        lilac: {
          layout: {
            borderWidth: {
              small: "1px",
              medium: "1px",
              large: "1px",
            },
          },
          colors: {
            default: "#a78bfa",
            background: "#ffffff",
            foreground: "#171717",
            primary: "#ff6600",
            secondary: "#0A1153",

            /// input ///
            inputbg: "#f5f3ff",
            inputtext: "#171717",
            inputborder: "#d4d4d4",

            /// text color ///
            textcolor: "#000000",

            ///iconcolor ///
            iconcolor: "#8b5cf6",

            //// setup //
            setupbackground: "#ede9fe",

            //// Button ////
            buttontext: "#ffffff",
            /////themeswitchicon//////
            themeswitchicon: "#ffffff",

            sidebarbg: "#f5f3ff",
            sidebaractivebg: "#c4b5fd",

            /////Skeleton//////
            skeletonbg: "#f5f3ff",
            skeletonbg2: "#ede9fe",
            skeletonbg3: "#ddd6fe",

            itemsbordercolor: "#ede9fe",
          },
        },
        rose: {
          layout: {
            borderWidth: {
              small: "1px",
              medium: "1px",
              large: "1px",
            },
          },

          colors: {
            default: "#fb7185",
            background: "#ffffff",
            foreground: "#171717",
            primary: "#ff6600",
            secondary: "#0A1153",

            /// input ///
            inputbg: "#fff1f2",
            inputtext: "#171717",
            inputborder: "#d4d4d4",

            /// text color ///
            textcolor: "#000000",

            ///iconcolor ///
            iconcolor: "#f43f5e",

            //// setup //
            setupbackground: "#ffe4e6",

            //// Button ////
            buttontext: "#ffffff",

            /////themeswitchicon//////
            themeswitchicon: "#ffffff",

            sidebarbg: "#fff1f2",
            sidebaractivebg: "#fda4af",

            itemsbordercolor: "#ffe4e6",
          },
        },
      },
    }),
  ],
} satisfies Config;
