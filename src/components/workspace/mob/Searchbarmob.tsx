import Input from "@/components/themes/Input";
import useSearchStore from "@/store/workspace/useSearchStore";
import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const Searchbarmob = () => {
  const t = useTranslations("WorkspaceMobile.Search");

  const { currentMobileTab } = useWorkspaceStore();
  const { setSearchTermmob } = useSearchStore();

  const [searchPlaceHolder, setSearchPlaceHolder] = useState(t("suite"));
  const [disabled, setDisabled] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (currentMobileTab === "suitemob") {
      setDisabled(false);
      setSearchPlaceHolder(t("suite"));
    } else if (currentMobileTab === "myappsmob") {
      setDisabled(false);
      setSearchPlaceHolder(t("apps"));
    } else if (currentMobileTab === "settingsmob") {
      setDisabled(true);
      setSearchPlaceHolder(t("search"));
    }
    setInputValue(""); // reset input value on tab change
    setSearchTermmob(""); // clear search term store as well
  }, [currentMobileTab, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // update local state
    setSearchTermmob(value.length >= 3 ? value : ""); // sync with store
  };

  return (
    <Input
      isClearable={false}
      isDisabled={disabled}
      radius="full"
      size="sm"
      value={inputValue}
      className="w-full max-w-full mr-4"
      placeholder={searchPlaceHolder}
      startContent={<SearchIcon className="w-4 h-4 pointer-events-none" />}
      onChange={handleChange}
      onClear={() => {
        setInputValue("");
        setSearchTermmob("");
      }}
    />
  );
};

export default Searchbarmob;
