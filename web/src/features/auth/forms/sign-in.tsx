/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import CustomFormField, { FormFieldType } from "@/components/ui/custom-form";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/ui/submit-button";

import Wrapper from "@/components/providers/wrapper";

import { loginFormSchema, LoginFormSchema } from "@/shared/validations/auth";
import { useRouter } from "next/navigation";

export const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const signInWithPassword: SubmitHandler<LoginFormSchema> = async (value) => {
    try {
      setIsLoading(true);
      const result = await fetch("/api/auth/sign-in", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
        }),
      });

      const res = await result.json();

      if (res) {
        router.push("/");
      }

      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const google = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
      setIsLoading(true);

      location.href = `${baseUrl}/auth/google`;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper className="flex justify-center items-center py-16">
      <div className="flex w-full justify-between overflow-hidden">
        <section id="sign-in" className="w-1/2 flex flex-col gap-5">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <h4>Please enter your credentials</h4>
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(signInWithPassword)}
            >
              <CustomFormField
                className="rounded-md py-5"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="example@email.com"
              />

              <CustomFormField
                className="rounded-md py-5"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="********"
              />

              <div className="flex justify-between text-center items-center">
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  control={form.control}
                  name="checkbox"
                  label="Remember me"
                />
                <Button variant={"link"}>
                  <Link href={"/auth/forgot-password"}>Forgot password ?</Link>
                </Button>
              </div>
              <div className="space-y-3 text-center">
                <SubmitButton
                  className="w-full rounded-md py-5"
                  type="submit"
                  isLoading={isLoading}
                >
                  Sign In
                </SubmitButton>
              </div>
            </form>
          </Form>
          <div className="space-y-3 text-center">
            <SubmitButton
              className="w-full rounded-md py-5"
              isLoading={isLoading}
              onClick={google}
            >
              <Image
                src={"/assets/google.svg"}
                height={20}
                width={20}
                alt="google logo"
                className="mr-2"
              />
              Continue with google
            </SubmitButton>
            <Button variant={"link"}>
              <Link href={"/auth/sign-up"}>
                Don't have an account ?{" "}
                <span className="text-red-600">sign up for free</span>
              </Link>
            </Button>
          </div>
        </section>
        <figure className="w-1/2 flex place-content-end">
          <Image
            alt="logo"
            src="/assets/auth.png"
            width={540}
            height={650}
            priority
            className="object-cover"
          />
        </figure>
      </div>
    </Wrapper>
  );
};
