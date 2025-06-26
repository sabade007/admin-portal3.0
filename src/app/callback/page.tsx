"use client";
import { encryptValues } from "@/hooks/encryptValue";
import useThemeColor from "@/hooks/useThemeColor";
import { Spinner } from "@heroui/react";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface CustomJwtPayload {
  username?: string;
  email?: string;
  [key: string]: any; // allow other optional fields if needed
}

const page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const id_token = searchParams.get("id_token");
  const refreshToken = searchParams.get("refreshToken");
  const router = useRouter();

  useEffect(() => {
    const readData = async () => {
      try {
        if (token && id_token && refreshToken) {
          interface CustomJwtPayload {
            username?: string;
            email?: string;
            [key: string]: any;
          }

          const decodedtoken = jwtDecode<CustomJwtPayload>(id_token);
          const username = decodedtoken.username || null;
          const email = decodedtoken.email || null;

          const data = await encryptValues({
            token: token,
            refreshToken: refreshToken,
            idToken: id_token,
            username: username || "",
            email: email || "",
            type: "ENDORSE_LOGIN",
          });

          if (data) {
            setTimeout(() => {
              router.push(`/workspace/${username}`);
            }, 2000);
          } else {
            setTimeout(() => {
              router.push("/admin/login");
            }, 2000);
          }
        } else {
          setTimeout(() => {
            router.push("/admin/login");
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    };

    readData();
  }, []);
  return (
    <div className="h-[100dvh] w-[100dvw] flex justify-center items-center">
      <Spinner variant="wave" size="sm" color="default" />
    </div>
  );
};

export default page;
