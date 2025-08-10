/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cool1: '#5297C8', // leftmost
        cool2: '#4CA3D9',
        cool3: '#A6D1F1',
        cool4: '#1E5C70',
        cool5: '#41C1D1',
        cool6: '#A9E6EA', // rightmost
      },
      backgroundImage: {
        'cool-gradient': 'linear-gradient(90deg, #5297C8 0%, #4CA3D9 20%, #A6D1F1 40%, #1E5C70 60%, #41C1D1 80%, #A9E6EA 100%)',
      },
    },
  },
  plugins: [],
};
