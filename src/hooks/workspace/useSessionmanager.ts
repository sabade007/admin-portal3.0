"use client";

import decryptValues from "@/hooks/decryptValue";
import { encryptValues } from "@/hooks/encryptValue";
import useTokenStore from "@/store/login/useTokenStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const IDLE_WARNING_TIME = 14 * 60 * 1000; // 14 minutes
const IDLE_EXPIRE_TIME = 15 * 60 * 1000; // 15 minutes

interface DecryptedData {
  token?: string;
  refreshToken?: string;
  username?: string;
  email?: string;
}

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export const useSessionManager = () => {
  const router = useRouter();
  const { username: paramUsername } = useParams() as { username: string };

  const {
    extendSession,
    tokenValidCheck,
    tokenValidation,
    sessionExpired,
    setSessionExpired,
  } = useTokenStore();

  const [firstCheckLoading, setFirstCheckLoading] = useState(true);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [warningCountdown, setWarningCountdown] = useState(60);

  const warningIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // 1. Initial session validation
  useEffect(() => {
    const firstCheck = async () => {
      setFirstCheckLoading(true);
      try {
        const localData = (await decryptValues([
          "token",
          "refreshToken",
          "username",
          "email",
        ])) as DecryptedData;

        if (
          localData?.username === paramUsername &&
          localData.token &&
          (await tokenValidCheck(localData.token))
        ) {
          setSessionExpired(false);
        } else {
          setSessionExpired(true);
        }
      } catch {
        setSessionExpired(true);
      } finally {
        setFirstCheckLoading(false);
      }
    };
    firstCheck();
  }, [paramUsername]);

  // 2. Token auto-renewal
  useEffect(() => {
    const parseJwt = (token: string): JwtPayload | null => {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(jsonPayload);
      } catch {
        return null;
      }
    };

    const intervalId = setInterval(async () => {
      try {
        const userData = (await decryptValues([
          "token",
          "refreshToken",
          "username",
        ])) as DecryptedData;

        if (!userData?.token || userData.username !== paramUsername) {
          setSessionExpired(true);
          return;
        }

        const valid = await tokenValidation(userData.token);
        if (!valid) {
          setSessionExpired(true);
          return;
        }

        const tokenData = parseJwt(userData.token);
        if (tokenData?.exp) {
          const timeLeft = tokenData.exp * 1000 - Date.now();
          if (timeLeft < 5 * 60 * 1000) {
            const resp = await extendSession(
              userData.token,
              userData.refreshToken!
            );
            if (resp.responseCode === 200) {
              await encryptValues({
                token: resp.newJwtToken,
                refreshToken: resp.newRefreshToken,
              });
              setSessionExpired(false);
            } else {
              setSessionExpired(true);
            }
          }
        }
      } catch {
        setSessionExpired(true);
      }
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [paramUsername]);

  // 3. Idle detection
  useEffect(() => {
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
      if (warningModalOpen) {
        setWarningModalOpen(false);
        if (warningIntervalRef.current) {
          clearInterval(warningIntervalRef.current);
          warningIntervalRef.current = null;
        }
      }
    };

    const checkIdle = () => {
      if (sessionExpired) return;

      const idleTime = Date.now() - lastActivityRef.current;

      if (idleTime >= IDLE_EXPIRE_TIME) {
        setWarningModalOpen(false);
        setSessionExpired(true);
        localStorage.setItem("logout", Date.now().toString());
      } else if (idleTime >= IDLE_WARNING_TIME && !warningModalOpen) {
        setWarningModalOpen(true);
        setWarningCountdown(60);

        if (!warningIntervalRef.current) {
          warningIntervalRef.current = setInterval(() => {
            setWarningCountdown((prev) => {
              if (prev <= 1) {
                if (warningIntervalRef.current) {
                  clearInterval(warningIntervalRef.current);
                  warningIntervalRef.current = null;
                }
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      }
    };

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("click", updateActivity);
    window.addEventListener("touchstart", updateActivity);

    const idleInterval = setInterval(checkIdle, 1000);

    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("touchstart", updateActivity);
      clearInterval(idleInterval);
    };
  }, [warningModalOpen, sessionExpired]);

  // 4. Trigger effects if session is expired
  useEffect(() => {
    if (sessionExpired) {
      // Optional toast/modal side effects
    }
  }, [sessionExpired]);

  const handleContinue = () => {
    lastActivityRef.current = Date.now();
    setWarningModalOpen(false);
  };

  const handleBackToLogin = () => {
    localStorage.clear();
    router.push("/");
  };

  return {
    firstCheckLoading,
    warningModalOpen,
    warningCountdown,
    sessionExpired,
    handleContinue,
    handleBackToLogin,
  };
};
