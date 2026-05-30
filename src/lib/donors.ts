export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface Donor {
  id: string;
  name: string;
  bloodType: BloodType;
  age: number;
  phone: string;
  address: string;
  lastDonation: string;
  createdAt: string;
}

const donors: Donor[] = [
  {
    id: "1",
    name: "Ahmed Benali",
    bloodType: "O+",
    age: 28,
    phone: "+213 555 12 34 56",
    address: "Alger Centre, Alger",
    lastDonation: "2026-04-15",
    createdAt: "2026-01-10T08:00:00Z",
  },
  {
    id: "2",
    name: "Fatima Zohra",
    bloodType: "A+",
    age: 32,
    phone: "+213 555 98 76 54",
    address: "Hydra, Alger",
    lastDonation: "2026-05-20",
    createdAt: "2026-02-15T10:30:00Z",
  },
  {
    id: "3",
    name: "Karim Lounici",
    bloodType: "B-",
    age: 25,
    phone: "+213 555 45 67 89",
    address: "Oran Centre, Oran",
    lastDonation: "2026-03-10",
    createdAt: "2026-03-01T14:00:00Z",
  },
  {
    id: "4",
    name: "Sofia Bouchareb",
    bloodType: "AB+",
    age: 30,
    phone: "+213 555 11 22 33",
    address: "Sidi Bel Abbes",
    lastDonation: "2026-02-28",
    createdAt: "2026-01-20T09:15:00Z",
  },
  {
    id: "5",
    name: "Yacine Hammadi",
    bloodType: "O-",
    age: 35,
    phone: "+213 555 77 88 99",
    address: "Constantine",
    lastDonation: "2026-05-01",
    createdAt: "2026-04-05T16:45:00Z",
  },
  {
    id: "6",
    name: "Nadia Merabet",
    bloodType: "A-",
    age: 27,
    phone: "+213 555 33 44 55",
    address: "Bab El Oued, Alger",
    lastDonation: "2026-06-01",
    createdAt: "2026-05-10T11:00:00Z",
  },
];

export function getDonors(): Donor[] {
  return [...donors];
}

export function addDonor(donor: Omit<Donor, "id" | "createdAt">): Donor {
  const newDonor: Donor = {
    ...donor,
    id: String(donors.length + 1),
    createdAt: new Date().toISOString(),
  };
  donors.push(newDonor);
  return newDonor;
}
