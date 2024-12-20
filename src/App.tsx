import React from "react";
import "./index.css";
import { Textarea } from "@nextui-org/react";
import { CustomBreadcrumb } from "./components/Breadcrumb.tsx";
import { SearchSection } from "./components/SearchSection.tsx";
import { BasketSummarySection } from "./components/BasketSummary.tsx";
import { CollapsibleSection } from "./components/CollapsibleSection.tsx";
import TicketDetails from "./components/TicketDetails.tsx"; // TicketDetails import
import type { BasketSummary } from "./types/basket.ts";
import { Bell, CreditCard } from "lucide-react";

export default function App() {
  const [basketData, setBasketData] = React.useState<BasketSummary | null>(
    null
  );

  const mockBasketData: BasketSummary = {
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

  const handleSearch = async (query: string, type: string) => {
    console.log(`Searching for ${query} using ${type}`);
    setBasketData(mockBasketData);
  };

  const breadcrumbItems = [
    { label: "Customer Service", href: "/" },
    { label: "Basket Lookup", href: "/basket-lookup" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#32105a] to-purple-950 p-6">
      <CustomBreadcrumb items={breadcrumbItems} />

      <p className="mb-6 text-lg text-gray-300">
        Look up basket details using the basket reference, mobile number, or
        email.
      </p>

      <SearchSection onSearch={handleSearch} />

      {basketData && (
        <div className="bg-[#2f1b45] p-3 rounded-lg">
          <BasketSummarySection data={basketData} />

          <div className="mt-4">
            <CollapsibleSection
              title={
                <div className="flex items-center gap-2">
                  <Bell size={20} className="text-red-500" />{" "}
                  <span>Transaction Completion</span>
                </div>
              }
              className="bg-gray-900 p-6 rounded-lg"
            >
              <TicketDetails
                event="Concert XYZ"
                venue="Madison Square Garden"
                date="Fri, 22 Dec 2024, 19:00"
                seats="Section A, Row 5, Seat 12"
                value="$150"
                status="Confirmed"
                eventType="Music Concert"
                lineRef="LREF123456"
                ticketRef="TREF123456"
                barcode="BARCODE123456"
                remoteRef="REMOTE123456"
                accessControlStatus="Granted"
                refundAmount="$50"
                refundDate="Wed, 20 Dec 2024"
                refundChannel="Credit Card"
                onRefund={() => console.log("Refund requested")}
                onAuthorizeAllRefunds={() =>
                  console.log("Authorize all refunds requested")
                }
              />
            </CollapsibleSection>

            <CollapsibleSection
              title={
                <div className="flex items-center gap-2">
                  <CreditCard size={20} className="text-red-500" />{" "}
                  <span>Payment</span>
                </div>
              }
              className="bg-gray-900 p-6 rounded-lg mt-4"
            >
              <Textarea
                placeholder="Payment details go here."
                className="bg-gray-600 text-white"
              />
            </CollapsibleSection>
          </div>
        </div>
      )}
    </div>
  );
}
