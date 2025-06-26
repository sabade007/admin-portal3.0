import useSetupstore from "@/store/setup/useSetupStore";
import React, { useEffect } from "react";
import Button from "../themes/Button";
import Input from "../themes/Input";
import ThemetypeSelector from "../ux/ThemetypeSelector";
import { useTranslations } from "next-intl";
import Select from "../themes/Select";
import {
  addToast,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SelectItem,
} from "@heroui/react";
import Paragraph from "../themes/Paragraph";
import Subheading from "../themes/SubHeading";
import useSetupApplicationStore from "@/store/setup/useSetupApplicationStore";
import Heading from "../themes/Heading";
import { encryptPassword } from "@/hooks/passwordEncryption";
import { encryptValues } from "@/hooks/encryptValue";
import { useRouter } from "next/navigation";
import { env } from "next-runtime-env";
import decryptValues from "@/hooks/decryptValue";

const Applications = () => {
  const {
    selfRegistrationEnabled,

    enableLdap,

    submitLoading,
    setSubmitLoading,

    adminPassword,
    adminName,
    contactName,
    adminEmail,
    contactPhone,
    organizationType,
    organizationName,
    organizationIndustry,
    organizationSize,
    contactWebsite,
    contactCountry,
    smtpProtocol,
    smtpHost,
    smtpPort,
    smtpEnableSmtpAuth,
    smtpEnableStartTls,
    smtpUsername,
    smtpPassword,
    submitSetupWizard,

    currentTab,
    setCurrentTab,

    reset,
  } = useSetupstore();

  const {
    applicationIndryve,
    setApplicationIndryve,

    applicationIndryveUrl,
    setApplicationIndryveUrl,

    applicationChat,
    setApplicationChat,

    applicationChatUrl,
    setApplicationChatUrl,

    applicationMail,
    setApplicationMail,

    applicationMailUrl,
    setApplicationMailUrl,

    applicationMeet,
    setApplicationMeet,

    applicationMeetUrl,
    setApplicationMeetUrl,

    applicationVideos,
    setApplicationVideos,

    applicationVideosUrl,
    setApplicationVideosUrl,

    captchaId,
    setCaptchaId,

    captchaValue,
    setCaptchaValue,

    captchaString,
    setCaptchaString,

    getCaptcha,

    handleLoginSubmit,
    createnewApplication,
    getUserDetails,
    handleLogoutsubmit,
  } = useSetupApplicationStore();

  const t = useTranslations("Setup");
  const [showCaptchModal, setShowCaptchModal] = React.useState(false);
  const [verifyLoading, setVerifyLoading] = React.useState(false);
  const [creatingApplications, setCreatingApplications] = React.useState(false);
  const [cleaningUp, setCleaningUp] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    setCurrentTab("apps");
  }, [currentTab]);

  const handleFinish = async () => {
    const encryptedPassword = encryptPassword(adminPassword);
    let selectedValue = "";

    switch (true) {
      case selfRegistrationEnabled && enableLdap:
        selectedValue = "ALL";
        break;
      case selfRegistrationEnabled && !enableLdap:
        selectedValue = "ONLY_DB";
        break;
      case !selfRegistrationEnabled && enableLdap:
        selectedValue = "ONLY_LDAP";
        break;
      default:
        selectedValue = "ONLY_DB";

        break;
    }

    const data = {
      userName: adminName,
      fullName: contactName,
      email: adminEmail,
      password: encryptedPassword,
      phone: contactPhone,
      organizationalType: organizationType,
      organizationalName: organizationName,
      industry: organizationIndustry,
      size: organizationSize,
      website: contactWebsite,
      country: contactCountry,
      authenticationFlow: selectedValue,
      emailConfig: {
        orgID: "",
        springMailProtocol: smtpProtocol,
        springMailHost: smtpHost,
        springMailPort: smtpPort,
        springMailPropertiesMailSmtpStarttlsEnable: String(smtpEnableStartTls),
        springMailPropertiesMailSmtpAuth: String(smtpEnableSmtpAuth),
        springMailUsername: smtpUsername,
        springMailPassword: smtpPassword,
      },
    };
    setSubmitLoading(true);
    try {
      const response = await submitSetupWizard(data);
      if (response.responseCode === 200) {
        addToast({
          title: response.message,
          color: "success",
        });

        const captchaResponse = await getCaptcha();
        if (captchaResponse.responseCode === 200) {
          setShowCaptchModal(true);
        }
      } else {
        if (response.message === undefined) {
        } else {
          addToast({
            title: response.message,
            color: "danger",
          });
        }

        return;
      }
    } catch (error: any) {
      addToast({
        title: error.message,
        color: "danger",
      });

      console.log(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handlesubmitLogin = async () => {
    setVerifyLoading(true);

    const encryptedPassword = encryptPassword(adminPassword);
    const data = {
      username: adminName,
      password: encryptedPassword,
      captchaId: captchaId,
      captchaValue: captchaValue,
    };
    try {
      const response = await handleLoginSubmit(data);
      if (response.responseCode === 200) {
        localStorage.clear();
        const userEncryptionData = await encryptValues({
          token: response.token,
          refreshToken: response.refreshToken,
          username: response.username,
          email: response.email,
          type: "DB_LOGIN",
          idToken: "IdToken",
        });
        if (!userEncryptionData) {
          router.push("/admin/login");
          addToast({
            title: response.message,
            color: "success",
          });
        }

        const userdetailsResponse = await getUserDetails();

        const orgId = userdetailsResponse.orgId;
        const oauthUrl = env("NEXT_PUBLIC_OAUTH_URL");

        setCreatingApplications(true);

        const apps = [
          {
            name: applicationIndryve,
            baseUrl: applicationIndryveUrl,
          },
          {
            name: applicationMail,
            baseUrl: applicationMailUrl,
          },
          {
            name: applicationChat,
            baseUrl: applicationChatUrl,
          },
          {
            name: applicationMeet,
            baseUrl: applicationMeetUrl,
          },
          {
            name: applicationVideos,
            baseUrl: applicationVideosUrl,
          },
        ];

        for (const app of apps) {
          const redirectUri = `${app.baseUrl}/callback`;
          const fullUrl = `${oauthUrl}?redirect_uri=${redirectUri}`;
          const body = {
            applicationName: app.name,
            applicationUrl: fullUrl,
            applicationLogo: "",
            isEnabled: true,
            roleId: [],
            isDefault: true,
          };

          try {
            const createdresponse = await createnewApplication(body, orgId);
            console.log(`Created app: ${app.name}`, createdresponse);
          } catch (error: any) {
            router.push("/admin/login");
            console.error(`Failed to create app: ${app.name}`, error);
          }
        }

        addToast({
          title: "All Applications Created Successfully",
          color: "success",
        });

        CleanUpBrowser();
      } else {
        getCaptcha();
        addToast({
          title: "Invalid Captcha",
          color: "danger",
        });
        setVerifyLoading(false);
        return;
      }
    } catch (error: any) {
      router.push("/admin/login");
      addToast({
        title: error.message,
        color: "danger",
      });
      console.log(error);
    }
  };

  const CleanUpBrowser = async () => {
    setCreatingApplications(false);
    setCleaningUp(true);

    const localdata = await decryptValues(["token"]);
    if (!localdata || !localdata.token) {
      console.warn("No valid token found, skipping logout API call.");
      localStorage.clear();
      router.push("/admin/login");
      return;
    }
    const formdata = {
      expiry: 0,
      jwtToken: localdata.token,
    };

    const response = await handleLogoutsubmit(formdata);
    reset();

    localStorage.clear();
    router.push("/admin/login");
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-[calc(100%-50px)] flex flex-col gap-4  max-h-[calc(100%-50px)] overflow-y-auto scrollbar-hide">
        <div>
          <Subheading>{t("Applications.subheading")}</Subheading>
          <Divider className="w-[75%] my-1" />
        </div>

        <div className="flex flex-col">
          <Subheading>{t("Applications.indryve")}</Subheading>
          <Input
            isDisabled={submitLoading}
            labelPlacement="inside"
            value={applicationIndryveUrl}
            onValueChange={setApplicationIndryveUrl}
            label={t("Applications.url")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Subheading>{t("Applications.chat")}</Subheading>
          <Input
            isDisabled={submitLoading}
            labelPlacement="inside"
            value={applicationChatUrl}
            onValueChange={setApplicationChatUrl}
            label={t("Applications.url")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Subheading>{t("Applications.mail")}</Subheading>
          <Input
            isDisabled={submitLoading}
            labelPlacement="inside"
            value={applicationMailUrl}
            onValueChange={setApplicationMailUrl}
            label={t("Applications.url")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Subheading>{t("Applications.meet")}</Subheading>
          <Input
            isDisabled={submitLoading}
            labelPlacement="inside"
            value={applicationMeetUrl}
            onValueChange={setApplicationMeetUrl}
            label={t("Applications.url")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Subheading>{t("Applications.video")}</Subheading>
          <Input
            isDisabled={submitLoading}
            labelPlacement="inside"
            value={applicationVideosUrl}
            onValueChange={setApplicationVideosUrl}
            label={t("Applications.url")}
          />
        </div>
      </div>
      <div className="w-full h-[50px] flex items-center justify-end">
        <div className="mr-4">
          <Button
            isLoading={submitLoading}
            isDisabled={submitLoading}
            onPress={handleFinish}
          >
            {t("finish")}
          </Button>
        </div>
      </div>
      <Modal
        isDismissable={false}
        isOpen={showCaptchModal}
        classNames={{
          closeButton: "hidden",
        }}
        onClose={() => setShowCaptchModal(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Heading>{t("Modal.title")}</Heading>
                <Paragraph>{t("Modal.description")}</Paragraph>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row items-center gap-2">
                  <Input
                    labelPlacement="inside"
                    value={captchaValue}
                    isDisabled={verifyLoading}
                    onValueChange={setCaptchaValue}
                    label={t("Modal.captchaValue")}
                  />
                  {captchaString && (
                    <img
                      src={captchaString}
                      alt="captcha"
                      style={{ height: "40px", width: "auto" }}
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={verifyLoading}
                  isDisabled={verifyLoading}
                  onPress={handlesubmitLogin}
                >
                  {t("Modal.verify")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Applications;
