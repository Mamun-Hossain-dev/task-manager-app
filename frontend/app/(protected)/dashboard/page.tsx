// src/app/(protected)/dashboard/page.tsx
"use client";
import { useAppDispatch } from "@/hooks/types/useAppDispatch";
import { useAppSelector } from "@/hooks/types/useAppSelector";
import { logoutUser } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>

        {user.role === "admin" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
            <p>Admin-specific content goes here</p>
          </div>
        )}
      </div>
    </div>
  );
}
