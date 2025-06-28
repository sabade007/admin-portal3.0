import useSetupstore from "@/store/setup/useSetupStore";
import React, { useEffect } from "react";
import Button from "../themes/Button";
import Input from "../themes/Input";
import ThemetypeSelector from "../ux/ThemetypeSelector";
import { useTranslations } from "next-intl";
import Select from "../themes/Select";
import { Divider, SelectItem, Tooltip } from "@heroui/react";
import Paragraph from "../themes/Paragraph";
import Subheading from "../themes/SubHeading";
import { CircleQuestionMarkIcon, Eye, EyeClosed } from "lucide-react";
import Tiny from "../themes/Tiny";

const Admin = () => {
  const {
    adminEmail,
    setAdminEmail,
    adminEmailError,
    setAdminEmailError,
    adminPassword,
    setAdminPassword,
    adminPasswordError,
    setAdminPasswordError,
    adminName,
    setAdminName,
    adminNameError,
    setAdminNameError,
    adminRepeatPassword,
    setAdminRepeatPassword,
    adminRepeatPasswordError,
    setAdminRepeatPasswordError,

    currentTab,
    setCurrentTab,
    disabledKeys,
    setDisabledKeys,
  } = useSetupstore();

  const t = useTranslations("Setup");

  const [isVisible, setIsVisible] = React.useState(false);
  const [isRepeatVisible, setIsRepeatVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleRepeatVisibility = () => setIsRepeatVisible(!isRepeatVisible);

  useEffect(() => {
    setCurrentTab("admin");
  }, [currentTab]);

  const passwordValidator = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const emailValidator = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNext = () => {
    if (adminName === "") {
      setAdminNameError(true);
      return;
    }

    if (adminEmail === "" || !emailValidator(adminEmail)) {
      setAdminEmailError(true);
      return;
    }

    if (adminPassword === "" || !passwordValidator(adminPassword)) {
      setAdminPasswordError(true);
      return;
    }

    if (adminRepeatPassword !== adminPassword) {
      setAdminRepeatPasswordError(true);
      return;
    }
    setDisabledKeys(["advanced", "apps"]);
    setCurrentTab("smtp");
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-[calc(100%-50px)] flex flex-col gap-4  max-h-[calc(100%-50px)] overflow-y-auto scrollbar-hide">
        <div>
          <Subheading>{t("Admin.subheading")}</Subheading>
          <Divider className="w-[75%] my-1" />
          <Input
            label={t("Admin.adminName")}
            type="text"
            labelPlacement="outside"
            value={adminName}
            onValueChange={(e) => {
              setAdminName(e);
              setAdminNameError(false);
            }}
            errorMessage={adminNameError ? t("Admin.adminNameError") : null}
            isInvalid={adminNameError}
          />
        </div>
        <Input
          label={t("Admin.adminEmail")}
          type="text"
          labelPlacement="outside"
          value={adminEmail}
          onValueChange={(e) => {
            setAdminEmail(e);
            setAdminEmailError(false);
          }}
          errorMessage={adminEmailError ? t("Admin.adminEmailError") : null}
          isInvalid={adminEmailError}
        />

        <div className="flex flex-row gap-2 items-center">
          <Input
            label={t("Admin.adminPassword")}
            type={isVisible ? "text" : "password"}
            labelPlacement="outside"
            value={adminPassword}
            onValueChange={(e) => {
              setAdminPassword(e);
              setAdminPasswordError(false);
            }}
            errorMessage={
              adminPasswordError ? t("Admin.adminPasswordError") : null
            }
            isInvalid={adminPasswordError}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <Eye className="w-4 h-4  pointer-events-none" />
                ) : (
                  <EyeClosed className="w-4 h-4 pointer-events-none" />
                )}
              </button>
            }
          />
          <Tooltip
            size="sm"
            content={
              <div className="px-1 py-2 max-w-[250px]">
                <div>
                  <Paragraph> Password Requirements</Paragraph>
                </div>
                <div>
                  <Tiny>1. Minimum 8 characters</Tiny>
                  <Tiny>2. At least one uppercase letter</Tiny>
                  <Tiny>3. At least one lowercase letter</Tiny>
                  <Tiny>4. At least one Numerical digit</Tiny>
                  <Tiny>5. At least one special character (@$!%*?&)</Tiny>
                </div>
              </div>
            }
          >
            <CircleQuestionMarkIcon className="w-4 h-4" />
          </Tooltip>
        </div>
        <div className="flex flex-row gap-2">
          <Input
            label={t("Admin.adminRepeatPassword")}
            type={isRepeatVisible ? "text" : "password"}
            labelPlacement="outside"
            value={adminRepeatPassword}
            onValueChange={(e) => {
              setAdminRepeatPassword(e);
              setAdminRepeatPasswordError(false);
            }}
            errorMessage={
              adminRepeatPasswordError
                ? t("Admin.adminRepeatPasswordError")
                : null
            }
            isInvalid={adminRepeatPasswordError}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleRepeatVisibility}
              >
                {isRepeatVisible ? (
                  <Eye className=" w-4 h-4  pointer-events-none" />
                ) : (
                  <EyeClosed className=" w-4 h-4  pointer-events-none" />
                )}
              </button>
            }
          />
        </div>
      </div>
      <div className="w-full h-[50px] flex items-center justify-end">
        <div className="mr-4">
          <Button onPress={handleNext}>{t("next2")}</Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
