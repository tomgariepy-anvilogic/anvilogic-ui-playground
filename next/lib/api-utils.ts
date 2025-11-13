// API delay helper for simulating network latency
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Simulate occasional API errors (10% chance)
export const simulateRandomError = (errorMessage: string) => {
  if (Math.random() < 0.1) {
    throw new Error(errorMessage);
  }
};

