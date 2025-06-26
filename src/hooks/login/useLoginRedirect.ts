import useLoginStore from "@/store/login/useLoginStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useLoginRedirect() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const {
    getCaptcha,
    captchaString,
    setCaptchaString,
    captchaId,
    setCaptchaId,
  } = useLoginStore();

  useEffect(() => {
    const fetchCaptcha = async () => {
      const response = await getCaptcha();
      console.log(response);

      if (response.responseCode === 200) {
        setMounted(true);
      } else if (response.responseCode === 204) {
        router.push("/setup-wizard");
      }
    };

    fetchCaptcha();
  }, [router]);

  return mounted;
}
