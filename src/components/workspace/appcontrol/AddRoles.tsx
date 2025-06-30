import Button from "@/components/themes/Button";
import Input from "@/components/themes/Input";
import Paragraph from "@/components/themes/Paragraph";
import Subheading from "@/components/themes/SubHeading";
import { EmptyApps, Search as SearchSvg } from "@/lib/svg";
import { cn } from "@/lib/utils";
import useRbacStore from "@/store/workspace/useRbacStore";
import { addToast, Checkbox, CheckboxGroup } from "@heroui/react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const AddRoles = ({
  appName,
  appId,
  appUrl,
  isEnabled,
  appLogo,
  isDefault,
}: any) => {
  const {
    getallRoles,
    getAllrolesforApplication,
    // addRolestoApplication,
    editApplications,
  } = useRbacStore();

  const t = useTranslations("AppControl.AddRoles");

  const [allRoles, setAllRoles] = React.useState<any[]>([]);
  const [assignedRoles, setAssignedRoles] = React.useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [eappName, setEAppName] = React.useState(appName);
  const [eappNameErr, setEAppNameErr] = React.useState(false);
  const [eappId, setEAppId] = React.useState(appId);
  const [eappUrl, setEAppUrl] = React.useState(appUrl);
  const [eappUrlErr, setEAppUrlErr] = React.useState(false);
  const [eisEnabled, setEIsEnabled] = React.useState(isEnabled);
  const [eappLogo, setEAppLogo] = React.useState(appLogo);
  const [eisDefault, setEIsDefault] = React.useState(isDefault);

  React.useEffect(() => {
    fetchRoles();
  }, [appId]);

  React.useEffect(() => {
    setEAppName(appName);
    setEAppId(appId);
    setEAppUrl(appUrl);
    setEIsEnabled(isEnabled);
    setEAppLogo(appLogo);
    setEIsDefault(isDefault);
  }, [appName, appId, appUrl, isEnabled, appLogo, isDefault]);

  const fetchRoles = async () => {
    const orgId = localStorage.getItem("orgId");
    if (!orgId) return;

    const roles = await getallRoles(orgId); // [{ applicationRoleId, roleName }]
    const assigned = await getAllrolesforApplication(appId); // ["Hello"]

    setAllRoles(roles);
    setAssignedRoles(assigned);
    setSelectedRoles([]);
  };

  const availableRoles = allRoles.filter(
    (role) => !assignedRoles.includes(role.roleName)
  );

  const filteredRoles =
    searchTerm.length >= 2
      ? availableRoles.filter((role) =>
          role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : availableRoles;

  const allFilteredRoleIds = filteredRoles.map((role) =>
    String(role.applicationRoleId)
  );

  const allSelected =
    allFilteredRoleIds.length > 0 &&
    allFilteredRoleIds.every((id) => selectedRoles.includes(id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRoles((prev) =>
        prev.filter((id) => !allFilteredRoleIds.includes(id))
      );
    } else {
      setSelectedRoles((prev) =>
        Array.from(new Set([...prev, ...allFilteredRoleIds]))
      );
    }
  };

  const CustomCheckbox = ({ role, value }: any) => {
    return (
      <Checkbox
        size="sm"
        aria-label={role.roleName}
        value={value}
        color="default"
        classNames={{
          base: cn(
            "inline-flex max-w-md w-full bg-content1 m-0",
            "hover:bg-default/10 items-center justify-start",
            "cursor-pointer rounded-xl gap-2 border-2 border-transparent",
            "data-[selected=true]:border-default/50"
          ),
          label: "w-full",
          icon: "text-buttontext",
        }}
      >
        <div className="w-full flex flex-col">
          <Subheading>{role.roleName}</Subheading>
        </div>
      </Checkbox>
    );
  };

  const handleAddRoles = async () => {
    try {
      console.log(appName);
      const data = {
        applicationName: eappName,
        applicationUrl: eappUrl,
        applicationLogo: eappLogo,
        isEnabled: eisEnabled,
        roleId: selectedRoles,
        isDefault: eisDefault,
        applicationId: eappId,
      };

      const response = await editApplications(data);

      addToast({
        title: t("addRoleSuccess"),
        color: "success",
      });

      fetchRoles();
    } catch (e) {
      addToast({
        title: t("addRoleError"),
        color: "danger",
      });
      console.error(e);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between mb-4">
        <Input
          isClearable={true}
          radius="full"
          size="sm"
          value={searchTerm}
          onValueChange={setSearchTerm}
          className="max-w-[250px]"
          placeholder={t("searchRoles")}
          startContent={<Search className="w-4 h-4 pointer-events-none" />}
        />

        <div className="flex flex-row items-center gap-4">
          {filteredRoles.length > 0 && (
            <button
              onClick={toggleSelectAll}
              className="text-sm text-default hover:underline ml-4"
            >
              {allSelected ? t("deselectAll") : t("selectAll")}
            </button>
          )}
          <Button
            size="sm"
            isDisabled={selectedRoles.length === 0}
            onPress={handleAddRoles}
          >
            {t("addRoles")}
          </Button>
        </div>
      </div>

      {filteredRoles.length === 0 && availableRoles.length === 0 && (
        <div className="flex mt-2 flex-col items-center gap-2 mt-4">
          <EmptyApps className="w-24 h-24" />
          <Paragraph>{t("searchEmpty")}</Paragraph>
        </div>
      )}

      {filteredRoles.length === 0 && availableRoles.length > 0 && (
        <div className="flex mt-2 flex-col items-center gap-2 mt-4">
          <SearchSvg className="w-24 h-24" />
          <Paragraph>{t("noroles")}</Paragraph>
        </div>
      )}

      <CheckboxGroup value={selectedRoles} onValueChange={setSelectedRoles}>
        <div className="grid grid-cols-3 gap-4">
          {filteredRoles.map((role) => (
            <CustomCheckbox
              key={role.applicationRoleId}
              value={String(role.applicationRoleId)}
              role={role}
            />
          ))}
        </div>
      </CheckboxGroup>
    </div>
  );
};

export default AddRoles;
