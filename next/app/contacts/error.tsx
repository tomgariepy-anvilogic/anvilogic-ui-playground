"use client";

import { useEffect } from "react";
import Button from "@/components/common/Button";

export default function ContactsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Contacts page error:", error);
  }, [error]);

  return (
    <div>
      <h2>Contacts</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            padding: "2rem",
            backgroundColor: "#ffebee",
            borderRadius: "12px",
            border: "1px solid #ef5350",
          }}
        >
          <h3 style={{ color: "#d32f2f", marginTop: 0, marginBottom: "1rem" }}>
            Failed to load contacts
          </h3>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            {error.message || "Could not load your contacts"}
          </p>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
            <Button onClick={reset}>Try again</Button>
            <Button variant="secondary" onClick={() => window.location.href = "/"}>
              Go home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

