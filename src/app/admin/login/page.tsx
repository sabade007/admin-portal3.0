"use client";
import LoginFooter from "@/components/login/LoginFooter";
import LoginForm from "@/components/login/LoginForm";
import { Particles } from "@/components/themes/Particles";
import useLoginRedirect from "@/hooks/login/useLoginRedirect";
import useCaptchaRedirect from "@/hooks/setup/useCaptchaRedirect";
import useThemeColor from "@/hooks/useThemeColor";
import { Spinner } from "@heroui/react";

const page = () => {
  const color = useThemeColor();

  const mounted = useLoginRedirect();

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner variant="wave" size="sm" color="default" />
      </div>
    );
  }

  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <div className="h-[calc(100%-80px)] w-full">
        <div className="flex justify-center items-center w-full h-full p-4">
          <div className="sm:p-4 md:p-4 lg:p-8 xl:p-16 shadow-2xl rounded-2xl sm:border dark:border-zinc-800 shadow-iconcolor/30">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="h-[80px]  w-full ">
        <LoginFooter />
      </div>
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
};

export default page;
