"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyUser({
  params,
}: {
  params: { email: string; token: string };
}) {
  const { token, email } = params;
  const router = useRouter();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    async function verifyToken() {
      try {
        const response = await fetch(`/api/auth/activate-account/${token}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          setStatus("Verification successful!");
          router.push("/");
        } else {
          setStatus("Verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during verification:", error);
        setStatus("An error occurred during verification.");
      }
    }

    verifyToken();
  }, [token, router]);

  return <p>{status}</p>;
}
