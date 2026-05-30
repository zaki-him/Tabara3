import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropletIcon, HeartIcon, UsersIcon } from "lucide-react";

export default async function Home() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute -right-40 -top-40 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:py-0">
          <div className="flex flex-1 flex-col items-center gap-8 text-center lg:items-start lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <HeartIcon className="size-4" />
              {t("badge")}
            </div>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t.rich("heading", {
                span: (chunks) => <span className="text-primary">{chunks}</span>,
              })}
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground sm:text-xl">
              {t("sub")}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/add-donor">
                <Button size="lg" className="h-10 gap-2 px-6 text-base">
                  <HeartIcon className="size-4" />
                  {t("ctaDonate")}
                </Button>
              </Link>
              <Link href="/donors">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-10 gap-2 px-6 text-base"
                >
                  <UsersIcon className="size-4" />
                  {t("ctaView")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="relative flex size-64 items-center justify-center sm:size-80 lg:size-96">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
              <div className="absolute inset-4 rounded-full bg-primary/15" />
              <div className="absolute inset-8 flex items-center justify-center rounded-full bg-primary/20">
                <DropletIcon className="size-20 text-primary sm:size-24 lg:size-32" />
              </div>
              <div className="absolute -right-4 -top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg sm:-right-6 sm:-top-6 sm:px-4 sm:py-1.5 sm:text-sm">
                Save Lives
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
