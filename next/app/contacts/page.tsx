import { getContacts } from "@/lib/server-api";
import ContactsClient from "./ContactsClient";

export default async function ContactsPage() {
  // Fetch data on the server
  const initialContacts = await getContacts();

  // Pass data to client component
  return <ContactsClient initialContacts={initialContacts} />;
}
