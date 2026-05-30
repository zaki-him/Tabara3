"use server";

import { revalidatePath } from "next/cache";
import { addDonor, type BloodType } from "@/lib/donors";

export interface DonorFormData {
  name: string;
  bloodType: BloodType;
  age: string;
  phone: string;
  address: string;
  lastDonation: string;
}

export async function createDonor(_prev: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const bloodType = formData.get("bloodType") as BloodType;
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

  addDonor({
    name: name.trim(),
    bloodType,
    age: Number(age),
    phone: phone.trim(),
    address: address.trim(),
    lastDonation,
  });

  revalidatePath("/donors");
  return { success: true };
}
