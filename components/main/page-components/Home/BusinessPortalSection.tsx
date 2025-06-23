import React from "react";
import Image from "next/image";
import { ChartLine, ArrowRight, Briefcase } from "lucide-react";
import { IoFootsteps } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { IoMdTrendingUp } from "react-icons/io";
import CTAButton from "@/components/main/ui/Buttons/CTAButton";
import { Badge } from "@/components/main/ui";
import { Card, CardHeader, CardTitle } from "@/components/main/ui/card";

const analyticsFeatures = [
  {
    title: "Performance Metrics",
    description:
      "Track how many users navigate to your business and monitor your online presence.",
    icon: <ChartLine />,
  },
  {
    title: "Competitor Analysis",
    description:
      "Understand your competitive landscape and identify opportunities for growth.",
    icon: <IoFootsteps />,
  },
  {
    title: "Review Management",
    description:
      "Monitor ratings and comments from customers to improve your service quality.",
    icon: <VscGraph />,
  },
  {
    title: "Business Profile",
    description:
      "Manage your business information, photos, and contact details in one place.",
    icon: <IoMdTrendingUp />,
  },
];

export default function BusinessPortalSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-12 sm:py-16 md:py-20">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 mx-auto animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-center justify-between">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 order-1">
              <div className="relative w-full aspect-[3/2] bg-gray-200 animate-pulse rounded overflow-hidden">
                <Image
                  src="https://imageplaceholder.net/600x600"
                  alt="Image"
                  fill
                  className="object-cover"
                  placeholder="empty"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left order-2">
              <Badge icon={<Briefcase className="w-4 h-4 text-primary-500" />}>
                Business Portal
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-text">
                <span className="text-primary-500">Business Portal</span> for
                SME Owners
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed mb-10">
                Take control of your business presence with our comprehensive
                portal. Track performance, analyze competitors, and engage with
                customers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {analyticsFeatures.map((feature, index) => (
                  <Card key={index} className="w-full h-full">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                          <div className="text-2xl text-primary-500">
                            {feature.icon}
                          </div>
                          <p className="text-base lg:text-lg font-semibold text-text">
                            {feature.title}
                          </p>
                        </div>
                      </CardTitle>
                      <p className="text-sm text-text-secondary">
                        {feature.description}
                      </p>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center lg:justify-start">
                <CTAButton
                  href="/analytics"
                  className="mt-10"
                  icon={ArrowRight}
                  variant="primary"
                >
                  Access Business Portal
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
