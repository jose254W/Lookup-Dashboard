import React from "react";
import { CustomBreadcrumb } from "../components/Breadcrumb";
import { SearchSection } from "../components/SearchSection";
import { BasketSummarySection } from "../components/BasketSummary";
import type { BasketSummary } from "../types/basket";

export default function BasketLookupPage() {
  const [basketData, setBasketData] = React.useState<BasketSummary | null>(
    null
  );

  const handleSearch = async (query: string, type: string) => {
    // Simulated API call
    const mockData: BasketSummary = {
      reference: "B00N2WEJ",
      created: "Tue, 23 Jul 2024, 16:09",
      status: "Completed - Refunded",
      channel: "WEB",
      items: 1,
      value: "R 100.00",
      user: "qa-travel-nextjs-app.computicket.com",
      currentBalance: "R 20.00",
      remoteStatus: "Not Cancelled",
      remotePaymentStatus: "Payment Not Found",
      ticketsNotDelivered: "Warning",
    };

    setBasketData(mockData);
  };

  const breadcrumbItems = [
    { label: "Customer Service", href: "/" },
    { label: "Basket Lookup", href: "/basket-lookup" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-950 p-6">
      <CustomBreadcrumb items={breadcrumbItems} />

      <p className="text-gray-300 mb-6">
        Look up basket details using the basket reference, mobile number, or
        email.
      </p>

      <SearchSection onSearch={handleSearch} />

      {basketData && <BasketSummarySection data={basketData} />}
    </div>
  );
}
