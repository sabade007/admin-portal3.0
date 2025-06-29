import Button from "@/components/themes/Button";
import Input from "@/components/themes/Input";
import Paragraph from "@/components/themes/Paragraph";
import Subheading from "@/components/themes/SubHeading";
import useRegistrationStore from "@/store/workspace/useRegistrationStore";
import { addToast } from "@heroui/react";
import { ArrowRightCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useShakeOnMount } from "@/hooks/useShakeAnimation";
import { cn } from "@/lib/utils";
import Switch from "@/components/themes/Switch";

const GeneralSettings = () => {
  const t = useTranslations("GeneralSettings");
  const {
    getGeneralSettings,
    allocatedSpace,
    selfRegistration,
    setAllocatedSpace,
    setSelfRegistration,
    updateGeneralSettings,
  } = useRegistrationStore();

  const [confirmButton, setConfirmButton] = React.useState(false);
  const { ref, controls, variants, trigger } = useShakeOnMount();
  const [allocatedspaceError, setAllocatedspaceError] = React.useState(false);

  useEffect(() => {
    fetchSettings();
  }, [getGeneralSettings]);

  const fetchSettings = async () => {
    const orgId = localStorage.getItem("orgId");
    if (orgId) {
      await getGeneralSettings(orgId);
    }
  };

  useEffect(() => {
    if (confirmButton) {
      trigger(); // manually trigger shake when button is shown
    }
  }, [confirmButton]);

  const handleUpdate = async () => {
    if (!allocatedSpace || allocatedSpace === null) {
      setAllocatedspaceError(true);
      return;
    }

    try {
      const orgId = localStorage.getItem("orgId");
      if (!orgId) return;
      const data = {
        defaultSize: allocatedSpace,
        orgID: orgId,
        sso: selfRegistration,
      };

      const response = await updateGeneralSettings(data);
      if (response.status === 200) {
        addToast({
          title: t("updateSuccessFull"),
          color: "success",
        });
        fetchSettings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-h-[calc(100dvh-220px)] overflow-y-auto scrollbar-hide">
      <div className="mt-4 flex flex-col gap-2">
        <div className="">
          <Subheading>{t("title1")}</Subheading>
          <Paragraph>{t("desc1")}</Paragraph>
        </div>
        <div className="flex flex-row items-end gap-4">
          <Input
            label={t("space")}
            type="text"
            labelPlacement="outside"
            value={
              Number.isFinite(allocatedSpace) ? allocatedSpace.toString() : ""
            }
            onValueChange={(e) => {
              setAllocatedSpace(Number(e));
            }}
            isInvalid={allocatedspaceError}
            errorMessage={allocatedspaceError ? t("allocatedSpaceError") : ""}
          />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div>
          <Subheading>{t("title2")}</Subheading>
          <Paragraph>{t("desc2")}</Paragraph>
        </div>
        <div className="flex flex-row items-end mt-2 gap-4">
          <Switch
            isSelected={selfRegistration}
            onValueChange={setSelfRegistration}
            label={
              <Subheading>
                {selfRegistration ? t("allowed") : t("notallowed")}
              </Subheading>
            }
          />
        </div>
      </div>

      <div className="mt-4">
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={confirmButton ? controls : "hidden"}
          className="inline-block"
        >
          <Button
            onPress={() => {
              if (!confirmButton) {
                setConfirmButton(true); // first press triggers shake
              } else {
                handleUpdate();

                console.log("Confirmed update");
                setConfirmButton(false); // reset state if needed
              }
            }}
          >
            {confirmButton ? t("updateconfirm") : t("update")}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GeneralSettings;
