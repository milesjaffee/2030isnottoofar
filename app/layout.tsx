
import { Metadata, ResolvingMetadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2030 is not too far",
  description: "2030 is not too far",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const id = useSearchParams().get("shareImage") || 0;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="min-h-screen bg-[conic-gradient(#9233ea,#db2777,#2564eb)] text-neutral-100 flex items-center justify-center p-6">
          {children}
        </main>

        <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>
            <script
              dangerouslySetInnerHTML={{
              __html: `
              const updateKofiWidget = (locale) => {
              kofiWidgetOverlay.draw('milesjaffee', {
                type: 'floating-chat',
                'floating-chat.donateButton.text': 'Support Me',
                'floating-chat.donateButton.background-color': '#fffc',
                'floating-chat.donateButton.text-color': '#000'
              });
              };

              // Initial setup
              updateKofiWidget('en');
              `,
              }}
            ></script>
        
      </body>
    </html>
  );
}
