import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSetupstore from "@/store/setup/useSetupStore";
import { env } from "next-runtime-env";

export default function useCaptchaRedirect() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { getCaptcha } = useSetupstore();

  useEffect(() => {
    const fetchCaptcha = async () => {
      const response = await getCaptcha();

      if (response.responseCode === 200) {
        if (env("NEXT_PUBLIC_USE_DEFAULT_ENDORSE_LOGIN") === "true") {
          const oauthUrl = env("NEXT_PUBLIC_OAUTH_URL");
          const redirectUrl = env("NEXT_PUBLIC_OAUTH_REDIRECT_URL");

          window.location.href = `${oauthUrl}?redirect_uri=${redirectUrl}`;
        } else {
          router.push("/admin/login");
        }
      } else if (response.responseCode === 204) {
        setMounted(true);
      }
    };

    fetchCaptcha();
  }, [router]);

  return mounted;
}
