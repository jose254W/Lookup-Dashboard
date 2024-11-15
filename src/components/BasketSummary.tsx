import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import {
  AlertTriangle,
  ShoppingBag,
  Users,
  DollarSign,
  CheckCircle,
  CreditCard,
  ShoppingBasket,
  X,
} from "lucide-react";
import { StatusCard } from "./StatusCard.tsx";
import type { BasketSummary } from "../types/basket";

interface BasketSummaryProps {
  data: BasketSummary;
}

export const BasketSummarySection: React.FC<BasketSummaryProps> = ({
  data,
}) => {
  return (
    <Card className="bg-gray-900">
      <CardBody>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-sm text-gray-400 uppercase">BASKET SUMMARY</h3>
            <div className="text-white">Ref: {data.reference}</div>
            <div className="text-gray-400 text-sm">Created: {data.created}</div>
          </div>
          <div className="border-b border-[#64748b]"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusCard
              label="Status"
              value={data.status}
              variant="warning"
              icon={<CheckCircle size={18} />}
            />
            <StatusCard
              label="Channel"
              value={data.channel}
              icon={<ShoppingBag size={18} />}
            />
            <StatusCard
              label="Items"
              value={data.items.toString()}
              icon={<ShoppingBasket size={18} />}
            />
            <StatusCard
              label="Value"
              value={data.value}
              icon={<DollarSign size={18} />}
            />
            <StatusCard
              label="User"
              value={data.user}
              icon={<Users size={18} />}
            />
            <StatusCard
              label="Current Balance"
              value={data.currentBalance}
              icon={<CreditCard size={18} />}
            />
            <StatusCard
              label="Remote Status"
              value={data.remoteStatus}
              variant="success"
              icon={<CheckCircle size={18} />}
            />
            <StatusCard
              label="Remote Payment Status"
              value={data.remotePaymentStatus}
              variant="error"
              icon={
                <div className="flex items-center justify-center w-4 h-4 bg-gray-400	text-gray-500 rounded-full">
                  <X size={18} />
                </div>
              }
            />
            <StatusCard
              label="Tickets Not Delivered"
              value="Warning"
              variant="warning"
              icon={<AlertTriangle size={18} />}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
