"use client";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <LoginForm />

        <div className="mt-4 text-center">
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Dont have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
