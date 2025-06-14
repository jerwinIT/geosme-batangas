"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  HiEye,
  HiEyeSlash,
  HiShieldCheck,
  HiUser,
  HiEnvelope,
  HiLockClosed,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  className?: string;
}

interface FormData {
  email: string;
  password: string;
  twoFactorCode: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  twoFactorCode?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"google" | "manual">("google");
  const [step, setStep] = useState<"form" | "2fa">("form");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    twoFactorCode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      // Once next-auth is installed, uncomment this:
      const { signIn } = await import("next-auth/react");
      await signIn("google", { callbackUrl: "/" });

      // Placeholder action - remove this when NextAuth is set up
      console.log("Google sign-in initiated");
      setTimeout(() => {
        setIsLoading(false);
        alert(
          "Google sign-in demo - Please install next-auth to enable real authentication"
        );
      }, 1500);
    } catch (error) {
      console.error("Sign-in error:", error);
      setIsLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleManualLogin = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // Attempt login
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (loginResponse.ok) {
        const userData = await loginResponse.json();
        console.log("Login successful:", userData);

        // Check if user has 2FA enabled
        if (userData.requiresTwoFactor) {
          setStep("2fa");
        } else {
          // Redirect to dashboard or home
          alert("Login successful!");
          // Reset form
          setFormData({
            email: "",
            password: "",
            twoFactorCode: "",
          });
        }
      } else {
        const error = await loginResponse.json();
        if (error.details) {
          // Handle validation errors
          const newErrors: FormErrors = {};
          error.details.forEach((detail: any) => {
            newErrors[detail.field as keyof FormErrors] = detail.message;
          });
          setErrors(newErrors);
        } else {
          // Handle general login errors
          if (error.field === "email") {
            setErrors({ email: error.error || "Invalid email or password" });
          } else if (error.field === "password") {
            setErrors({ password: error.error || "Invalid email or password" });
          } else {
            alert(error.error || "Login failed");
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorLogin = async () => {
    if (!formData.twoFactorCode.trim()) {
      setErrors({ twoFactorCode: "Please enter the 6-digit code" });
      return;
    }

    if (formData.twoFactorCode.length !== 6) {
      setErrors({ twoFactorCode: "Code must be 6 digits" });
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});

      // Verify 2FA code
      const response = await fetch("/api/auth/2fa/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          code: formData.twoFactorCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful with 2FA!");
        // Reset form and redirect
        setFormData({
          email: "",
          password: "",
          twoFactorCode: "",
        });
        setStep("form");
        setLoginMethod("google");
      } else {
        setErrors({ twoFactorCode: data.error || "Invalid verification code" });
      }
    } catch (error) {
      console.error("2FA verification error:", error);
      setErrors({ twoFactorCode: "An error occurred during verification" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  // 2FA Verification Step
  if (step === "2fa") {
    return (
      <div className={cn("space-y-4 sm:space-y-6", className)}>
        <div className="rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <HiShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-text">
                Two-Factor Authentication
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 sm:mt-2">
                Enter the code from your authenticator app
              </p>
            </div>

            {/* Instructions */}
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                Open your authenticator app and enter the 6-digit code for{" "}
                <span className="font-medium text-text">{formData.email}</span>
              </p>
            </div>

            {/* 2FA Code Input */}
            <div className="space-y-4">
              <Input
                label="Authentication Code"
                type="text"
                placeholder="000000"
                value={formData.twoFactorCode}
                onChange={handleInputChange("twoFactorCode")}
                error={errors.twoFactorCode}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />

              <Button
                onClick={handleTwoFactorLogin}
                disabled={isLoading || formData.twoFactorCode.length !== 6}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Verifying..." : "Sign In"}
              </Button>
            </div>

            {/* Back Button */}
            <Button
              onClick={() => {
                setStep("form");
                setFormData((prev) => ({ ...prev, twoFactorCode: "" }));
                setErrors({});
              }}
              variant="ghost"
              className="w-full"
              disabled={isLoading}
            >
              Back to Login
            </Button>

            {/* Help */}
            <div className="text-center">
              <p className="text-xs text-text-secondary">
                Lost access to your authenticator?{" "}
                <a
                  href="/auth/recovery"
                  className="text-primary-500 hover:text-primary-600 underline"
                >
                  Use backup code
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4 sm:space-y-6", className)}>
      {/* Login Method Toggle */}
      <div className="bg-background rounded-lg shadow-sm border border-gray-200 p-1 flex">
        <button
          onClick={() => setLoginMethod("google")}
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
            loginMethod === "google"
              ? "bg-primary-500 text-white shadow-sm"
              : "text-text-secondary hover:text-text"
          )}
        >
          Google Sign-in
        </button>
        <button
          onClick={() => setLoginMethod("manual")}
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
            loginMethod === "manual"
              ? "bg-primary-500 text-white shadow-sm"
              : "text-text-secondary hover:text-text"
          )}
        >
          Email & Password
        </button>
      </div>

      {/* Google Sign-in */}
      {loginMethod === "google" && (
        <div className="bg-background rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white font-bold text-lg sm:text-xl">
                  G
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-text">
                Sign in with Google
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 sm:mt-2">
                Quick and secure authentication
              </p>
            </div>

            {/* Google Sign-in Button */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              size="lg"
              className="w-full h-11 sm:h-12 flex items-center justify-center gap-2 sm:gap-3 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-text font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 border-top-primary-500 rounded-full animate-spin" />
              ) : (
                <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="text-sm sm:text-base">
                {isLoading ? "Signing in..." : "Continue with Google"}
              </span>
            </Button>

            {/* Features */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                <span>No password required</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                <span>Secure Google authentication</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                <span>Access all GeoSME features</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Login */}
      {loginMethod === "manual" && (
        <div className="bg-background rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <HiLockClosed className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-text">
                Welcome back
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 sm:mt-2">
                Sign in to your account
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Email */}
              <div className="relative">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  error={errors.email}
                  className="pl-10"
                />
                <HiEnvelope className="absolute left-3 top-8 w-4 h-4 text-text-secondary" />
              </div>

              {/* Password */}
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  error={errors.password}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 w-4 h-4 text-text-secondary hover:text-text transition-colors"
                >
                  {showPassword ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <a
                  href="/auth/forgot-password"
                  className="text-xs sm:text-sm text-primary-500 hover:text-primary-600 underline"
                >
                  Forgot your password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleManualLogin}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <HiShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium">Secure Login</p>
                  <p>
                    Your login is protected with industry-standard encryption
                    and optional two-factor authentication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Link */}
      <div className="text-center text-xs sm:text-sm text-text-secondary">
        <p>
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-primary-500 hover:text-primary-600 underline font-medium"
          >
            Sign up here
          </a>
        </p>
      </div>

      {/* Terms and Privacy */}
      <div className="text-center text-xs text-text-secondary space-y-1">
        <p>
          By signing in, you agree to our{" "}
          <a
            href="/terms"
            className="text-primary-500 hover:text-primary-600 underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-primary-500 hover:text-primary-600 underline"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
