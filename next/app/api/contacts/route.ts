import { NextRequest, NextResponse } from "next/server";
import { mockContactDatabase } from "@/lib/mock-db/contacts";
import { delay } from "@/lib/api-utils";
import { User } from "@/lib/types";

// GET /api/contacts - Fetch all contacts
export async function GET() {
  await delay(800);

  // Return a copy of the data
  const contacts = mockContactDatabase.map((contact) => ({ ...contact }));
  return NextResponse.json(contacts);
}

// POST /api/contacts - Add a new contact
export async function POST(request: NextRequest) {
  await delay(500);

  const body = await request.json();

  const newContact: User = {
    id: Date.now(),
    ...body,
  };

  // Add to mock database
  mockContactDatabase.push(newContact);

  return NextResponse.json(newContact);
}

