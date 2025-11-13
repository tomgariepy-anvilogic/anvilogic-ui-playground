"use client";

import { useEffect } from "react";
import Button from "@/components/common/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        padding: "2rem",
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
        <h2 style={{ color: "#d32f2f", marginBottom: "1rem" }}>
          Something went wrong!
        </h2>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>
          {error.message || "An unexpected error occurred"}
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}

