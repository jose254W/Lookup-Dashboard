import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CollapsibleSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className={` bg-gray-900 ${className}`}>
      <CardBody className="p-1">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center bg-transparent hover:bg-gray-800 mb-2"
        >
          <span className="text-white">{title}</span>
          {isOpen ? (
            <ChevronRight className="text-gray-400" size={20} />
          ) : (
            <ChevronLeft className="text-gray-400" size={20} />
          )}
        </Button>

        {isOpen && <div className="mt-4">{children}</div>}
      </CardBody>
    </Card>
  );
};
