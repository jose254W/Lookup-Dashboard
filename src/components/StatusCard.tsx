import React from "react";

interface StatusCardProps {
  label: string;
  value: string;
  variant?: "warning" | "error" | "success";
  icon?: React.ReactNode;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  label,
  value,
  variant,
  icon,
}) => {
  const textColor =
    variant === "error"
      ? "text-red-500"
      : variant === "warning"
      ? "text-yellow-500"
      : variant === "success"
      ? "text-green-500"
      : "text-gray-300";

  return (
    <div className={`flex items-center p-3 rounded-lg bg-[#2a2a2a]`}>
      {icon && (
        <div className="mr-2 mb-6 text-gray-400 border-none">{icon}</div>
      )}
      <div className="flex flex-col">
        <div className="text-sm text-gray-400">{label}</div>
        <p className={`text-lg ${textColor}`}>{value}</p>
      </div>
    </div>
  );
};
