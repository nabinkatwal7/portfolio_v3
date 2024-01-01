import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
          'barca-gold':'#edbb00',
          'barca-blue':'#004d98',
          'barca-burgundy':'#a50044',
          'barca-white':'#f8f8f8',
          'barca-black':'#000000',
          'barca-red':'#db0030',
          'barca-yellow':'#ffed02',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'rubik-doodle': ['Rubik Doodle Shadow', 'cursive'],
      }
    },
  },
  plugins: [],
}
export default config
