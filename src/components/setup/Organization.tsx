import useSetupstore from "@/store/setup/useSetupStore";
import React, { useEffect } from "react";
import Button from "../themes/Button";
import Input from "../themes/Input";
import ThemetypeSelector from "../ux/ThemetypeSelector";
import { useTranslations } from "next-intl";
import Select from "../themes/Select";
import { Divider, SelectItem } from "@heroui/react";
import Paragraph from "../themes/Paragraph";
import Subheading from "../themes/SubHeading";

const Organization = () => {
  const {
    organizationName,
    setOrganizationName,
    organizationNameError,
    setOrganizationNameError,
    organizationSize,
    setOrganizationSize,
    organizationSizeError,
    setOrganizationSizeError,
    organizationIndustry,
    setOrganizationIndustry,
    organizationIndustryError,
    setOrganizationIndustryError,
    organizationType,
    setOrganizationType,
    organizationTypeError,
    setOrganizationTypeError,
    organizationLogo,
    setOrganizationLogo,
    organizationTagline,
    setOrganizationTagline,
    currentTab,
    setCurrentTab,
    disabledKeys,
    setDisabledKeys,
  } = useSetupstore();

  const orgSize = [
    { key: "1-10", label: "1-10" },
    { key: "11-50", label: "11-50" },
    { key: "51-200", label: "51-200" },
    { key: "201-500", label: "201-500" },
    { key: "501-1000", label: "501-1000" },
    { key: "1001-5000", label: "1001-5000" },
    { key: "5001-10000", label: "5001-10000" },
    { key: "10000+", label: "10000+" },
  ];

  const industry = [
    { key: "Agriculture", label: "Agriculture" },
    { key: "Construction", label: "Construction" },
    { key: "Energy", label: "Energy" },
    { key: "Finance", label: "Finance" },
    { key: "Healthcare", label: "Healthcare" },
    { key: "Manufacturing", label: "Manufacturing" },
    { key: "Retail", label: "Retail" },
    { key: "Technology", label: "Technology" },
    { key: "Transportation", label: "Transportation" },
    { key: "Other", label: "Other" },
  ];

  const organizationtype = [
    { key: "Enterprise", label: "Enterprise" },
    { key: "Government", label: "Government" },
    { key: "Community", label: "Community" },
    { key: "Non-profit", label: "Non-profit" },
    { key: "Other", label: "Other" },
  ];

  const t = useTranslations("Setup");

  useEffect(() => {
    setCurrentTab("organization");
  }, [currentTab]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-[calc(100%-50px)] flex flex-col gap-4  max-h-[calc(100%-50px)] overflow-y-auto scrollbar-hide">
        <div>
          <Subheading>{t("Organization.subheading1")}</Subheading>
          <Divider className="w-[75%] my-1" />
          <Input
            label={t("Organization.name")}
            type="text"
            labelPlacement="outside"
            value={organizationName}
            onValueChange={(e) => {
              setOrganizationName(e);
              setOrganizationNameError(false);
            }}
            errorMessage={
              organizationNameError ? t("Organization.nameError") : null
            }
            isInvalid={organizationNameError}
          />
        </div>

        <Select
          label={t("Organization.size")}
          labelPlacement="outside"
          errorMessage={
            organizationSizeError ? t("Organization.sizeError") : ""
          }
          isInvalid={organizationSizeError}
          selectedKeys={[organizationSize]}
          onChange={(e) => {
            setOrganizationSize(e.target.value);
            setOrganizationSizeError(false);
          }}
        >
          {orgSize.map((orgsize) => (
            <SelectItem
              classNames={{
                base: "text-textcolor",
              }}
              key={orgsize.key}
            >
              {orgsize.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label={t("Organization.type")}
          labelPlacement="outside"
          errorMessage={
            organizationTypeError ? t("Organization.typeError") : ""
          }
          isInvalid={organizationTypeError}
          selectedKeys={[organizationType]}
          onChange={(e) => {
            setOrganizationType(e.target.value);
            setOrganizationTypeError(false);
          }}
        >
          {organizationtype.map((orgtype) => (
            <SelectItem
              classNames={{
                base: "text-textcolor",
              }}
              key={orgtype.key}
            >
              {orgtype.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label={t("Organization.industry")}
          labelPlacement="outside"
          errorMessage={
            organizationIndustryError ? t("Organization.industryError") : ""
          }
          isInvalid={organizationIndustryError}
          selectedKeys={[organizationIndustry]}
          onChange={(e) => {
            setOrganizationIndustry(e.target.value);
            setOrganizationIndustryError(false);
          }}
        >
          {industry.map((indus) => (
            <SelectItem
              classNames={{
                base: "text-textcolor",
              }}
              key={indus.key}
            >
              {indus.label}
            </SelectItem>
          ))}
        </Select>
        <div>
          <Subheading>{t("Organization.subheading2")}</Subheading>
          <Divider className="w-[75%] my-1" />
          <Input
            label={t("Organization.logo")}
            type="text"
            labelPlacement="outside"
            value={organizationLogo}
            onValueChange={setOrganizationLogo}
          />
        </div>

        <Input
          label={t("Organization.tagline")}
          type="text"
          labelPlacement="outside"
          value={organizationTagline}
          onValueChange={setOrganizationTagline}
        />
      </div>
      <div className="w-full h-[50px] flex items-center justify-end">
        <div className="mr-4">
          <Button
            onPress={() => {
              if (organizationName === "" || organizationName.length < 3) {
                setOrganizationNameError(true);
                return;
              }
              if (organizationSize === "") {
                setOrganizationSizeError(true);
                return;
              }
              if (organizationType === "") {
                setOrganizationTypeError(true);
                return;
              }
              if (organizationIndustry === "") {
                setOrganizationIndustryError(true);
                return;
              }

              setDisabledKeys(["admin", "smtp", "advanced", "apps"]);
              setCurrentTab("contact");
            }}
          >
            {t("next2")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Organization;
