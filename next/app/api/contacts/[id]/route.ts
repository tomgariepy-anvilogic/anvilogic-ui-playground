import { NextRequest, NextResponse } from "next/server";
import { mockContactDatabase } from "@/lib/mock-db/contacts";
import { delay, simulateRandomError } from "@/lib/api-utils";

// PATCH /api/contacts/[id] - Update a contact
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(400);

  try {
    simulateRandomError("Failed to update contact");
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }

  const { id: idString } = await params;
  const id = parseInt(idString);
  const updates = await request.json();

  const contact = mockContactDatabase.find((c) => c.id === id);
  if (contact) {
    Object.assign(contact, updates);
    return NextResponse.json(contact);
  }

  return NextResponse.json({ error: "Contact not found" }, { status: 404 });
}

// DELETE /api/contacts/[id] - Delete a contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(400);

  const { id: idString } = await params;
  const id = parseInt(idString);
  const index = mockContactDatabase.findIndex((c) => c.id === id);

  if (index !== -1) {
    mockContactDatabase.splice(index, 1);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Contact not found" }, { status: 404 });
}

