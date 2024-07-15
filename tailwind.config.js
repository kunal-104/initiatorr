const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#0857DE',
        'secondary': '#8FDD67',
        'text-primary': '#323E4A',
        'text-secondary': '#7B8795',
        'accent': '#5B85D9',
        'danger': '#E9635E',
        'success': '#59C857',
        'warning': '#F5C24B',
        'muted': '#52606D',
        'shade': '#F6F7FB',
        'dark': '#222222',
        'maincolor': '#2C2A7E',
        'bodybg': '#1A1A1A',
        // 'bodybg': '#EAF9FF',
        'white': '#FFFFFF',
        'secandary': '#FFA05D',
        'grey': '#777777',
        'lightprimary': '#BCBAFF',
        'lightsecondary':' #FFE3D0',
        'sidebarbg': '#808080',
        'icon':'#FFFFFF ',
        'hoverEff':'#EAEAEA ',
        'card':'#A6A6A6',
        'cardText':'#FFFFFF',
        'open': '#737373',
        'add': '#4d4d4d',
        
        
      }
    },
  },
  darkMode: "class",
  variants: {},
  plugins: [nextui()],
};
