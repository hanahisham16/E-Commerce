
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Mail,
  ArrowLeft,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/lib/schemas/auth.schema";
import forgotPassword from "@/actions/forgetPassword.actions";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordSchemaType) {
    try {
      setLoading(true);

      const response = await forgotPassword(values.email);

      setUserEmail(values.email);
      setEmailSent(true);

      toast.success(
        response.message || "Reset code sent successfully!"
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
          {emailSent ? (
            <Mail size={27} />
          ) : (
            <LockKeyhole size={27} />
          )}
        </div>

        {!emailSent ? (
          <>
            <div className="mb-7 text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Forgot Password?
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Don't worry! Enter your email address and we'll send you
                a code to reset your password.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email")}
                    className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Code"
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Check Your Email
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              We've sent a password reset code to:
            </p>

            <p className="mt-2 font-semibold text-gray-800">
              {userEmail}
            </p>

            <Link
              href={`/verify-reset-code?email=${encodeURIComponent(userEmail)}`}
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Verify Reset Code
            </Link>
          </div>
        )}

        <Link
          href="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-600"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </section>
  );
}
