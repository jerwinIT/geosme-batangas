import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/main/ui/card";
import { CheckCircle2 } from "lucide-react";
import { title } from "process";
import React from "react";

const forBusinessExplorers = [
  {
    title: "Comprehensive Coverage",
    description: " Access to every registered SME in Batangas Province",
  },
  {
    title: "Community-Driven",
    description: "Real reviews and ratings from fellow Batangueños",
  },
  {
    title: "Navigation Made Easy",
    description: "Never get lost finding local businesses again",
  },
  {
    title: "Market SME Insights",
    description:
      "View trends, foot traffic, business density, and opportunities",
  },
];

const forSMEOwners = [
  {
    title: "Increased Visibility",
    description: "Get discovered by thousands of potential customers",
  },
  {
    title: "Business Intelligence",
    description: "Understand your market and competition like never before",
  },
  {
    title: "Customer Insights",
    description: "Track engagement and improve customer satisfaction",
  },
  {
    title: "Growth Tools",
    description: "Data-driven recommendations for business expansion",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-12 sm:py-16 md:py-20">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-text">
            Why <span className="text-primary-500">Choose</span> GeoSME
            Batangas?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary leading-relaxed">
            Discover the advantages that make us the premier platform for
            business discovery and growth in Batangas Province
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* For Business Explorers & Consumers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary">
                For Business Explorers & Consumers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {forBusinessExplorers.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-white fill-primary-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-text font-bold">{item.title}</span>
                      <span className="text-text-secondary text-sm">
                        {item.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* For SME Owners */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary">
                For SME Owners
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {forSMEOwners.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-white fill-primary-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-text font-bold">{item.title}</span>
                      <span className="text-text-secondary text-sm">
                        {item.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .animate-fade-in {
      opacity: 1 !important;
    }
  `;
  if (!document.head.querySelector("style[data-what-we-offer]")) {
    style.setAttribute("data-what-we-offer", "true");
    document.head.appendChild(style);
  }
}
