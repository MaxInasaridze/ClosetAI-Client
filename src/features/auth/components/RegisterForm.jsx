import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/registerSchema";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate("/login");
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
            Free forever
          </span>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-medium">
            Get started
          </p>
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
            Create your account
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. john_doe"
              {...register("username")}
              className={`w-full h-10 px-3 rounded-lg border bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:bg-white transition-all
                ${errors.username
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-200 focus:ring-violet-200 focus:border-violet-400"
                }`}
            />
            {errors.username && (
              <p className="mt-1.5 text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>

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
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Min. 8 characters"
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
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-violet-600 hover:text-violet-800 font-medium transition-colors">
              Sign in
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}

export default RegisterForm;