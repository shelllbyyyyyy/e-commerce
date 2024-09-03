"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Wrapper from "@/components/providers/wrapper";
import { Button } from "@/components/ui/button";

const SendVerification = ({ params }: { params: { email: string } }) => {
  const { email } = params;
  const router = useRouter();
  const [counter, setCounter] = useState(60);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (counter === 0) {
      setIsLoading(false);
      return;
    }

    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const resendVerification = async () => {
    try {
      await fetch(`/api/resend-verification/${email}`, {
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <Wrapper className="flex flex-col justify-center items-center py-16 gap-3 h-screen">
      <h4>Please check your email to activate your account</h4>
      <p className="mt-4 text-gray-600">
        Resend verification in <span className="font-semibold">{counter}</span>{" "}
        seconds.
      </p>
      <Button disabled={isLoading} onClick={resendVerification}>
        Resend Verification
      </Button>
    </Wrapper>
  );
};

export default SendVerification;
