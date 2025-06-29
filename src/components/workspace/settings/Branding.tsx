import Input from "@/components/themes/Input";
import Paragraph from "@/components/themes/Paragraph";
import Subheading from "@/components/themes/SubHeading";
import { useTranslations } from "next-intl";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useShakeOnMount } from "@/hooks/useShakeAnimation";
import Button from "@/components/themes/Button";

const Branding = () => {
  const t = useTranslations("Branding");
  const [confirmButton, setConfirmButton] = React.useState(false);
  const { ref, controls, variants, trigger } = useShakeOnMount();
  React.useEffect(() => {
    if (confirmButton) {
      trigger(); // manually trigger shake when button is shown
    }
  }, [confirmButton]);

  return (
    <div className="max-h-[calc(100dvh-220px)] overflow-y-auto scrollbar-hide">
      <div>
        <Subheading> {t("title")}</Subheading>
        <Paragraph>{t("desc")}</Paragraph>
        <Input isDisabled label={t("logo")} type="text" className="w-full" />
        <Input isDisabled label={t("favicon")} type="text" className="w-full" />
        <Input isDisabled label={t("tagline")} type="text" className="w-full" />
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
            isDisabled
            onPress={() => {
              if (!confirmButton) {
                setConfirmButton(true); // first press triggers shake
              } else {
                console.log("Confirmed update");
                setConfirmButton(false); // reset state if needed
              }
            }}
          >
            {confirmButton ? t("confirm") : t("update")}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Branding;
