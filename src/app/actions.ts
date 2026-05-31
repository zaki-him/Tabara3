"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { BloodType as PrismaBloodType } from "@/generated/prisma/enums";

export interface DonorFormData {
  name: string;
  bloodType: string;
  age: string;
  phone: string;
  address: string;
  lastDonation: string;
}

const bloodTypeToPrisma: Record<string, string> = {
  "A+": PrismaBloodType.A_PLUS,
  "A-": PrismaBloodType.A_MINUS,
  "B+": PrismaBloodType.B_PLUS,
  "B-": PrismaBloodType.B_MINUS,
  "AB+": PrismaBloodType.AB_PLUS,
  "AB-": PrismaBloodType.AB_MINUS,
  "O+": PrismaBloodType.O_PLUS,
  "O-": PrismaBloodType.O_MINUS,
};

export async function createDonor(_prev: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const bloodType = formData.get("bloodType") as string;
  const age = formData.get("age") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const lastDonation = formData.get("lastDonation") as string;

  const errors: Record<string, string> = {};

  if (!name || name.trim().length < 2)
    errors.name = "Name must be at least 2 characters";
  if (!bloodType) errors.bloodType = "Select a blood type";
  if (!age || isNaN(Number(age)) || Number(age) < 18 || Number(age) > 100)
    errors.age = "Age must be between 18 and 100";
  if (!phone || phone.trim().length < 6)
    errors.phone = "Phone must be at least 6 characters";
  if (!address || address.trim().length < 3)
    errors.address = "Address must be at least 3 characters";

  if (Object.keys(errors).length > 0) return { errors };

  await prisma.donor.create({
    data: {
      name: name.trim(),
      bloodType: bloodTypeToPrisma[bloodType] as any,
      age: Number(age),
      phone: phone.trim(),
      address: address.trim(),
      ...(lastDonation ? { lastDonation: new Date(lastDonation) } : {}),
    },
  });

  revalidatePath("/donors");
  return { success: true };
}
