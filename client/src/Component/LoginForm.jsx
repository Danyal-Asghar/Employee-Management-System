// LoginLandingPremium.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  User,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

const LoginLeftSide = () => {
  return (
    <div className="hidden md:flex w-1/2 relative overflow-hidden border-r border-slate-800 bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900">
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]"></div>

      <div className="relative z-10 flex flex-col items-start justify-center p-12 lg:p-20 w-full h-full">
        <span className="mb-6 inline-block px-4 py-1 text-xs font-medium text-indigo-200 bg-indigo-500/10 border border-indigo-400/20 rounded-full backdrop-blur">
          HR Management Platform
        </span>

        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight">
          Employee <br /> Management System
        </h1>

        <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed">
          Streamline your workforce operations, track attendance, manage payroll,
          and empower your team securely.
        </p>

        <div className="mt-10 flex items-center gap-3 text-sm text-slate-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Trusted by modern teams
        </div>
      </div>
    </div>
  );
};

const FloatingInput = ({
  type = "text",
  value,
  onChange,
  label,
  required = false,
  rightElement = null,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full rounded-lg border border-slate-300 px-4 pt-6 pb-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition appearance-none"
      />

      <label
        className="
          absolute left-4 top-1/2 -translate-y-1/2
          text-slate-400 text-base
          transition-all duration-200
          pointer-events-none
          peer-focus:top-2 peer-focus:translate-y-0
          peer-focus:text-xs peer-focus:text-indigo-600
          peer-[:not(:placeholder-shown)]:top-2
          peer-[:not(:placeholder-shown)]:translate-y-0
          peer-[:not(:placeholder-shown)]:text-xs
        "
      >
        {label}
      </label>

      {rightElement}
    </div>
  );
};

const LoginLandingPremium = () => {
  const [selectedPortal, setSelectedPortal] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const portalOptions = [
    {
      title: "Admin Portal",
      description:
        "Manage employees, departments, payroll, and system configurations.",
      icon: Shield,
      role: "admin",
    },
    {
      title: "Employee Portal",
      description:
        "View your profile, track attendance, request time off, and access payslips.",
      icon: User,
      role: "employee",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      setError("Invalid credentials");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <LoginLeftSide />

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>

        <div className="w-full max-w-md relative z-10">
          {!selectedPortal ? (
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6 text-center">
                Select Your Portal
              </h2>

              {portalOptions.map((portal) => {
                const Icon = portal.icon;

                return (
                  <div
                    key={portal.role}
                    onClick={() => setSelectedPortal(portal)}
                    className="group cursor-pointer relative block rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-200/40 hover:-translate-y-1"
                  >
                    <div className="relative flex items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-white shadow-sm">
                          <Icon className="w-5 h-5 text-slate-600" />
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                            {portal.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            {portal.description}
                          </p>
                        </div>
                      </div>

                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-8 sm:p-10">
              <Link
                to="#"
                onClick={() => setSelectedPortal(null)}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 text-sm mb-8"
              >
                <ArrowLeft size={16} /> Back
              </Link>

              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                {selectedPortal.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-500 mb-6">
                Sign in to continue
              </p>

              {error && (
                <div className="mb-4 text-red-500 text-sm font-medium">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleLogin}>
                <FloatingInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email address"
                  required
                />

                <FloatingInput
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  }
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 font-semibold transition disabled:opacity-50"
                >
                  {loading && <Loader2 className="animate-spin" />}
                  Sign in
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginLandingPremium;