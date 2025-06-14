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
      className="relative w-full min-h-[calc(40vh-5rem)] flex flex-col justify-center items-center py-12 sm:py-16 md:py-20 bg-primary-500 text-white"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Access our SME Owner Dashboard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-text">Already Listed?</CardTitle>
              <CardDescription className="text-text-secondary">
                Take control of your business presence and unlock growth
                opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-primary-500 hover:bg-primary-800"
                size="lg"
              >
                Claim My Business Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-background text-foreground">
            <CardHeader>
              <CardTitle className="text-text">Not Listed Yet?</CardTitle>
              <CardDescription className="text-text-secondary">
                Join hundreds of Batangas SMEs already growing with our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-primary-500 hover:bg-primary-800"
                size="lg"
              >
                Register My Business - Free
                <UserPlus className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
