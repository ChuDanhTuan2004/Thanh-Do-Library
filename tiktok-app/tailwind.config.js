/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#e8f3ff",
          "100": "#a2d0ff",
          "200": "#73b9ff",
          "300": "#5cadff",
          "400": "#45a1ff",
          "500": "#2d96ff",
          "600": "#168AFF",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#172554",
        },
        second_primary: {
          "0": "#ffffff",
          "50": "#f5f5f5",
          "100": "#e1e1e1",
          "200": "#c2c2c2",
          "300": "#a3a3a3",
          "400": "#858585",
          "500": "#676767",
          "600": "#65676b",
          "700": "#4a4a4a",
          "800": "#383838",
          "900": "#282828",
          "950": "#141414",
        },
      }
    },
    fontFamily: {
      'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  }
}

