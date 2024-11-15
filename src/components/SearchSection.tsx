import React from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { Search, X, ShoppingBasket, Smartphone, Mail } from "lucide-react"; // Import icons

interface SearchSectionProps {
  onSearch: (query: string, type: string) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [selected, setSelected] = React.useState("btl");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    onSearch(searchQuery, selected);
  };

  const clearInput = () => {
    setSearchQuery("");
  };

  const tabData = [
    { key: "btl", label: "B.T.L Ref", icon: <ShoppingBasket size={20} /> },
    { key: "mobile", label: "Mobile No", icon: <Smartphone size={20} /> },
    { key: "email", label: "Email", icon: <Mail size={20} /> },
  ];

  return (
    <Card className="bg-gray-900 border-none shadow-none rounded-lg mb-6">
      <CardBody className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBasket className="text-red-500" size={24} />
            <h2 className="text-white text-xl">Basket Lookup</h2>
          </div>

          <div className="flex gap-2 mb-4">
            {tabData.map((tab) => (
              <Button
                key={tab.key}
                className={`bg-[#2a2a2a] border-none ${
                  selected === tab.key ? "text-white" : "text-gray-400"
                }`}
                onClick={() => setSelected(tab.key)}
                startContent={tab.icon}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="relative w-1/4 rounded-lg">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#2a2a2a] text-white rounded-lg"
                classNames={{
                  inputWrapper: "bg-[#2a2a2a] border-none",
                }}
              />
              {searchQuery && (
                <Button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-black"
                  onClick={clearInput}
                >
                  <X size={18} />
                </Button>
              )}
            </div>
            <Button
              className="bg-red-500 text-white px-6"
              onClick={() => onSearch(searchQuery, selected)}
              startContent={<Search size={18} />}
            >
              Search
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
