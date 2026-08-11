/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sampled from the reference design.
        cream: '#FDF6F1',        // page background
        shell: '#FBEDE5',        // alternate warm section
        'peach-light': '#FBDCC0',
        peach: '#F7B183',
        coral: '#F0906F',
        magenta: '#B01B5E',      // primary action / accent shapes
        'magenta-dark': '#8E1449',
        ink: '#1D1D1B',          // headings
        body: '#6E6E6E',         // body copy (4.7:1 on cream)
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        // The hero's warm mesh: soft pink -> orange -> coral.
        'hero-warm':
          'linear-gradient(115deg, #F7C8D0 0%, #FAC49A 32%, #F5A461 62%, #EF8C6E 100%)',
        'card-warm': 'linear-gradient(140deg, #FBDCC0 0%, #F8C39B 100%)',
        'cta-warm': 'linear-gradient(120deg, #FAC9A4 0%, #F7B183 55%, #F19A79 100%)',
        'photo-warm': 'linear-gradient(150deg, #F8CBB4 0%, #EFA890 55%, #E39BB0 100%)',
        'photo-cool': 'linear-gradient(150deg, #CBD5F0 0%, #E2C4E4 55%, #F3C0AE 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 18px 40px rgba(176, 27, 94, 0.08)',
        card: '0 24px 60px rgba(176, 27, 94, 0.12)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideIn: {
          'from': { transform: 'translateX(-100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
