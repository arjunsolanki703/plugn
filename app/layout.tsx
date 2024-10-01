import "@/app/globals.css";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/providers/react-queary";
export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Dashboard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <NextTopLoader showSpinner={false} />

        <QueryProvider>
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Aside />
            <div className="flex flex-col">
              <Header />
              <main className="h-[calc(100vh-60px)] overflow-y-auto max-md:p-2">
                {children}
              </main>
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
