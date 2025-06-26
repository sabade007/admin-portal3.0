import Input from "@/components/themes/Input";
import { SearchIcon } from "lucide-react";
import React from "react";

const Searchbar = () => {
  return (
    <Input
      size="sm"
      className="max-w-sm"
      labelPlacement="inside"
      placeholder="Search"
      endContent={<SearchIcon className="w-5 h-5 pointer-events-none" />}
    />
  );
};

export default Searchbar;
