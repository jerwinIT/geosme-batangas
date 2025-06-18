import React from "react";
import { AboutHero, WhatWeDo, OurStoryImpact, MeetOurTeam } from "./index";

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <div className="">
        <AboutHero />
        <WhatWeDo />
        <OurStoryImpact />
        <MeetOurTeam />
      </div>
    </div>
  );
}
