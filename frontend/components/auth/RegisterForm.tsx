"use client";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/types/useAppDispatch";
import { registerUser } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError(null); // clear previous errors
      await dispatch(registerUser(data)).unwrap();
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Registration failed:", err);
      setServerError(err?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <div className="mb-4 text-red-500 text-center">{serverError}</div>
      )}

      <div className="mb-4 text-gray-900">
        <label htmlFor="name" className="block text-gray-700 mb-2">
          Name
        </label>
        <input
          id="name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
          className="w-full px-3 py-2 border rounded-md text-black"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          className="w-full px-3 py-2 border text-black rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="w-full px-3 py-2 border rounded-md text-black"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
}
