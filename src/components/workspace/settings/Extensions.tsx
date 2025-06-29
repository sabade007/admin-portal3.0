import Button from "@/components/themes/Button";
import Input from "@/components/themes/Input";
import Paragraph from "@/components/themes/Paragraph";
import Subheading from "@/components/themes/SubHeading";
import useExtensionsStore from "@/store/workspace/useExtensionsStore";
import { addToast } from "@heroui/react";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const Extensions = () => {
  const {
    getFileProperties,
    postFileProperties,
    deleteFileProperties,
    extensionValue,
    setExtensionValue,
    extensionValueError,
    setExtensionValueError,
    mimeTypeValue,
    setMimeTypeValue,
    mimeTypeValueError,
    setMimeTypeValueError,
    extensions,
    setExtensions,
    mimeTypes,
    setMimeTypes,
  } = useExtensionsStore();
  const t = useTranslations("Extensions");

  useEffect(() => {
    fetchFileProperties();
  }, [getFileProperties, postFileProperties, deleteFileProperties]);

  const fetchFileProperties = async () => {
    const orgId = localStorage.getItem("orgId");
    if (orgId) {
      await getFileProperties(orgId);
    }
  };

  const [extensionLoading, setExtensionLoading] = React.useState(false);
  const [mimeTypeLoading, setMimeTypeLoading] = React.useState(false);

  const handleAddExtension = async () => {
    if (extensionValue === "") {
      setExtensionValueError(true);
      return;
    }
    setExtensionLoading(true);

    try {
      const orgId = localStorage.getItem("orgId");
      if (!orgId) return;
      const data = {
        blockedFilesExtensions: [extensionValue],
        blockedFilesMimeTypes: [],
        maxFileUploadCount: "",
        maxFileUploadSize: "",
        ordId: orgId,
      };
      const response = await postFileProperties(data);
      if (response.responseCode === 200) {
        fetchFileProperties();
        setExtensionValue("");
        addToast({
          title: t("updateExtensionSuccess"),
          description: t("updateExtensionSuccess"),
          color: "success",
        });
      } else {
        addToast({
          title: t("updateExtensionError"),
          color: "danger",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setExtensionLoading(false);
    }
  };
  const handleDeleteExtensions = async (deleteId: any) => {
    try {
      const orgId = localStorage.getItem("orgId");
      if (!orgId) return;

      const response = await deleteFileProperties(deleteId, orgId);
      if (response.responseCode === 200) {
        fetchFileProperties();
        addToast({
          title: t("deleteExtensionSuccess"),
          color: "success",
        });
      } else {
        addToast({
          title: t("deleteExtensionError"),
          color: "danger",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMimeType = async () => {
    if (mimeTypeValue === "") {
      setMimeTypeValueError(true);
      return;
    }

    const orgId = localStorage.getItem("orgId");
    if (!orgId) return;

    try {
      const data = {
        blockedFilesExtensions: [],
        blockedFilesMimeTypes: [mimeTypeValue],
        maxFileUploadCount: "",
        maxFileUploadSize: "",
        ordId: orgId,
      };
      const response = await postFileProperties(data);
      if (response.responseCode === 200) {
        fetchFileProperties();
        setMimeTypeValue("");
        addToast({
          title: "MimeType added successfully",
          color: "success",
        });
      } else {
        addToast({
          title: "Could not add MimeType",
          color: "danger",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteMimeType = async (deleteId: any) => {
    try {
      const orgId = localStorage.getItem("orgId");
      if (!orgId) return;

      const response = await deleteFileProperties(deleteId, orgId);
      if (response.responseCode === 200) {
        fetchFileProperties();
        addToast({
          title: "MimeType deleted successfully",
          color: "success",
        });
      } else {
        addToast({
          title: "Could not delete MimeType",
          color: "danger",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-h-[calc(100dvh-220px)] overflow-y-auto scrollbar-hide">
      <div className="">
        <Subheading>{t("title1")}</Subheading>
        <Paragraph>{t("desc1")}</Paragraph>
        <div className="flex gap-4 items-end">
          <Input
            label={t("extension")}
            type="text"
            labelPlacement="outside"
            value={extensionValue}
            onValueChange={(e) => {
              setExtensionValue(e);
              setExtensionValueError(false);
            }}
            isInvalid={extensionValueError}
            errorMessage={extensionValueError ? t("extensionvalueError") : ""}
          />
          <Button
            isLoading={extensionLoading}
            onPress={handleAddExtension}
            isIconOnly
          >
            <PlusCircle className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {extensions.map((extension, index) => (
            <div
              key={index}
              className="flex gap-4 p-2 rounded-xl items-center border"
            >
              <Subheading>{extension.value}</Subheading>
              <div onClick={() => handleDeleteExtensions(extension.id)}>
                <MinusCircle className="w-4 h-4 focus:outline-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-full mt-4">
        <Subheading>{t("title2")}</Subheading>
        <Paragraph>{t("desc2")}</Paragraph>
        <div className="flex gap-4 items-end">
          <Input
            label={t("mime")}
            type="text"
            labelPlacement="outside"
            value={mimeTypeValue}
            onValueChange={(e) => {
              setMimeTypeValue(e);
              setMimeTypeValueError(false);
            }}
            isInvalid={mimeTypeValueError}
            errorMessage={mimeTypeValueError ? t("mimevalueError") : ""}
          />
          <Button isIconOnly onPress={handleAddMimeType}>
            <PlusCircle className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {mimeTypes.map((extension, index) => (
            <div
              key={index}
              className="flex gap-4 p-2 rounded-xl items-center border"
            >
              <Subheading>{extension.value}</Subheading>
              <div onClick={() => handleDeleteMimeType(extension.id)}>
                <MinusCircle className="w-4 h-4 focus:outline-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Extensions;
