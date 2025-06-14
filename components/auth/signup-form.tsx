"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  HiEye,
  HiEyeSlash,
  HiQrCode,
  HiShieldCheck,
  HiUser,
  HiEnvelope,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SignUpFormProps {
  className?: string;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  twoFactorCode: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  twoFactorCode?: string;
}

export function SignUpForm({ className }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupMethod, setSignupMethod] = useState<"google" | "manual">(
    "google"
  );
  const [step, setStep] = useState<"form" | "2fa">("form");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and numbers";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleManualSignUp = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // Create user account
      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      if (registerResponse.ok) {
        const userData = await registerResponse.json();
        console.log("User created:", userData);

        // Generate 2FA setup
        const twoFAResponse = await fetch("/api/auth/2fa/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            username: formData.username,
          }),
        });

        if (twoFAResponse.ok) {
          const data = await twoFAResponse.json();
          setQrCodeUrl(data.qrCodeUrl);
          setStep("2fa");
        } else {
          const error = await twoFAResponse.json();
          alert(error.error || "Failed to set up 2FA");
        }
      } else {
        const error = await registerResponse.json();
        if (error.details) {
          // Handle validation errors
          const newErrors: FormErrors = {};
          error.details.forEach((detail: any) => {
            newErrors[detail.field as keyof FormErrors] = detail.message;
          });
          setErrors(newErrors);
        } else {
          alert(error.error || "Failed to create account");
        }
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorSetup = async () => {
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
      const response = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: formData.twoFactorCode,
          secret: "placeholder_secret", // This would come from the previous step
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          `Account created successfully with 2FA enabled!\n\nBackup codes:\n${data.backupCodes.join(
            "\n"
          )}\n\nPlease save these codes in a secure location.`
        );
        // Reset form or redirect
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          twoFactorCode: "",
        });
        setStep("form");
        setSignupMethod("google");
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

  const getPasswordStrength = (
    password: string
  ): { strength: number; text: string; color: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, text: "Weak", color: "bg-red-500" };
    if (strength <= 3)
      return { strength, text: "Fair", color: "bg-yellow-500" };
    if (strength <= 4) return { strength, text: "Good", color: "bg-blue-500" };
    return { strength, text: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // 2FA Setup Step
  if (step === "2fa") {
    return (
      <div className={cn("space-y-4 sm:space-y-6", className)}>
        <div className="bg-background rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <HiShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-text">
                Set up Two-Factor Authentication
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 sm:mt-2">
                Secure your account with 2FA
              </p>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mx-auto w-fit">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="2FA QR Code"
                    className="w-32 h-32 sm:w-40 sm:h-40 mx-auto"
                  />
                ) : (
                  <>
                    <HiQrCode className="w-24 h-24 sm:w-32 sm:h-32 text-gray-400 mx-auto" />
                    <p className="text-xs text-text-secondary mt-2">
                      QR Code Placeholder
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-3 text-sm text-text-secondary">
              <p className="font-medium text-text">Follow these steps:</p>
              <ol className="space-y-2 list-decimal list-inside">
                <li>
                  Download an authenticator app (Google Authenticator, Authy,
                  etc.)
                </li>
                <li>Scan the QR code above with your authenticator app</li>
                <li>Enter the 6-digit code from your app below</li>
              </ol>
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
                onClick={handleTwoFactorSetup}
                disabled={isLoading || formData.twoFactorCode.length !== 6}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Verifying..." : "Complete Setup"}
              </Button>
            </div>

            {/* Back Button */}
            <Button
              onClick={() => setStep("form")}
              variant="ghost"
              className="w-full"
              disabled={isLoading}
            >
              Back to Registration
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4 sm:space-y-6", className)}>
      {/* Sign-up Method Toggle */}
      <div className="bg-background rounded-lg shadow-sm border border-gray-200 p-1 flex">
        <button
          onClick={() => setSignupMethod("google")}
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
            signupMethod === "google"
              ? "bg-primary-500 text-white shadow-sm"
              : "text-text-secondary hover:text-text"
          )}
        >
          Google Sign-in
        </button>
        <button
          onClick={() => setSignupMethod("manual")}
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
            signupMethod === "manual"
              ? "bg-primary-500 text-white shadow-sm"
              : "text-text-secondary hover:text-text"
          )}
        >
          Create Account
        </button>
      </div>

      {/* Google Sign-in */}
      {signupMethod === "google" && (
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
                Sign up with Google
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

      {/* Manual Sign-up */}
      {signupMethod === "manual" && (
        <div className="bg-background rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <HiUser className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-text">
                Create your account
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 sm:mt-2">
                Fill in your details to get started
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Username */}
              <div className="relative">
                <Input
                  label="Username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange("username")}
                  error={errors.username}
                  className="pl-10"
                />
                <HiUser className="absolute left-3 top-8 w-4 h-4 text-text-secondary" />
              </div>

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
                  placeholder="Create a strong password"
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

              {/* Password Strength */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">
                      Password strength:
                    </span>
                    <span
                      className={cn(
                        "font-medium",
                        passwordStrength.strength <= 2
                          ? "text-red-500"
                          : passwordStrength.strength <= 3
                          ? "text-yellow-500"
                          : passwordStrength.strength <= 4
                          ? "text-blue-500"
                          : "text-green-500"
                      )}
                    >
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        passwordStrength.color
                      )}
                      style={{
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Confirm Password */}
              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  error={errors.confirmPassword}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-8 w-4 h-4 text-text-secondary hover:text-text transition-colors"
                >
                  {showConfirmPassword ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>

              {/* 2FA Notice */}
              <div className="bg-primary-500 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <HiShieldCheck className="w-4 h-4 text-[#fff] text-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-[#fff]">
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p>
                      You'll set up 2FA after creating your account for enhanced
                      security.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleManualSignUp}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Privacy */}
      <div className="text-center text-xs text-text-secondary space-y-1">
        <p>
          By signing up, you agree to our{" "}
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
