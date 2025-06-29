import Button from "@/components/themes/Button";
import Input from "@/components/themes/Input";
import Paragraph from "@/components/themes/Paragraph";
import Subheading from "@/components/themes/SubHeading";
import useExtensionsStore from "@/store/workspace/useExtensionsStore";
import { addToast } from "@heroui/react";
import { useTranslations } from "next-intl";
import React from "react";
import { motion } from "framer-motion";
import { useShakeOnMount } from "@/hooks/useShakeAnimation";

const FileSize = () => {
  const t = useTranslations("Filesize");

  const {
    getFileProperties,
    postFileProperties,
    deleteFileProperties,

    fileSize,
    setFileSize,
    fileSizeError,
    setFileSizeError,

    fileCount,
    setFileCount,
    fileCountError,
    setFileCountError,
  } = useExtensionsStore();

  const [confirmButton, setConfirmButton] = React.useState(false);
  const { ref, controls, variants, trigger } = useShakeOnMount();

  React.useEffect(() => {
    fetchFileProperties();
  }, [getFileProperties, postFileProperties, deleteFileProperties]);

  React.useEffect(() => {
    if (confirmButton) {
      trigger(); // manually trigger shake when button is shown
    }
  }, [confirmButton]);

  const fetchFileProperties = async () => {
    const orgId = localStorage.getItem("orgId");
    if (orgId) {
      await getFileProperties(orgId);
    }
  };

  const handleonSave = async () => {
    if (!fileSize || !fileCount) return;

    try {
      const orgId = localStorage.getItem("orgId");
      if (!orgId) return;
      const data = {
        blockedFilesExtensions: [],
        blockedFilesMimeTypes: [],
        maxFileUploadCount: Number(fileCount),
        maxFileUploadSize: Number(fileSize),
        ordId: Number(orgId),
      };
      const response = await postFileProperties(data);
      if (response) {
        fetchFileProperties();
        addToast({
          title: t("updateSuccess"),
          color: "success",
        });
      } else {
        addToast({
          title: t("updateError"),
          color: "danger",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className="max-h-[calc(100dvh-220px)] overflow-y-auto scrollbar-hide">
      <div>
        <Subheading>{t("title1")}</Subheading>
        <Paragraph>{t("desc1")}</Paragraph>

        <Input
          label={t("size")}
          value={fileSize}
          onValueChange={setFileSize}
          isInvalid={fileSizeError}
          errorMessage={fileSizeError ? t("filesizeError") : ""}
        />
      </div>

      <div className="mt-4">
        <Subheading>{t("title2")}</Subheading>
        <Paragraph>{t("desc2")}</Paragraph>

        <Input
          label={t("size")}
          value={fileCount}
          onValueChange={setFileCount}
          isInvalid={fileCountError}
          errorMessage={fileCountError ? t("filecountError") : ""}
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
            onPress={() => {
              if (!confirmButton) {
                setConfirmButton(true); // first press triggers shake
              } else {
                handleonSave();

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

export default FileSize;
