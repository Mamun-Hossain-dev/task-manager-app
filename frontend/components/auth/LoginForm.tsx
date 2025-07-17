"use client";
import { useAppDispatch } from "@/hooks/types/useAppDispatch";
import { useAppSelector } from "@/hooks/types/useAppSelector";
import { loginUser } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      router.push("/profile");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="email">
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
          className="w-full text-black px-3 py-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="password">
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
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
