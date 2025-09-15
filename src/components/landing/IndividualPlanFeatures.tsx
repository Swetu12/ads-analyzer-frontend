import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  allFeatures,
  planFeatures,
} from "@/lib/constants/IndividualPricingPlansSection";

function isFeatureIncluded(
  featureName: string,
  planKey: keyof typeof planFeatures,
) {
  return planFeatures[planKey].included.includes(featureName);
}

function getFeatureLimit(
  featureName: string,
  planKey: keyof typeof planFeatures,
) {
  return planFeatures[planKey].limits[
    featureName as keyof (typeof planFeatures)[typeof planKey]["limits"]
  ];
}

function FeatureCard({
  feature,
  included,
  limit,
}: {
  feature: { name: string; description: string };
  included: boolean;
  limit?: string;
}) {
  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h4 className="font-medium text-sm">{feature.name}</h4>
            <p className="text-sm text-slate-500 mt-1">{feature.description}</p>
            {limit && (
              <p className="text-xs text-slate-500 mt-1 italic">{limit}</p>
            )}
          </div>
          <div className="pt-1">
            {included ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <X className="h-5 w-5 text-slate-300" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PlanFeatureSections() {
  return (
    <div className="space-y-16 mx-5 md:mx-28 md:space-y-24 mt-16 md:mt-24">
      {Object.entries(planFeatures).map(([planKey, plan]) => (
        <section key={planKey} id={`plan-${planKey}`} className="scroll-mt-16">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {plan.name}
            </h2>
            <p className="text-base md:text-lg text-gray-400 mt-2">
              {plan.description}
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {allFeatures.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-200">
                  {category.category}
                </h3>

                {/* Desktop view - Table */}
                <div className="hidden md:block rounded-lg border border-gray-800 overflow-hidden">
                  <Table
                    className={`bg-gradient-to-b from-[#1e1e1e] to-[#111]`}
                  >
                    <TableHeader>
                      <TableRow className="bg-gradient-to-b from-[#1e1e1e] to-[#111]">
                        <TableHead className="w-1/3">Feature</TableHead>
                        <TableHead className="w-1/2">Description</TableHead>
                        <TableHead className="w-1/6 text-center">
                          Included
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.features.map((feature) => {
                        const included = isFeatureIncluded(
                          feature.name,
                          planKey as keyof typeof planFeatures,
                        );
                        const limit = getFeatureLimit(
                          feature.name,
                          planKey as keyof typeof planFeatures,
                        );

                        return (
                          <TableRow key={feature.name}>
                            <TableCell className="font-medium">
                              {feature.name}
                            </TableCell>
                            <TableCell>
                              {feature.description}
                              {limit && (
                                <span className="block text-sm text-slate-500 mt-1">
                                  {limit}
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {included ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-slate-300 mx-auto" />
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile view - Cards */}
                <div className="md:hidden">
                  {category.features.map((feature) => {
                    const included = isFeatureIncluded(
                      feature.name,
                      planKey as keyof typeof planFeatures,
                    );
                    const limit = getFeatureLimit(
                      feature.name,
                      planKey as keyof typeof planFeatures,
                    );

                    return (
                      <FeatureCard
                        key={feature.name}
                        feature={feature}
                        included={included}
                        limit={limit}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
