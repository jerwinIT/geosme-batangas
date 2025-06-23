import React from "react";
import type { Metadata } from "next";
import {
  AdvanceBusinessTools,
  BusinessPortalHero,
  StrategicBusinessIntelligence,
  GetStarted,
} from "./index";

export const metadata: Metadata = {
  title: "Business Portal | GeoSME Batangas",
  description: "Business Portal | GeoSME Batangas",
};

export default function BusinessPortalPage() {
  return (
    <div>
      <BusinessPortalHero />
      <StrategicBusinessIntelligence />
      <AdvanceBusinessTools />
      <GetStarted />
    </div>
  );
}
