import useSetupstore from "@/store/setup/useSetupStore";
import React, { useEffect } from "react";
import Button from "../themes/Button";
import Input from "../themes/Input";
import ThemetypeSelector from "../ux/ThemetypeSelector";
import { useTranslations } from "next-intl";
import Select from "../themes/Select";
import { addToast, Divider, SelectItem, Switch, Tooltip } from "@heroui/react";
import Paragraph from "../themes/Paragraph";
import Subheading from "../themes/SubHeading";
import { CircleQuestionMarkIcon, Eye, EyeClosed } from "lucide-react";
import Tiny from "../themes/Tiny";

const Email = () => {
  const {
    smtpHost,
    setSmtpHost,
    smtpPort,
    setSmtpPort,
    smtpUsername,
    setSmtpUsername,
    smtpPassword,
    setSmtpPassword,
    smtpProtocol,
    setSmtpProtocol,
    smtpEnableSmtpAuth,
    setSmtpEnableSmtpAuth,
    smtpEnableStartTls,
    setSmtpEnableStartTls,
    smtpHostError,
    setSmtpHostError,
    smtpPortError,
    setSmtpPortError,
    smtpUsernameError,
    setSmtpUsernameError,
    smtpPasswordError,
    setSmtpPasswordError,
    smtpProtocolError,
    setSmtpProtocolError,

    smtpTestSuccessful,
    setSmtpTestSuccessful,

    smtpLoading,
    setSmtpLoading,

    testSmtpConnection,

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

  const protocols = [
    { label: "SMTP", value: "smtp" },
    { label: "SMTPS", value: "smtps" },
  ];

  useEffect(() => {
    setCurrentTab("smtp");
  }, [currentTab]);

  const handleTestConnection = async () => {
    if (smtpProtocol === "") {
      setSmtpProtocolError(true);
      return;
    }
    if (smtpHost === "") {
      setSmtpHostError(true);
      return;
    }
    if (smtpPort === "") {
      setSmtpPortError(true);
      return;
    }
    if (smtpUsername === "") {
      setSmtpUsernameError(true);
      return;
    }
    if (smtpPassword === "") {
      setSmtpPasswordError(true);
      return;
    }
    setSmtpLoading(true);

    try {
      const data = {
        springMailProtocol: smtpProtocol,
        springMailHost: smtpHost,
        springMailPort: smtpPort,
        springMailUsername: smtpUsername,
        springMailPassword: smtpPassword,
        springMailPropertiesMailSmtpAuth: String(smtpEnableSmtpAuth),
        springMailPropertiesMailSmtpStarttlsEnable: String(smtpEnableStartTls),
      };
      const response = await testSmtpConnection(data);

      if (response.code === 200) {
        setSmtpTestSuccessful(true);
        addToast({
          title: t("Email.testSuccessMessage"),
          color: "success",
        });
      } else {
        setSmtpTestSuccessful(false);
        if (response.message === undefined) {
          addToast({
            title: t("Email.testErrorMessage"),
            color: "danger",
          });
        } else {
          addToast({
            title: t("Email.testErrorMessage"),
            color: "danger",
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSmtpLoading(false);
    }
  };

  const handleNext = () => {
    if (smtpTestSuccessful) {
      setDisabledKeys(["apps"]);
      setCurrentTab("advanced");
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-[calc(100%-50px)] flex flex-col gap-4  max-h-[calc(100%-50px)] overflow-y-auto scrollbar-hide">
        <div>
          <Subheading>{t("Email.subheading")}</Subheading>
          <Divider className="w-[75%] my-1" />
          <Input
            label={t("Email.smtpPort")}
            type="text"
            labelPlacement="outside"
            value={smtpPort}
            onValueChange={(e) => {
              setSmtpPort(e);
              setSmtpPortError(false);
              setSmtpTestSuccessful(false);
            }}
            errorMessage={smtpPortError ? t("Email.smtpPortError") : null}
            isInvalid={smtpPortError}
          />
        </div>
        <Select
          labelPlacement="outside"
          isDisabled={smtpLoading}
          label={t("Email.smtpProtocol")}
          errorMessage={smtpProtocolError ? t("Email.smtpProtocolError") : ""}
          isInvalid={smtpProtocolError}
          selectedKeys={[smtpProtocol]}
          onChange={(e) => {
            setSmtpProtocol(e.target.value);
            setSmtpProtocolError(false);
            setSmtpTestSuccessful(false);
          }}
        >
          {protocols.map((orgsize) => (
            <SelectItem
              classNames={{
                base: "text-textcolor",
              }}
              key={orgsize.value}
            >
              {orgsize.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          label={t("Email.smtpHost")}
          type="text"
          labelPlacement="outside"
          value={smtpHost}
          onValueChange={(e) => {
            setSmtpHost(e);
            setSmtpHostError(false);
            setSmtpTestSuccessful(false);
          }}
          errorMessage={smtpHostError ? t("Email.smtpHostError") : null}
          isInvalid={smtpHostError}
        />
        <Input
          label={t("Email.smtpUsername")}
          type="text"
          labelPlacement="outside"
          value={smtpUsername}
          onValueChange={(e) => {
            setSmtpUsername(e);
            setSmtpUsernameError(false);
            setSmtpTestSuccessful(false);
          }}
          errorMessage={smtpUsernameError ? t("Email.smtpUsernameError") : null}
          isInvalid={smtpUsernameError}
        />
        <Input
          label={t("Email.smtpPassword")}
          type={isRepeatVisible ? "text" : "password"}
          labelPlacement="outside"
          value={smtpPassword}
          onValueChange={(e) => {
            setSmtpPassword(e);
            setSmtpPasswordError(false);
            setSmtpTestSuccessful(false);
          }}
          errorMessage={smtpPasswordError ? t("Email.smtpPasswordError") : null}
          isInvalid={smtpPasswordError}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleRepeatVisibility}
            >
              {isRepeatVisible ? (
                <Eye className=" w-5 h-5  pointer-events-none" />
              ) : (
                <EyeClosed className=" w-5 h-5  pointer-events-none" />
              )}
            </button>
          }
        />

        <Switch
          isDisabled={smtpLoading}
          color="success"
          classNames={{
            base: "data-[selected=true]:border-primary",
            wrapper:
              "bg-switchbackground border-inputborder data-[selected=true]:bg-black ",
          }}
          size="sm"
          isSelected={smtpEnableSmtpAuth}
          onValueChange={(e) => {
            setSmtpEnableSmtpAuth(e);
            setSmtpTestSuccessful(false);
          }}
        >
          <Paragraph>{t("Email.smtpAuth")}</Paragraph>
        </Switch>

        <Switch
          isDisabled={smtpLoading}
          color="success"
          classNames={{
            base: "data-[selected=true]:border-primary",
            wrapper:
              "bg-switchbackground border-inputborder data-[selected=true]:bg-black ",
          }}
          size="sm"
          isSelected={smtpEnableStartTls}
          onValueChange={(e) => {
            setSmtpEnableStartTls(e);
            setSmtpTestSuccessful(false);
          }}
        >
          <Paragraph>{t("Email.tls")}</Paragraph>
        </Switch>
      </div>
      <div className="w-full h-[50px] flex items-center justify-end">
        <div className="mr-4">
          <Button onPress={handleTestConnection}>{t("Email.test")}</Button>
        </div>
        <div className="mr-4">
          <Button
            onPress={handleNext}
            isDisabled={!smtpTestSuccessful || smtpLoading}
          >
            {t("next2")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Email;
