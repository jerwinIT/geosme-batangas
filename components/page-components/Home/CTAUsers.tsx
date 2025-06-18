import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, UserPlus } from "lucide-react";

export default function CTAUsers() {
  return (
    <section
      id="portal"
      className="relative w-full min-h-[calc(40vh-5rem)] flex flex-col justify-center items-center py-8 sm:py-12 md:py-16 lg:py-20 bg-primary-500 text-white"
    >
      <div className="container px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-[100px]">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight text-white">
            Access our SME Owner Dashboard
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          <Card className="bg-background hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="space-y-2 sm:space-y-3">
              <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-text">
                Already Listed?
              </CardTitle>
              <CardDescription className="text-text-secondary text-sm sm:text-base">
                Take control of your business presence and unlock growth
                opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-primary-500 hover:bg-primary-800 text-sm sm:text-base py-2 sm:py-3"
                size="lg"
              >
                Claim My Business Profile
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-background text-foreground hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="space-y-2 sm:space-y-3">
              <CardTitle className="text-base sm:text-lg md:text-xl font-semibold text-text">
                Not Listed Yet?
              </CardTitle>
              <CardDescription className="text-text-secondary text-sm sm:text-base">
                Join hundreds of Batangas SMEs already growing with our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-primary-500 hover:bg-primary-800 text-sm sm:text-base py-2 sm:py-3"
                size="lg"
              >
                Register My Business - Free
                <UserPlus className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
