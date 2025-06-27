import Input from "@/components/themes/Input";
import useSearchStore from "@/store/workspace/useSearchStore";
import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const Searchbar = () => {
  const t = useTranslations("WorkSpace");

  const { currentTab } = useWorkspaceStore();
  const { setSearchTerm } = useSearchStore();

  const [searchPlaceHolder, setSearchPlaceHolder] = useState(t("Search.suite"));
  const [disabled, setDisabled] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Update placeholder and disabled state based on tab
    switch (currentTab) {
      case "suite":
        setSearchPlaceHolder(t("Search.suite"));
        setDisabled(false);
        break;
      case "myapps":
        setSearchPlaceHolder(t("Search.apps"));
        setDisabled(false);
        break;
      case "dashboard":
        setSearchPlaceHolder(t("Search.search"));
        setDisabled(true);
        break;
      case "applicationcontrol":
        setSearchPlaceHolder(t("Search.applicationcontrol"));
        setDisabled(false);
        break;
      case "activity":
        setSearchPlaceHolder(t("Search.activity"));
        setDisabled(false);
        break;
      case "userstore":
        setSearchPlaceHolder(t("Search.userstore"));
        setDisabled(false);
        break;
      case "settings":
        setSearchPlaceHolder(t("Search.search"));
        setDisabled(true);
        break;
      default:
        setSearchPlaceHolder(t("Search.search"));
        setDisabled(true);
    }

    // Clear on tab change
    setInputValue("");
    setSearchTerm("");
  }, [currentTab, t, setSearchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // controlled
    setSearchTerm(value.length >= 3 ? value : "");
  };

  return (
    <Input
      isClearable={false}
      isDisabled={disabled}
      radius="full"
      size="sm"
      value={inputValue}
      className="max-w-sm"
      placeholder={searchPlaceHolder}
      startContent={<SearchIcon className="w-5 h-5 pointer-events-none" />}
      onChange={handleChange}
      onClear={() => {
        setInputValue("");
        setSearchTerm("");
      }}
    />
  );
};

export default Searchbar;
