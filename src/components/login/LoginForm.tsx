import React, { useState } from "react";
import d from "@/assets/light/d.png";
import Heading from "../themes/Heading";
import Paragraph from "../themes/Paragraph";
import { useTranslations } from "next-intl";
import Input from "../themes/Input";
import useLoginStore from "@/store/login/useLoginStore";
import {
  addToast,
  Divider,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "@heroui/react";
import {
  ArrowLeft,
  Eye,
  EyeClosed,
  LucideLayoutDashboard,
  SquareDashedBottom,
  Utensils,
  UtilityPole,
} from "lucide-react";
import Subheading from "../themes/SubHeading";
import Button from "../themes/Button";
import LanguageSwitcher from "../ux/LanguageSwitcher";
import FontSizeSelector from "../ux/FontsizeSelector";
import ThemeSwitch from "../ux/ThemeSwitch";
import ThemetypeSelector from "../ux/ThemetypeSelector";
import { encryptPassword } from "@/hooks/passwordEncryption";
import { encryptValues } from "@/hooks/encryptValue";
import useTokenStore from "@/store/login/useTokenStore";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const t = useTranslations("Login");
  const {
    userName,
    setUserName,
    userNameError,
    setUserNameError,

    password,
    setPassword,
    passwordError,
    setPasswordError,

    captchaId,
    setCaptchaId,
    captchaString,
    setCaptchaString,

    captchaValue,
    setCaptchaValue,
    captchaValueError,
    setCaptchaValueError,

    forgotPasswordemail,
    setForgotPasswordemail,
    forgotPasswordemailError,
    setForgotPasswordemailError,

    handleLoginSubmit,
    handleLogoutsubmit,
    handleForgotPasswordsubmit,

    getCaptcha,
  } = useLoginStore();

  const [isVisible, setIsVisible] = React.useState(false);
  const [isRepeatVisible, setIsRepeatVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleRepeatVisibility = () => setIsRepeatVisible(!isRepeatVisible);

  const [showType, setShowType] = useState<"login" | "forgotPassword">("login");

  const [showutility, setShowUtility] = useState(false);
  const [loginLoadingState, setLoginLoadingState] = React.useState(false);
  const [forgotPasswordLoadingState, setForgotPasswordLoadingState] =
    React.useState(false);

  const { sessionExpired, setSessionExpired } = useTokenStore();
  const router = useRouter();

  const handleLogin = async () => {
    if (userName === "") {
      setUserNameError(true);
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }
    if (captchaValue === "") {
      setCaptchaValueError(true);
      return;
    }

    setLoginLoadingState(true);
    const encryptedPassword = encryptPassword(password);

    const data = {
      username: userName,
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

        if (userEncryptionData) {
          addToast({
            title: t("LoginForm.loginSuccessMessage"),
            color: "success",
          });
          setSessionExpired(false);

          ///// route if succesful

          const username = response.username || null;

          router.push(`/workspace/${username}`);
          setTimeout(() => {
            setLoginLoadingState(false);
          }, 2000);
        } else {
          localStorage.clear();
          setLoginLoadingState(false);
          await getCaptcha();
          addToast({
            title: t("LoginForm.localStorageError"),
            color: "danger",
          });
          return;
        }
      } else {
        await getCaptcha();
        setLoginLoadingState(false);

        addToast({
          title: t("LoginForm.loginErrorMessage"),
          color: "danger",
        });
      }
    } catch (err) {
      setLoginLoadingState(false);
      console.log(err);
    }
  };

  const emailValidator = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleForgotPasswordSubmit = async () => {
    if (forgotPasswordemail === "" || !emailValidator(forgotPasswordemail)) {
      setForgotPasswordemailError(true);
      return;
    }
    setForgotPasswordLoadingState(true);

    const data = {
      mailId: forgotPasswordemail,
      fileId: "",
      userNames: "",
    };
    try {
      const response = await handleForgotPasswordsubmit(data);

      if (response.code === 200) {
        setForgotPasswordLoadingState(true);
        false;

        setForgotPasswordemailError(false);
        setForgotPasswordemail("");

        addToast({
          title: t("ForgotPassword.forgotSuccessMessage"),
          color: "success",
        });
        setForgotPasswordLoadingState(false);
      } else {
        setForgotPasswordLoadingState(false);
        addToast({
          title: t("ForgotPassword.forgotErrorMessage"),
          color: "danger",
        });
      }
    } catch (err) {
      setForgotPasswordLoadingState(false);
      console.log(err);
    }
  };

  return (
    <div className=" min-w-[280px] max-h-[90dvh] overflow-y-auto  ">
      <div className="flex flex-col items-center">
        <img src={d.src} alt="logo" className="w-auto h-8 mb-2" />
      </div>
      {showType === "login" && (
        <div className="flex flex-col gap-2 ">
          <div className="w-full flex flex-row items-center justify-between mt-2 ">
            <div className="flex flex-col">
              <Subheading>{t("LoginForm.title")}</Subheading>
              <Paragraph>{t("LoginForm.description")}</Paragraph>
            </div>
            <Tooltip content={t("LoginForm.tooltip")}>
              <Button onPress={() => setShowUtility(!showutility)} isIconOnly>
                <LucideLayoutDashboard className="w-5 h-5" />
              </Button>
            </Tooltip>
          </div>
          <Divider />

          <div className="w-full flex flex-col">
            <Input
              label={t("LoginForm.email")}
              type="text"
              isDisabled={loginLoadingState}
              labelPlacement="outside"
              value={userName}
              onValueChange={(e) => {
                setUserName(e);
                setUserNameError(false);
              }}
              errorMessage={userNameError ? t("LoginForm.emailError") : null}
              isInvalid={userNameError}
            />
          </div>
          <Input
            label={t("LoginForm.password")}
            type={isVisible ? "text" : "password"}
            labelPlacement="outside"
            isDisabled={loginLoadingState}
            value={password}
            onValueChange={(e) => {
              setPassword(e);
              setPasswordError(false);
            }}
            errorMessage={passwordError ? t("LoginForm.passwordError") : null}
            isInvalid={passwordError}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <Eye className="w-5 h-5  pointer-events-none" />
                ) : (
                  <EyeClosed className="w-5 h-5 pointer-events-none" />
                )}
              </button>
            }
          />
          <div className="flex flex-row items-end  gap-2">
            <Input
              value={captchaValue}
              isDisabled={loginLoadingState}
              onValueChange={setCaptchaValue}
              label={t("LoginForm.captcha")}
            />
            {captchaString && (
              <img
                src={captchaString}
                alt="captcha"
                style={{ height: "40px", width: "auto" }}
              />
            )}
          </div>
          <div
            onClick={() => setShowType("forgotPassword")}
            aria-disabled={loginLoadingState}
            className="p-1 cursor-pointer"
          >
            <Paragraph>{t("LoginForm.forgot")}</Paragraph>
          </div>
          <Button
            isDisabled={loginLoadingState}
            isLoading={loginLoadingState}
            onPress={handleLogin}
          >
            {t("LoginForm.login")}
          </Button>

          {showutility && <Divider className="my-2" />}

          {showutility && (
            <div className="w-full flex flex-row gap-2 items-center">
              <LanguageSwitcher />
              <FontSizeSelector />
              <ThemeSwitch />
              <ThemetypeSelector />
            </div>
          )}
        </div>
      )}
      {showType === "forgotPassword" && (
        <div className="flex flex-col gap-2 mt-4 w-full">
          <div className="w-full flex flex-row items-center gap-4 justify-between mt-2 ">
            <div className="flex flex-col">
              <Subheading>{t("ForgotPassword.title")}</Subheading>
              <Paragraph>{t("ForgotPassword.description")}</Paragraph>
            </div>
            <Tooltip content={t("LoginForm.tooltip")}>
              <Button onPress={() => setShowUtility(!showutility)} isIconOnly>
                <LucideLayoutDashboard className="w-5 h-5" />
              </Button>
            </Tooltip>
          </div>
          <Divider />
          <Input
            label={t("ForgotPassword.email")}
            type="email"
            isDisabled={forgotPasswordLoadingState}
            labelPlacement="outside"
            value={forgotPasswordemail}
            onValueChange={(e) => {
              setForgotPasswordemail(e);
              setForgotPasswordemailError(false);
            }}
            errorMessage={
              forgotPasswordemailError ? t("ForgotPassword.emailError") : null
            }
            isInvalid={forgotPasswordemailError}
          />

          <div className="flex flex-row items-end mt-4 gap-2 w-full">
            <Button
              isDisabled={forgotPasswordLoadingState}
              isIconOnly
              onPress={() => setShowType("login")}
            >
              <ArrowLeft />
            </Button>
            <Button
              isDisabled={forgotPasswordLoadingState}
              isLoading={forgotPasswordLoadingState}
              onPress={handleForgotPasswordSubmit}
            >
              {t("ForgotPassword.submit")}
            </Button>
          </div>
          {showutility && <Divider className="my-2" />}

          {showutility && (
            <div className="w-full flex flex-row gap-2 items-center">
              <LanguageSwitcher />
              <FontSizeSelector />
              <ThemeSwitch />
              <ThemetypeSelector />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
