import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-1000': '#2D2A70',
        'blue-80': '#4F4D85',
        'blue-60': '#72709A',
        'blue-40': '#9493AF',
        'blue-20': '#B7B6C4',
        'orange-1000': '#ED6B23',
        'orange-80': '#E98147',
        'orange-60': '#E5976C',
        'orange-40': '#E1AD90',
        'orange-20': '#DDC3B5',
        'black': '#000000',
        'gray-40': '#828282',
        'gray-20': '#AEAEAE',
        'white-bg': '#F6F7F9',
        'white': '#FEFEFE',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
