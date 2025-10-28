import "./globals.css";

export const metadata = {
  title: "Minha Aplicação",
  description: "Descrição",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
