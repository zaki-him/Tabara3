"use client";

import { useActionState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDonor, type DonorFormData } from "@/app/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { HeartIcon, DropletIcon } from "lucide-react";

const bloodTypes: DonorFormData["bloodType"][] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export default function AddDonorPage() {
  const t = useTranslations("AddDonor");
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createDonor, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(t("successTitle"), {
        description: t("successDesc"),
      });
      router.push("/donors");
    }
    if (state?.errors) {
      for (const [, msg] of Object.entries(state.errors)) {
        toast.error(msg as string);
      }
    }
  }, [state, router, t]);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8 px-4 py-12 sm:px-6">
      <div className="text-center">
        <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary/10">
          <DropletIcon className="size-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("pageTitle")}
        </h1>
        <p className="mt-2 text-muted-foreground">{t("pageDesc")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("cardTitle")}</CardTitle>
          <CardDescription>{t("cardDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t("name")} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder={t("namePlaceholder")}
                required
                minLength={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodType">
                {t("bloodType")} <span className="text-destructive">*</span>
              </Label>
              <Select name="bloodType" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("bloodTypePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((bt) => (
                    <SelectItem key={bt} value={bt}>
                      {bt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">
                {t("age")} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                min={18}
                max={100}
                placeholder={t("agePlaceholder")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                {t("phone")} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder={t("phonePlaceholder")}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                {t("address")} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                name="address"
                placeholder={t("addressPlaceholder")}
                required
                minLength={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastDonation">{t("lastDonation")}</Label>
              <Input id="lastDonation" name="lastDonation" type="date" />
            </div>

            <Button
              type="submit"
              disabled={pending}
              size="lg"
              className="w-full gap-2"
            >
              {pending ? (
                t("submitting")
              ) : (
                <>
                  <HeartIcon className="size-4" />
                  {t("submit")}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
