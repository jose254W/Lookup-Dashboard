import React from "react";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

export const CustomBreadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="text-gray-400 text-sm mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="hover:text-gray-200 cursor-pointer">
            {item.label}
          </span>
          {index < items.length - 1 && <span className="mx-2">{">"}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};
