
import { Metadata } from "next";
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

/*export const metadata: Metadata = {
  title: "2030 is not too far",
  description: "2030 is not too far",
};*/

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  
  return {
    title: `2030 is not too far`,
    description: `2030 is not too far`,
    openGraph: {
    images: [
      {
        url: `localhost:3000/api/share-image/${searchParams? searchParams.shareImage : 0}`, // Use absolute URLs for external images

      },
      // ... more images
    ],
  },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const id = useSearchParams().get("shareImage") || 0;
  return (
    <html lang="en">
      <head>
        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="min-h-screen bg-[conic-gradient(#9233ea,#db2777,#2564eb)] text-neutral-100 flex items-center justify-center p-6">
          {children}
        </main>
        
      </body>
    </html>
  );
}
