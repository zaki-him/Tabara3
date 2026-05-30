import { getTranslations } from "next-intl/server";
import { getDonors } from "@/lib/donors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropletIcon, MapPinIcon, PhoneIcon, CalendarIcon } from "lucide-react";

const bloodColorMap: Record<string, string> = {
  "A+": "bg-red-600/10 text-red-600",
  "A-": "bg-red-400/10 text-red-400",
  "B+": "bg-orange-600/10 text-orange-600",
  "B-": "bg-orange-400/10 text-orange-400",
  "AB+": "bg-purple-600/10 text-purple-600",
  "AB-": "bg-purple-400/10 text-purple-400",
  "O+": "bg-green-600/10 text-green-600",
  "O-": "bg-green-400/10 text-green-400",
};

export default async function DonorsPage() {
  const t = await getTranslations("DonorsPage");
  const donors = getDonors();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t("heroes", { count: donors.length })}
        </p>
      </div>
      {donors.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <DropletIcon className="size-12 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {donors.map((donor) => (
            <Card
              key={donor.id}
              className="transition-all hover:border-primary/30 hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{donor.name}</CardTitle>
                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                      bloodColorMap[donor.bloodType] || "bg-muted text-muted-foreground"
                    }`}
                  >
                    {donor.bloodType}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPinIcon className="size-3.5 shrink-0" />
                    <span>{donor.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <PhoneIcon className="size-3.5 shrink-0" />
                    <span>{donor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="size-3.5 shrink-0" />
                    <span>
                      {donor.lastDonation
                        ? t("lastDonation", {
                            date: new Date(donor.lastDonation).toLocaleDateString(),
                          })
                        : t("noDonations")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
