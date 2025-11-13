"use client";

import { useEffect } from "react";
import Button from "@/components/common/Button";

export default function TasksError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Tasks page error:", error);
  }, [error]);

  return (
    <div className="tasks-page">
      <div
        style={{
          gridColumn: "1 / -1",
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
          <h2 style={{ color: "#d32f2f", marginBottom: "1rem" }}>
            Failed to load tasks
          </h2>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            {error.message || "Could not load your task lists"}
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

