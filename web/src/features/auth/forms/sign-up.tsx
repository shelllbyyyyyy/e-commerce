/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import CustomFormField, { FormFieldType } from "@/components/ui/custom-form";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/ui/submit-button";

import Wrapper from "@/components/providers/wrapper";

import {
  RegisterFormSchema,
  registerFormSchema,
} from "@/shared/validations/auth";

export const SignUp = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const signUp: SubmitHandler<RegisterFormSchema> = async (value) => {
    try {
      setIsChecked(!isChecked);

      await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: value.username,
          email: value.email,
          password: value.password,
        }),
      });
      router.push(`/auth/send-verification/${value.email}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsChecked(!isChecked);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
        <section id="sign-up" className="w-1/2 flex flex-col gap-5">
          <h2 className="text-4xl font-bold">Hi There</h2>
          <h4>Please register first to continue shopping !</h4>
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(signUp)}
            >
              <CustomFormField
                className="py-5 rounded-md"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="username"
                label="Username"
                type="username"
                placeholder="john doe"
              />

              <CustomFormField
                className="py-5 rounded-md"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="example@email.com"
              />

              <CustomFormField
                className="py-5 rounded-md"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="********"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.CHECKBOX}
                name="eek"
                label={
                  <p>
                    By clicking register, I agree with the{" "}
                    <span className="text-primary">Terms and Conditions </span>
                  </p>
                }
                onClick={handleCheckboxChange}
              />
              <div className="space-y-3 text-center">
                <Button
                  className="w-full rounded-md py-5"
                  type="submit"
                  disabled={isChecked ? false : true}
                >
                  Register an account
                </Button>
              </div>
            </form>
          </Form>
          <div className="space-y-3 text-center">
            <SubmitButton
              className="w-full rounded-md py-5"
              type="submit"
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
              <Link href={"/auth/sign-in"}>
                Already have an account ?{" "}
                <span className="text-red-600">sign in</span>
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
