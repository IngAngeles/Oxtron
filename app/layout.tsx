import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const fontSans = Poppins({ 
  subsets: ["latin"], 
  weight: ['100','200','300', '400', '500', '600', '700'],
  variable: '--font-sans' 
}); 

export const metadata: Metadata = {
  title: "The Path to Net Zero | Oxtron", 
  description: "Admin system for measuring, controling and capturing and reducing your GHG emissions", 
  icons: {
    icon: "/favicon.ico",
  }, 
  openGraph: {
    title: "The Path to Net Zero | Oxtron",
    description: "Admin system for measuring, controling and capturing and reducing your GHG emissions",
    images: 'https://res.cloudinary.com/dqwuwopvc/image/upload/v1721166749/portadas/oxtron_ztkcdu.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{colorScheme: 'dark'}} >
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={cn('min-h-screen font-sans antialiased', fontSans.variable)}>
          {children}
          <Toaster/>
      </body>
    </html>
  );
}