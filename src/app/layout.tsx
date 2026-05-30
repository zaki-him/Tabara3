import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Figtree, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { LocaleToggle } from "@/components/locale-toggle";
import PageTransition from "@/components/page-transition";
import Link from "next/link";
import { DropletIcon, UsersIcon, HeartIcon } from "lucide-react";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("Navbar");
  const tf = await getTranslations("Footer");

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${figtree.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        style={
          locale === "ar"
            ? ({ "--font-sans": notoArabic.style.fontFamily } as React.CSSProperties)
            : undefined
        }
      >
        <NextIntlClientProvider messages={messages}>
          <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-lg tracking-tight"
              >
                <DropletIcon className="size-5 text-primary" />
                <span className="text-primary">Tabara3</span>
              </Link>
              <nav className="flex items-center gap-1 sm:gap-2">
                <LocaleToggle />
                <Link
                  href="/donors"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <UsersIcon className="size-4" />
                  <span className="hidden sm:inline">{t("donors")}</span>
                </Link>
                <Link
                  href="/add-donor"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <HeartIcon className="size-4" />
                  <span className="hidden sm:inline">{t("donate")}</span>
                </Link>
              </nav>
            </div>
          </header>
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <footer className="border-t border-border/50 py-6 text-center text-sm text-muted-foreground">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              {tf("text", { year: new Date().getFullYear() })}
            </div>
          </footer>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
