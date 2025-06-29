import Button from "@/components/themes/Button";
import Input from "@/components/themes/Input";
import Subheading from "@/components/themes/SubHeading";
import Switch from "@/components/themes/Switch";
import useRbacStore from "@/store/workspace/useRbacStore";
import { addToast, Divider } from "@heroui/react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const EditApplication = ({
  appName,
  appId,
  appUrl,
  isEnabled,
  appLogo,
  isDefault,
}: any) => {
  const t = useTranslations("AppControl.EditApplication");
  const [eappName, setEAppName] = React.useState(appName);
  const [eappNameErr, setEAppNameErr] = React.useState(false);
  const [eappId, setEAppId] = React.useState(appId);
  const [eappUrl, setEAppUrl] = React.useState(appUrl);
  const [eappUrlErr, setEAppUrlErr] = React.useState(false);
  const [eisEnabled, setEIsEnabled] = React.useState(isEnabled);
  const [eappLogo, setEAppLogo] = React.useState(appLogo);
  const [eisDefault, setEIsDefault] = React.useState(isDefault);

  useEffect(() => {
    setEAppName(appName);
    setEAppId(appId);
    setEAppUrl(appUrl);
    setEIsEnabled(isEnabled);
    setEAppLogo(appLogo);
    setEIsDefault(isDefault);
  }, [appName, appId, appUrl, isEnabled, appLogo, isDefault]);

  const { editApplications, getAllApplications } = useRbacStore();

  const handleUpdate = async () => {
    if (eisDefault) {
      if (eappUrl === "") {
        setEAppUrlErr(true);
        return;
      }
    } else {
      if (eappName === "") {
        setEAppNameErr(true);
        return;
      }

      if (eappUrl === "") {
        setEAppUrlErr(true);
        return;
      }
    }

    try {
      const data = {
        applicationName: eappName,
        applicationUrl: eappUrl,
        applicationLogo: eappLogo,
        isEnabled: eisEnabled,
        roleId: [],
        isDefault: eisDefault,
        applicationId: eappId,
      };

      const response = await editApplications(data);

      addToast({
        title: t("updateSuccess"),
        color: "success",
      });
      const orgId = localStorage.getItem("orgId");
      if (!orgId) return;
      await getAllApplications(orgId);
    } catch (err: any) {
      console.log(err);
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <Subheading>{appName}</Subheading>
        <Button size="sm" onPress={handleUpdate}>
          {t("update")}
        </Button>
      </div>
      <Divider className="my-2" />

      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
        {!eisDefault && (
          <Input
            label={t("appName")}
            type="text"
            value={eappName}
            onValueChange={(e) => {
              setEAppName(e);
              setEAppNameErr(false);
            }}
            className="w-full"
            isInvalid={eappNameErr}
            errorMessage={eappNameErr ? t("appNameError") : ""}
          />
        )}

        <Input
          label={t("appUrl")}
          type="text"
          value={eappUrl}
          onValueChange={(e) => {
            setEAppUrl(e);
            setEAppUrlErr(false);
          }}
          className="w-full"
          isInvalid={eappUrlErr}
          errorMessage={eappUrlErr ? t("appUrlError") : ""}
        />

        {!eisDefault && (
          <Input
            label={t("appLogo")}
            type="text"
            value={eappLogo}
            onValueChange={(e) => {
              setEAppLogo(e);
            }}
            className="w-full"
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          {!eisDefault && (
            <Switch
              className="p-2  max-w-xs mt-4"
              isSelected={eisEnabled}
              onValueChange={setEIsEnabled}
              label={
                eisEnabled ? (
                  <Subheading>{t("isEnabled")}</Subheading>
                ) : (
                  <Subheading>{t("isDisabled")}</Subheading>
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditApplication;
