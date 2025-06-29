import Button from "@/components/themes/Button";
import Input from "@/components/themes/Input";
import Paragraph from "@/components/themes/Paragraph";
import Select from "@/components/themes/Select";
import Subheading from "@/components/themes/SubHeading";
import useSmtpStore from "@/store/workspace/useSmtpStore";
import { addToast, Divider, SelectItem } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useShakeOnMount } from "@/hooks/useShakeAnimation";
import Switch from "@/components/themes/Switch";

const SmtpSettings = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isRepeatVisible, setIsRepeatVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleRepeatVisibility = () => setIsRepeatVisible(!isRepeatVisible);

  const protocols = [
    { label: "SMTP", value: "smtp" },
    { label: "SMTPS", value: "smtps" },
  ];

  const t = useTranslations("Smtp");

  const {
    getEmailSettings,
    smtpHost,
    setSmtpHost,
    smtpHostError,
    setSmtpHostError,

    smtpPort,
    setSmtpPort,
    smtpPortError,
    setSmtpPortError,

    smtpPassword,
    setSmtpPassword,
    smtpPasswordError,
    setSmtpPasswordError,

    smtpUsername,
    setSmtpUsername,
    smtpUsernameError,
    setSmtpUsernameError,

    smtpProtocol,
    setSmtpProtocol,
    smtpProtocolError,
    setSmtpProtocolError,

    smtpEnableSmtpAuth,
    setSmtpEnableSmtpAuth,

    smtpEnableStartTls,
    setSmtpEnableStartTls,
    testEmailSettings,
    updateEmailSettings,
  } = useSmtpStore();

  const [smtpLoading, setSmtpLoading] = React.useState(false);
  const [confirmButton, setConfirmButton] = React.useState(false);
  const { ref, controls, variants, trigger } = useShakeOnMount();

  useEffect(() => {
    fetchEmailSettings();
  }, []);

  useEffect(() => {
    if (confirmButton) {
      trigger(); // manually trigger shake when button is shown
    }
  }, [confirmButton]);

  const fetchEmailSettings = async () => {
    const orgId = localStorage.getItem("orgId");
    if (!orgId) return;
    const data = {
      orgID: orgId,
    };
    const response = await getEmailSettings(orgId);
  };

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

    const data = {
      springMailProtocol: smtpProtocol,
      springMailHost: smtpHost,
      springMailPort: smtpPort,
      springMailUsername: smtpUsername,
      springMailPassword: smtpPassword,
      springMailPropertiesMailSmtpAuth: String(smtpEnableSmtpAuth),
      springMailPropertiesMailSmtpStarttlsEnable: String(smtpEnableStartTls),
    };

    try {
      const response = await testEmailSettings(data);
      if (response.code === 200) {
        setConfirmButton(true);
        addToast({
          title: t("testSuccessMessage"),
          color: "success",
        });
      } else {
        addToast({
          title: t("testErrorMessage"),
          color: "danger",
        });
      }
    } catch (error) {
      setSmtpLoading(false);
      console.log(error);
    } finally {
      setSmtpLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const orgId = localStorage.getItem("orgId");
      if (!orgId) return;

      const data = {
        orgID: orgId,
        springMailProtocol: smtpProtocol,
        springMailHost: smtpHost,
        springMailPort: smtpPort,
        springMailUsername: smtpUsername,
        springMailPassword: smtpPassword,
        springMailPropertiesMailSmtpAuth: String(smtpEnableSmtpAuth),
        springMailPropertiesMailSmtpStarttlsEnable: String(smtpEnableStartTls),
      };

      const response = await updateEmailSettings(data);
      if (response.status === 200) {
        addToast({
          title: t("updateSuccess"),
          color: "success",
        });

        setConfirmButton(false);
        fetchEmailSettings();
      } else {
        addToast({
          title: t("updateError"),
          color: "danger",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-h-[calc(100dvh-220px)] overflow-y-auto scrollbar-hide">
      <div className="flex  gap-4 ">
        <Input
          isDisabled={smtpLoading}
          label={t("smtpPort")}
          type="text"
          labelPlacement="outside"
          value={smtpPort}
          onValueChange={(e) => {
            setSmtpPort(e);
            setSmtpPortError(false);
            setConfirmButton(false);
          }}
          errorMessage={smtpPortError ? t("smtpPortError") : null}
          isInvalid={smtpPortError}
        />

        <Select
          labelPlacement="outside"
          isDisabled={smtpLoading}
          label={t("smtpProtocol")}
          errorMessage={smtpProtocolError ? t("smtpProtocolError") : ""}
          isInvalid={smtpProtocolError}
          selectedKeys={[smtpProtocol]}
          onChange={(e) => {
            setSmtpProtocol(e.target.value);
            setSmtpProtocolError(false);
            setConfirmButton(false);
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
      </div>
      <div className="flex gap-4 mt-2">
        <Input
          isDisabled={smtpLoading}
          label={t("smtpHost")}
          type="text"
          labelPlacement="outside"
          value={smtpHost}
          onValueChange={(e) => {
            setSmtpHost(e);
            setSmtpHostError(false);
            setConfirmButton(false);
          }}
          errorMessage={smtpHostError ? t("smtpHostError") : null}
          isInvalid={smtpHostError}
        />
        <Input
          isDisabled={smtpLoading}
          label={t("smtpUsername")}
          type="text"
          labelPlacement="outside"
          value={smtpUsername}
          onValueChange={(e) => {
            setSmtpUsername(e);
            setSmtpUsernameError(false);
            setConfirmButton(false);
          }}
          errorMessage={smtpUsernameError ? t("smtpUsernameError") : null}
          isInvalid={smtpUsernameError}
        />
      </div>
      <div className="flex gap-4 mt-2">
        <Input
          isDisabled={smtpLoading}
          label={t("smtpPassword")}
          type={isRepeatVisible ? "text" : "password"}
          labelPlacement="outside"
          value={smtpPassword}
          onValueChange={(e) => {
            setSmtpPassword(e);
            setSmtpPasswordError(false);
            setConfirmButton(false);
          }}
          errorMessage={smtpPasswordError ? t("smtpPasswordError") : null}
          isInvalid={smtpPasswordError}
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
      <div className="mt-4 flex gap-4 w-full">
        <Switch
          isSelected={smtpEnableSmtpAuth}
          onValueChange={(e) => {
            setSmtpEnableSmtpAuth(e);
            setConfirmButton(false);
          }}
          label={<Subheading>{t("smtpAuth")}</Subheading>}
        />

        <Switch
          isSelected={smtpEnableStartTls}
          onValueChange={(e) => {
            setSmtpEnableStartTls(e);
            setConfirmButton(false);
          }}
          label={<Subheading>{t("tls")}</Subheading>}
        />
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
            isDisabled={smtpLoading}
            isLoading={smtpLoading}
            onPress={() => {
              if (!confirmButton) {
                handleTestConnection(); // first press triggers shake
              } else {
                handleUpdate();
                setConfirmButton(false); // reset state if needed
              }
            }}
          >
            {confirmButton ? t("update") : t("test")}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SmtpSettings;
