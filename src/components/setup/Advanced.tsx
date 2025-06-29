import useSetupstore from "@/store/setup/useSetupStore";
import React, { useEffect } from "react";
import Button from "../themes/Button";
import Input from "../themes/Input";
import ThemetypeSelector from "../ux/ThemetypeSelector";
import { useTranslations } from "next-intl";
import Select from "../themes/Select";
import { addToast, Divider, SelectItem } from "@heroui/react";
import Paragraph from "../themes/Paragraph";
import Subheading from "../themes/SubHeading";
import { Edit } from "lucide-react";
import { encryptPassword } from "@/hooks/passwordEncryption";
import Switch from "../themes/Switch";

const Advanced = () => {
  const {
    selfRegistrationEnabled,
    setSelfRegistrationEnabled,

    enableLdap,
    setEnableLdap,
    enableOauth,
    setEnableOauth,

    issuerUrl,
    setIssuerUrl,
    issuerUrlError,
    setIssuerUrlError,
    issuerClientId,
    setIssuerClientId,
    issuerClientIdError,
    setIssuerClientIdError,
    issuerClientSecret,
    setIssuerClientSecret,
    issuerClientSecretError,
    setIssuerClientSecretError,
    submitLoading,
    setSubmitLoading,

    currentTab,
    setCurrentTab,
    disabledKeys,
    setDisabledKeys,
  } = useSetupstore();

  const t = useTranslations("Setup");

  useEffect(() => {
    setCurrentTab("advanced");
  }, [currentTab]);

  const handleNext = async () => {
    if (enableOauth) {
      if (issuerUrl === "") {
        setIssuerUrlError(true);
        return;
      }

      if (issuerClientId === "") {
        setIssuerClientIdError(true);
        return;
      }

      if (issuerClientSecret === "") {
        setIssuerClientSecretError(true);
        return;
      }
    }
    setDisabledKeys([]);
    setCurrentTab("apps");
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-[calc(100%-50px)] flex flex-col gap-4  max-h-[calc(100%-50px)] overflow-y-auto scrollbar-hide">
        <div>
          <Subheading>{t("Advanced.subheading1")}</Subheading>
          <Divider className="w-[75%] my-1" />
        </div>

        <Switch
          isSelected={selfRegistrationEnabled}
          onValueChange={(e) => {
            setSelfRegistrationEnabled(e);
          }}
          label={<Subheading>{t("Advanced.self")}</Subheading>}
        />

        <Switch
          isSelected={enableLdap}
          onValueChange={(e) => {
            setEnableLdap(e);
          }}
          label={<Subheading>{t("Advanced.ldap")}</Subheading>}
        />

        <div>
          <div className="flex gap-2 items-center">
            <Subheading>{t("Advanced.subheading2")}</Subheading>
            <Button onPress={() => setEnableOauth(!enableOauth)} isIconOnly>
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          <Divider className="w-[75%] my-1" />
          <Input
            label={t("Advanced.issuerUrl")}
            type="text"
            isDisabled={submitLoading || !enableOauth}
            labelPlacement="outside"
            value={issuerUrl}
            onValueChange={(e) => {
              setIssuerUrl(e);
              setIssuerUrlError(false);
            }}
            errorMessage={issuerUrlError ? t("Advanced.issuerUrlError") : ""}
            isInvalid={issuerUrlError}
          />
        </div>

        <Input
          label={t("Advanced.clientId")}
          type="text"
          isDisabled={submitLoading || !enableOauth}
          labelPlacement="outside"
          value={issuerClientId}
          onValueChange={(e) => {
            setIssuerClientId(e);
            setIssuerClientIdError(false);
          }}
          errorMessage={issuerClientIdError ? t("Advanced.clientIdError") : ""}
          isInvalid={issuerClientIdError}
        />

        <Input
          label={t("Advanced.clientSecret")}
          type="text"
          isDisabled={submitLoading || !enableOauth}
          labelPlacement="outside"
          value={issuerClientSecret}
          onValueChange={(e) => {
            setIssuerClientSecret(e);
            setIssuerClientSecretError(false);
          }}
          errorMessage={
            issuerClientSecretError ? t("Advanced.clientSecretError") : ""
          }
          isInvalid={issuerClientSecretError}
        />
      </div>
      <div className="w-full h-[50px] flex items-center justify-end">
        <div className="mr-4">
          <Button
            onPress={handleNext}
            isLoading={submitLoading}
            isDisabled={submitLoading}
          >
            {t("next2")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Advanced;
