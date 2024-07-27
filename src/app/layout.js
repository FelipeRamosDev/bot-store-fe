export const metadata = {
  title: "BotStore",
  description: "Use/Create trade bots for cryptocurrencies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
