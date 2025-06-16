import { Metadata } from "next";
import { LoginForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your GeoSME account to access business insights, fintech adoption data, and location-based market analysis for SMEs in Batangas Province.",
  keywords:
    "login, sign in, GeoSME, Batangas, SME, fintech, business analytics",
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm sm:text-base text-text-secondary">
            Sign in to access business insights and fintech data for Batangas
            SMEs
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
