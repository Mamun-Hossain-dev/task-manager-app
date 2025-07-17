"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center underline ">
          Register Here
        </h1>

        <RegisterForm />

        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-600 hover:underline">
            already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
