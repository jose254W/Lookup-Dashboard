import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  Tag,
  FileText,
  Shield,
  DollarSign,
  Clock,
  CreditCard,
  LucideIcon,
  Eye,
  EyeOff,
} from "lucide-react";

// Types
interface TicketData {
  event: string;
  venue: string;
  date: string;
  seats: string;
  value: string;
  status: string;
  eventType: string;
  lineRef: string;
  ticketRef: string;
  barcode: string;
  remoteRef: string;
  accessControlStatus: string;
  refundAmount: string;
  refundDate: string;
  refundChannel: string;
}

interface TicketDetailsProps extends Partial<TicketData> {
  ticketId?: string;
  onRefund?: () => void;
  onAuthorizeAllRefunds?: () => void;
}

interface InfoBlockProps {
  icon: LucideIcon;
  label: string;
  value: string;
  valueColor?: string;
  showEyeIcon?: boolean;
  className?: string;
  actualValue?: string;
}

// API functions
const api = {
  fetchTicketDetails: async (ticketId: string): Promise<TicketData> => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`);
      if (!response.ok) throw new Error("Failed to fetch ticket details");
      return await response.json();
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      throw error;
    }
  },

  refundTicket: async (ticketId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/refund`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to process refund");
    } catch (error) {
      console.error("Error processing refund:", error);
      throw error;
    }
  },

  authorizeAllRefunds: async (): Promise<void> => {
    try {
      const response = await fetch("/api/tickets/refund-all", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to authorize all refunds");
    } catch (error) {
      console.error("Error authorizing all refunds:", error);
      throw error;
    }
  },
};

const InfoBlock: React.FC<InfoBlockProps> = ({
  icon: Icon,
  label,
  value,
  actualValue,
  valueColor,
  showEyeIcon,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`${className} p-0.5`}>
      <div className="flex items-center gap-2 text-neutral-500">
        <Icon size={16} className="text-neutral-500" />
        <span className="text-sm font-normal">{label}</span>
        {showEyeIcon && (
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="ml-auto hover:text-neutral-300 transition-colors"
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      <div
        className={`${valueColor || "text-white"} text-base font-normal mt-1`}
      >
        {showEyeIcon
          ? isVisible
            ? actualValue
            : "********************************"
          : value}
      </div>
    </div>
  );
};

const TicketDetails: React.FC<TicketDetailsProps> = (props) => {
  const { ticketId, onRefund, onAuthorizeAllRefunds, ...directProps } = props;

  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use backend data if ticketId is provided
  useEffect(() => {
    const loadTicketData = async () => {
      if (!ticketId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await api.fetchTicketDetails(ticketId);
        setTicketData(data);
      } catch (err) {
        setError("Failed to load ticket details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      loadTicketData();
    }
  }, [ticketId]);

  // Determine which data to use
  const data = ticketId ? ticketData : (directProps as TicketData);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-neutral-500/10 border border-neutral-500/20 rounded-lg p-4 text-neutral-500">
        No ticket data available.
      </div>
    );
  }

  return (
    <div className="">
      <button
        onClick={onAuthorizeAllRefunds}
        className="absolute top-0 right-0 mt-10 bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <FileText size={12} />
        Authorize All Refunds
      </button>

      <div className="w-full mr-auto p-6 mt-6 bg-[#18181a] rounded-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Ticket className="text-red-500" size={20} />
            <h2 className="text-lg font-normal text-white">
              Event - {data.event}
            </h2>
          </div>
        </div>

        {/* Main Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#272729] rounded-lg p-4">
            <InfoBlock icon={Ticket} label="Event" value={data.event} />
          </div>
          <div className="bg-[#272729] rounded-lg p-4">
            <InfoBlock icon={MapPin} label="Venue" value={data.venue} />
          </div>
          <div className="bg-[#272729] rounded-lg p-4">
            <InfoBlock icon={Calendar} label="Date" value={data.date} />
          </div>
          <div className="bg-[#272729] rounded-lg p-4">
            <InfoBlock icon={Users} label="Seats" value={data.seats} />
          </div>
          <div className="bg-[#272729] rounded-lg p-4">
            <InfoBlock icon={Tag} label="Value" value={data.value} />
          </div>
          <div className="bg-[#272729] rounded-lg p-4">
            <InfoBlock icon={FileText} label="Status" value={data.status} />
          </div>
        </div>

        {/* Event Type and Refund Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#272729] rounded-lg p-4">
            <InfoBlock
              icon={Ticket}
              label="Event Type"
              value={data.eventType}
            />
          </div>
          <div className="bg-[#272729] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-500">
                <FileText size={16} />
                <span className="text-sm">Line Ref: {data.lineRef}</span>
              </div>
              <button
                onClick={onRefund}
                className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-1.5 rounded-lg text-sm"
              >
                Authorize Refund
              </button>
            </div>
          </div>
        </div>

        <hr className="my-6 border-t border-white/20" />

        {/* Detailed Ticket Information */}
        <h3 className="text-white mb-3 text-lg font-normal">Tickets</h3>
        <div className="bg-[#272729] w-full max-w-sm rounded-lg p-4 md:p-6">
          <div className="space-y-6">
            <InfoBlock
              icon={Ticket}
              label="Ticket Ref"
              value={data.ticketRef}
            />
            <InfoBlock icon={Users} label="Seat" value={data.seats} />
            <InfoBlock icon={Tag} label="Price" value={data.value} />
            <InfoBlock
              icon={FileText}
              label="Barcode"
              value="********************************"
              actualValue={data.barcode}
              showEyeIcon
            />
            <InfoBlock
              icon={Ticket}
              label="Remote Ref"
              value={data.remoteRef}
            />
            <InfoBlock
              icon={Shield}
              label="Access Control Status"
              value={data.accessControlStatus}
              valueColor="text-green-500"
            />
            <InfoBlock
              icon={DollarSign}
              label="Refund Amount"
              value={data.refundAmount}
              valueColor="text-red-500"
            />
            <InfoBlock
              icon={Clock}
              label="Refund Date"
              value={data.refundDate}
            />
            <InfoBlock
              icon={CreditCard}
              label="Refund Channel"
              value={data.refundChannel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
