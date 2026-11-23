"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  LoaderCircle,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { verifyResetCode } from "@/actions/forgetPassword.actions";

function VerifyResetCodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!email) {
      toast.error("Email is missing. Please start again.");
      router.push("/forgot-password");
      return;
    }

    if (!resetCode.trim()) {
      toast.error("Please enter the verification code");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyResetCode(resetCode.trim());

      toast.success(
        response.message || "Code verified successfully!"
      );

      router.push(
        `/reset-password?email=${encodeURIComponent(email)}`
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Invalid verification code"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
          <ShieldCheck size={27} />
        </div>

        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Verify Your Code
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Enter the verification code sent to your email.
          </p>

          {email && (
            <p className="mt-2 text-sm font-medium text-gray-700">
              {email}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Verification Code
            </label>

            <input
              type="text"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              placeholder="Enter verification code"
              className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>
        </form>

        <Link
          href="/forgot-password"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-600"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>
    </section>
  );
}

export default function VerifyResetCode() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-[75vh] items-center justify-center bg-[#F8FAFC] px-4 py-10">
          <LoaderCircle size={28} className="animate-spin text-green-600" />
        </section>
      }
    >
      <VerifyResetCodeForm />
    </Suspense>
  );
}