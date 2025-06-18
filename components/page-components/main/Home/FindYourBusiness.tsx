import Badge from "@/components/ui/badge";
import { Search } from "lucide-react";

export default function FindYourBusiness() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-12 sm:py-16 md:py-20  ">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <div className="text-center mb-8">
          <Badge icon={<Search className="w-4 h-4 text-primary-500" />}>
            Find Your Business
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-text">
            <span className="text-primary-500">Search</span> for your business
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Check if your business is already listed in our comprehensive SME
            database
          </p>
        </div>

        <div className="justify-center gap-4 w-full flex flex-col items-center">
          {/* Search Container */}
          <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] max-w-4xl p-4 sm:p-5 md:p-6 rounded-2xl border border-gray-100 bg-white/50 backdrop-blur-sm shadow-sm">
            {/* Search Bar */}
            <div className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-2xl mx-auto">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by business name..."
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-300 bg-white shadow-sm"
              />
            </div>

            {/* Search Suggestions */}
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-500 mb-2">
                Try searching for businesses like:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Restaurants",
                  "Coffee Shops",
                  "Retail Stores",
                  "Beauty Salons",
                  "Auto Repair",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
                    onClick={() => {
                      /* TODO: Implement search suggestion click */
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Separator */}
            <div className="mt-10 mb-10 w-full max-w-[200px] mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>

            {/* Search States */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search State */}
              <div className="flex flex-col items-center text-center p-4 rounded-xl ">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Search
                </h3>
                <p className="text-sm text-gray-600">
                  Enter your business name to check if it's listed
                </p>
              </div>

              {/* Found State */}
              <div className="flex flex-col items-center text-center p-4 rounded-xl ">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Found
                </h3>
                <p className="text-sm text-gray-600">
                  Claim your business profile and start managing it
                </p>
              </div>

              {/* Not Found State */}
              <div className="flex flex-col items-center text-center p-4 rounded-xl ">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Not Found
                </h3>
                <p className="text-sm text-gray-600">
                  Register your business for free and get discovered
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
