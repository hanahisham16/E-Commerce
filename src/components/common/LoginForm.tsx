"use client";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { UserPlus, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginSchemaType,
  registerSchema,
  RegisterSchemaType,
} from "@/lib/schemas/auth.schema";
import SignupUser, { SigninUser } from "@/services/auth.services";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleUserRegister(values: LoginSchemaType) {
    // try {
    //   const response = await SigninUser(values);
    //   console.log(response);
    //   if (response.message === "success") {
    //     toast.success("Login successfully");
    //     router.push("/");
    //   } else {
    //     toast.error(response.message || "Something went wrong");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Failed to connect to the server.");
    // }
    const response = await signIn("credentials", {
      email: values?.email,
      password: values?.password,
      redirect: false,
    });
    if (response?.ok) {
      toast.success("Login successfully");
      router.push("/");
    } else {
      toast.error(response?.error || "Something went wrong");
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-emerald-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <h2 className="text-center text-[#364153] text-3xl font-semibold mb-2">
            Welcome Back!
          </h2>
          <p className="text-center  text-[#364153]">
            Sign in to continue your fresh shopping experience
          </p>
        </div>
        <div className="space-y-3 mb-6">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
          >
            <FaGoogle className="me-2 text-red-600" size={20} />
            <span className="font-semibold">Continue with Google</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
          >
            <FaFacebook className="me-2 text-blue-600" size={20} />{" "}
            <span className="font-semibold">Continue with Facebook</span>
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>

          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">
              OR CONTINUE WITH EMAIL
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleUserRegister)} className="space-y-7">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="ali@example.com"
                  type="email"
                  className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
                    fieldState.invalid
                      ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
                  }`}
                />
                {fieldState.invalid && (
                  <span className="text-xs text-red-500 font-medium">
                    {fieldState.error?.message}
                  </span>
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between mb-2">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <a
                    className="text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium"
                    href="/forget-password"
                  >
                    Forget Password ?
                  </a>
                </div>

                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="create a strong password"
                  type="password"
                  className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
                    fieldState.invalid
                      ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
                  }`}
                />
                {fieldState.invalid && (
                  <span className="text-xs text-red-500 font-medium">
                    {fieldState.error?.message}
                  </span>
                )}
              </Field>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 flex items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="me-2 animate-spin" size={20} />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>
        <div className="mt-6 border-t-1 p-8 flex flex-col items-center space-y-4">
          {/* رابط إنشاء حساب جديد */}
          <div className="text-sm text-gray-600">
            New to FreshCart?{" "}
            <a
              href="/register"
              className="text-emerald-500 font-medium hover:underline"
            >
              Create an account
            </a>
          </div>

          {/* أيقونات ومعلومات الثقة */}
          <div className="flex items-center space-x-6 text-xs text-gray-500 pt-2">
            {/* SSL Secured */}
            <div className="flex items-center space-x-1.5">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>SSL Secured</span>
            </div>

            {/* 50K+ Users */}
            <div className="flex items-center space-x-1.5">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>50K+ Users</span>
            </div>

            {/* 4.9 Rating */}
            <div className="flex items-center space-x-1.5">
              <svg
                className="w-4 h-4 text-yellow-500 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-semibold text-gray-700">4.9 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
