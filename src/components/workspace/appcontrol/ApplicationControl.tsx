import Button from "@/components/themes/Button";
import Subheading from "@/components/themes/SubHeading";
import {
  CircleX,
  Grid2X2Plus,
  LayoutGrid,
  LayoutPanelTop,
  PenBox,
  PlusCircle,
  Search,
  Trash2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { addToast, Button as HButton } from "@heroui/react";
import useRbacStore from "@/store/workspace/useRbacStore";
import Input from "@/components/themes/Input";
import { EmptyApps, Search as SearchSvg } from "@/lib/svg";
import Paragraph from "@/components/themes/Paragraph";
import Switch from "@/components/themes/Switch";
import EditApplication from "./EditApplication";
import AddRoles from "./AddRoles";
import RemoveRoles from "./RemoveRoles";

const ApplicationControl = () => {
  const t = useTranslations("AppControl.ApplicationControl");

  const [currentTab, setCurrentTab] = React.useState("editApplication");
  const [createApplication, setCreateApplication] = React.useState(false);

  const {
    getAllApplications,
    allApplications,
    createnewApplication,
    deleteApplications,
  } = useRbacStore();
  const [applicationsSearch, setApplicationsSearch] = React.useState("");

  const [selectedApplicationId, setSelectedApplicationId] = useState<
    number | null
  >(null);

  const [selectedApplicationName, setSelectedApplicationName] = useState<
    string | null
  >(null);

  const [selectedApplicationTypeDefault, setSelectedApplicationTypeDefault] =
    useState(false);

  const [selectedApplicationUrl, setSelectedApplicationUrl] = useState<
    string | null
  >(null);
  const [selectedApplicationLogo, setSelectedApplicationLogo] = useState<
    string | null
  >(null);
  const [selectedApplicationIsEnabled, setSelectedApplicationIsEnabled] =
    useState(false);

  /////////// New Application State

  const [newApplicationName, setNewApplicationName] = useState("");
  const [newApplicationNameError, setNewApplicationNameError] = useState(false);

  const [newApplicationUrl, setNewApplicationUrl] = useState("");
  const [newApplicationUrlError, setNewApplicationUrlError] = useState(false);

  const [newApplicationLogo, setNewApplicationLogo] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const fetchAllApplications = async () => {
    try {
      const orgId = localStorage.getItem("orgId");
      if (orgId) {
        await getAllApplications(orgId);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const filteredApplications =
    applicationsSearch.length >= 2
      ? allApplications.filter((app) =>
          app.applicationName
            .toLowerCase()
            .includes(applicationsSearch.toLowerCase())
        )
      : allApplications;

  // useEffect(() => {
  //   if (
  //     selectedRoleId &&
  //     !filteredRoles.some((r) => r.applicationRoleId === selectedRoleId)
  //   ) {
  //     setSelectedRoleId(null);
  //   }
  // }, [roleSearch, filteredRoles, selectedRoleId]);

  const handleCreateApplication = async () => {
    if (newApplicationName === "") {
      setNewApplicationNameError(true);
      return;
    }

    if (newApplicationUrl === "") {
      setNewApplicationUrlError(true);
      return;
    }

    const orgId = localStorage.getItem("orgId");
    if (!orgId) return;

    try {
      const data = {
        applicationName: newApplicationName,
        applicationUrl: newApplicationUrl,
        applicationLogo: newApplicationLogo,
        isEnabled: isEnabled,
        roleId: [],
      };

      await createnewApplication(data, orgId);
      addToast({ title: t("applicationCreateSuccess"), color: "success" });
      setCreateApplication(false);
      setNewApplicationName("");
      setNewApplicationUrl("");
      setNewApplicationLogo("");
      setIsEnabled(false);
      fetchAllApplications();
    } catch (err: any) {
      addToast({ title: err.message, color: "danger" });
      console.log(err);
    }
  };

  const handleDeleteApplication = async () => {
    try {
      await deleteApplications([selectedApplicationId]);
      addToast({ title: t("deleteSuccess"), color: "success" });
      fetchAllApplications();
      setSelectedApplicationId(null);
      setSelectedApplicationName(null);
      setSelectedApplicationTypeDefault(false);
    } catch (err: any) {
      addToast({ title: err.message, color: "danger" });
      console.log(err);
    }
  };

  const ApplicationItem = (
    id: number,
    roleName: string,
    isDefault: boolean,
    applicationLogo: string,
    applicationUrl: string,
    isEnabled: boolean
  ) => {
    return (
      <div
        key={id}
        onClick={() => {
          setSelectedApplicationId(id);
          setSelectedApplicationName(roleName);
          setSelectedApplicationTypeDefault(isDefault);
          setSelectedApplicationUrl(applicationUrl);
          setSelectedApplicationLogo(applicationLogo);
          setSelectedApplicationIsEnabled(isEnabled);
        }}
        className={`border dark:border-zinc-800 p-2 rounded-md cursor-pointer hover:bg-default/20 dark:hover:bg-default/20 ${
          selectedApplicationId === id ? "bg-default/30 dark:bg-default/30" : ""
        } transition-colors duration-500 transform translate-y-0 ease-in-out`}
      >
        <Subheading>{roleName}</Subheading>
      </div>
    );
  };

  return (
    <div>
      {/* Top Portion */}
      <div className="grid grid-cols-12">
        <div className="col-span-4 border dark:border-zinc-800 flex flex-col gap-1 rounded-tl-xl h-full p-2  ">
          <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              <Subheading>{t("applications")}</Subheading>
            </div>

            <div className="ml-auto flex gap-2">
              <Button
                size="sm"
                onPress={() => setCreateApplication(!createApplication)}
                isIconOnly
              >
                {createApplication ? (
                  <CircleX className="w-4 h-4" />
                ) : (
                  <PlusCircle className="w-4 h-4" />
                )}
              </Button>
              <Button
                size="sm"
                isDisabled={
                  !selectedApplicationId || selectedApplicationTypeDefault
                }
                onPress={handleDeleteApplication}
                isIconOnly
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-8 border dark:border-zinc-800 rounded-tr-xl h-full border-l-0 p-2">
          <div className="grid grid-cols-3">
            <div className="col-span-1 flex items-center w-full justify-center">
              <HButton
                variant="light"
                className={`${
                  currentTab === "editApplication"
                    ? "underline underline-offset-8 dark:underline-offset-8"
                    : ""
                }`}
                size="sm"
                key={"editApplication"}
                onPress={() => setCurrentTab("editApplication")}
              >
                <PenBox className="w-4 h-4" />
                <Subheading>{t("editApplication")}</Subheading>
              </HButton>
            </div>
            <div className="col-span-1 flex items-center w-full justify-center">
              <HButton
                variant="light"
                className={`${
                  currentTab === "addRoles"
                    ? "underline underline-offset-8 dark:underline-offset-8"
                    : ""
                }`}
                size="sm"
                key={"addRoles"}
                onPress={() => setCurrentTab("addRoles")}
              >
                <LayoutPanelTop className="w-4 h-4" />
                <Subheading>{t("addRoles")}</Subheading>
              </HButton>
            </div>
            <div className="col-span-1 flex items-center w-full justify-center">
              <HButton
                variant="light"
                className={`${
                  currentTab === "removeRoles"
                    ? "underline underline-offset-8 dark:underline-offset-8"
                    : ""
                }`}
                size="sm"
                key={"removeRoles"}
                onPress={() => setCurrentTab("removeRoles")}
              >
                <LayoutPanelTop className="w-4 h-4" />
                <Subheading>{t("removeRoles")}</Subheading>
              </HButton>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Portion */}

      <div className="grid grid-cols-12 ">
        <div className="col-span-4 border dark:border-zinc-800 rounded-bl-xl border-t-0 p-2 h-full  max-h-[calc(100dvh-220px)] overflow-y-auto scrollbar-hide">
          {/* {addRole && (
            <>
              <div className="flex items-end  gap-2">
                <Input
                  autoFocus
                  value={newRoleName}
                  onValueChange={setNewRoleName}
                  radius="sm"
                  label={t("roleName")}
                  placeholder={t("roleNamePlaceholder")}
                  className=" focus:ring-default/50 dark:focus:ring-default/50"
                />
                <Button onPress={handleCreateRole} isIconOnly size="sm">
                  <ArrowRightCircle className="w-4 h-4" />
                </Button>
              </div>
              <Divider className="my-2" />
            </>
          )} */}

          {createApplication ? (
            <div className="flex flex-col ">
              <Subheading>{t("title")}</Subheading>
              <Input
                autoFocus
                label={t("newApplicationName")}
                value={newApplicationName}
                onValueChange={(e) => {
                  setNewApplicationName(e);
                  setNewApplicationNameError(false);
                }}
                isInvalid={newApplicationNameError}
                errorMessage={
                  newApplicationNameError ? t("applicationNameError") : ""
                }
              />
              <Input
                label={t("newApplicationUrl")}
                value={newApplicationUrl}
                onValueChange={(e) => {
                  setNewApplicationUrl(e);
                  setNewApplicationUrlError(false);
                }}
                isInvalid={newApplicationUrlError}
                errorMessage={
                  newApplicationUrlError ? t("applicationUrlError") : ""
                }
              />

              <Input
                label={t("newApplicationLogo")}
                value={newApplicationLogo}
                onValueChange={(e) => {
                  setNewApplicationLogo(e);
                }}
              />

              <Switch
                className="mt-4 mb-4"
                isSelected={isEnabled}
                onValueChange={setIsEnabled}
                label={<Subheading>{t("isEnabled")}</Subheading>}
              />

              <Button onPress={handleCreateApplication}>
                {t("createApplicationBtn")}
              </Button>
            </div>
          ) : (
            <div>
              {allApplications.length > 0 && (
                <Input
                  isClearable={true}
                  radius="full"
                  size="sm"
                  value={applicationsSearch}
                  onValueChange={setApplicationsSearch}
                  className="max-w-sm"
                  placeholder={t("searchApplications")}
                  startContent={
                    <Search className="w-4 h-4 pointer-events-none" />
                  }
                />
              )}

              <div className="flex flex-col gap-2 mt-2">
                {filteredApplications.map((role) =>
                  ApplicationItem(
                    role.applicationId,
                    role.applicationName,
                    role.isDefault,
                    role.applicationLogo,
                    role.applicationUrl,
                    role.isEnabled
                  )
                )}

                {filteredApplications.length === 0 &&
                  allApplications.length === 0 && (
                    <div className="flex mt-2 flex-col items-center gap-2">
                      <EmptyApps className="w-24 h-24" />
                      <Paragraph>{t("emptyApps")}</Paragraph>
                    </div>
                  )}
                {allApplications.length !== 0 &&
                  filteredApplications.length === 0 && (
                    <div className="flex mt-2 flex-col items-center gap-2">
                      <SearchSvg className="w-24 h-24" />
                      <Paragraph>{t("searchEmpty")}</Paragraph>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
        <div
          className="col-span-8 border dark:border-zinc-800 p-2 rounded-br-xl border-t-0 border-l-0 
         h-full  overflow-y-auto scrollbar-hide max-h-[calc(100dvh-220px)]
        "
        >
          <div>
            {currentTab === "editApplication" &&
              selectedApplicationId &&
              !createApplication && (
                <EditApplication
                  appName={selectedApplicationName}
                  appId={selectedApplicationId}
                  appUrl={selectedApplicationUrl}
                  isEnabled={selectedApplicationIsEnabled}
                  appLogo={selectedApplicationLogo}
                  isDefault={selectedApplicationTypeDefault}
                />
              )}
          </div>
          {currentTab === "addRoles" &&
            selectedApplicationId &&
            !createApplication && (
              <AddRoles
                appId={selectedApplicationId}
                appName={selectedApplicationName}
                appUrl={selectedApplicationUrl}
                isEnabled={selectedApplicationIsEnabled}
                appLogo={selectedApplicationLogo}
                isDefault={selectedApplicationTypeDefault}
              />
            )}

          {currentTab === "removeRoles" &&
            selectedApplicationId &&
            !createApplication && (
              <RemoveRoles
                appId={selectedApplicationId}
                appName={selectedApplicationName}
                appUrl={selectedApplicationUrl}
                isEnabled={selectedApplicationIsEnabled}
                appLogo={selectedApplicationLogo}
                isDefault={selectedApplicationTypeDefault}
              />
            )}

          {!selectedApplicationId ||
            (createApplication && (
              <div className="flex mt-2 flex-col items-center gap-2">
                <EmptyApps className="w-24 h-24" />
                <Paragraph>{t("selectApp")}</Paragraph>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationControl;
