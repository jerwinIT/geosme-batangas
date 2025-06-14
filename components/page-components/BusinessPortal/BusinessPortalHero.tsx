import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BusinessPortalHero() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Left content*/}
          <div className="w-full lg:flex-1">
            {/* Heading */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-left text-text mb-4 sm:mb-6 leading-tight">
                Put Your <span className="text-primary-500">Business</span> on
                the <span className="text-primary-500">Map</span>
              </h1>
            </div>
            {/* Body */}
            <div className="flex flex-col gap-6">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary">
                Join thousands of SMEs across Batangas Province who are growing
                their customer base and making data-driven decisions with GeoSME
                Batangas.
              </p>
            </div>

            {/* CTA - Register Your Business */}
            <div className="flex justify-start mt-8">
              <Link href="/register-business" className="text-primary-500">
                Register Your Business
              </Link>
            </div>
          </div>

          {/* Right content */}
          <div className="w-full lg:flex-1 max-w-2xl">
            <Image
              src="/images/about/geosme-mission.webp"
              alt="About GeoSME Batangas - Empowering local businesses through geospatial technology"
              width={700}
              height={450}
              className="w-full h-auto rounded-lg border-2 border-gray-200"
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        </div>
      </div>
    </div>
  );
}
