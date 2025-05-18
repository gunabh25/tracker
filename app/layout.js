import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mood Tracker",
  description:
    "Track your daily moods with emoji buttons and a color-coded calendar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        
          {children}
       
      </body>
    </html>
  );
}
