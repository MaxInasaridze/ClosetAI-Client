"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/loginSchema";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/useAuth";

function LoginForm() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      login(response.user, response.token);
      console.log("Logged in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-md shadow-sm">

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block bg-violet-100 text-violet-700 text-xs font-medium px-3 py-1 rounded-full tracking-wide mb-4">
            Welcome back
          </span>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-medium">
            Sign in
          </p>
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
            Log in to your account
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={`w-full h-10 px-3 rounded-lg border bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:bg-white transition-all
                ${errors.email
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-200 focus:ring-violet-200 focus:border-violet-400"
                }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs text-violet-600 hover:text-violet-800 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              placeholder="Your password"
              {...register("password")}
              className={`w-full h-10 px-3 rounded-lg border bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:bg-white transition-all
                ${errors.password
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-200 focus:ring-violet-200 focus:border-violet-400"
                }`}
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2 mt-4 mb-6">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-gray-300 accent-violet-600 cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer select-none">
              Remember me for 30 days
            </label>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-5" />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-violet-700 hover:bg-violet-800 active:scale-[0.99] text-violet-50
              rounded-lg text-sm font-medium tracking-wide transition-all
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-5">
            Don't have an account?{" "}
            <a href="/register" className="text-violet-600 hover:text-violet-800 font-medium transition-colors">
              Create one
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}

export default LoginForm;