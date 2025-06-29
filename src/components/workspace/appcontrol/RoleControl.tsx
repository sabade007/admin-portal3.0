import Button from "@/components/themes/Button";
import Input from "@/components/themes/Input";
import Paragraph from "@/components/themes/Paragraph";
import Subheading from "@/components/themes/SubHeading";
import { EmptyApps, Search as SearchSvg } from "@/lib/svg";
import useThemetypeStore from "@/store/ux/useThemetypeStore";
import useRbacStore from "@/store/workspace/useRbacStore";
import {
  addToast,
  Divider,
  Tabs,
  Button as HButton,
  CheckboxGroup,
  Checkbox,
} from "@heroui/react";
import {
  ArrowRightCircle,
  CircleX,
  LayoutGridIcon,
  PlusCircle,
  Search,
  Trash2,
  UserMinus2,
  UserPlus,
  UserPlus2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import AddUsers from "./AddUsers";
import RemoveUsers from "./RemoveUsers";

const RoleControl = () => {
  const {
    getallRoles,
    allRoles,
    newRoleName,
    setNewRoleName,
    newRoleNameError,
    setNewRoleNameError,
    createNewRole,
    deleteRoles,
    getuserslists,

    addUsersList,
    setAddUsersList,
    removeUsersList,
    setRemoveUsersList,
  } = useRbacStore();
  const t = useTranslations("AppControl.Rbac");
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedRoleName, setSelectedRoleName] = useState<string | null>(null);
  const [addRole, setAddRole] = useState(false);
  const [roleSearch, setRoleSearch] = useState("");
  const { themeType } = useThemetypeStore();

  const [currentTab, setCurrentTab] = useState("addUsers");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const orgId = localStorage.getItem("orgId");
    if (orgId) {
      await getallRoles(orgId);
    }
  };

  //////////Search

  const filteredRoles =
    roleSearch.length >= 2
      ? allRoles.filter((role) =>
          role.roleName.toLowerCase().includes(roleSearch.toLowerCase())
        )
      : allRoles;

  useEffect(() => {
    if (
      selectedRoleId &&
      !filteredRoles.some((r) => r.applicationRoleId === selectedRoleId)
    ) {
      setSelectedRoleId(null);
    }
  }, [roleSearch, filteredRoles, selectedRoleId]);

  ////////Search

  const RoleItem = (id: number, roleName: string) => {
    return (
      <div
        key={id}
        onClick={() => {
          setSelectedRoleId(id);
          setSelectedRoleName(roleName);
        }}
        className={`border dark:border-zinc-800 p-2 rounded-md cursor-pointer hover:bg-default/20 dark:hover:bg-default/20 ${
          selectedRoleId === id ? "bg-default/30 dark:bg-default/30" : ""
        }`}
      >
        <Subheading>{roleName}</Subheading>
      </div>
    );
  };

  const handleCreateRole = async () => {
    const orgId = localStorage.getItem("orgId");
    if (orgId) {
      const createNewRoleResponse = await createNewRole(newRoleName, orgId);

      addToast({
        title: t("createNewRoleSuccess"),
        color: "success",
      });

      setAddRole(false);
      setNewRoleName("");
      setRoleSearch("");

      fetchRoles();
    }
  };

  const handleDeleteRole = async () => {
    const orgId = localStorage.getItem("orgId");
    if (!orgId || selectedRoleId === null) return;

    try {
      const deleteRoleResponse = await deleteRoles([selectedRoleId], orgId);

      addToast({
        title: t("deleteRoleSuccess"),
        color: "success",
      });

      // Reset selection after delete
      setSelectedRoleId(null);
      setRoleSearch("");
      fetchRoles();
    } catch (err) {
      console.error("Failed to delete role:", err);
    }
  };

  //////////////////Userlist

  return (
    <div>
      {/* Top Portion */}
      <div className="grid grid-cols-12">
        <div className="col-span-4 border dark:border-zinc-800 flex flex-col gap-1 rounded-tl-xl h-full p-2  ">
          <div className="flex items-center gap-4 ">
            <Subheading>{t("roleName")}</Subheading>
            <div className="ml-auto flex gap-2">
              <Button size="sm" onPress={() => setAddRole(!addRole)} isIconOnly>
                {addRole ? (
                  <CircleX className="w-4 h-4" />
                ) : (
                  <PlusCircle className="w-4 h-4" />
                )}
              </Button>
              <Button
                onPress={handleDeleteRole}
                size="sm"
                isIconOnly
                isDisabled={!selectedRoleId}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-8 border dark:border-zinc-800 rounded-tr-xl h-full border-l-0 p-2">
          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <HButton
                variant="light"
                className={`${
                  currentTab === "addUsers"
                    ? "underline underline-offset-8 dark:underline-offset-8"
                    : ""
                }`}
                size="sm"
                key={"addUsers"}
                onPress={() => setCurrentTab("addUsers")}
              >
                <UserPlus2 className="w-4 h-4" />
                <Subheading>{t("addUsers")}</Subheading>
              </HButton>
            </div>
            <div className="col-span-1">
              <HButton
                variant="light"
                className={`${
                  currentTab === "removeUsers"
                    ? "underline underline-offset-8 dark:underline-offset-8"
                    : ""
                }`}
                size="sm"
                key={"removeUsers"}
                onPress={() => setCurrentTab("removeUsers")}
              >
                <UserMinus2 className="w-4 h-4" />
                <Subheading>{t("removeUsers")}</Subheading>
              </HButton>
            </div>
            <div className="col-span-1">
              <HButton
                variant="light"
                className={`${
                  currentTab === "addApplications"
                    ? "underline underline-offset-8 dark:underline-offset-8"
                    : ""
                }`}
                size="sm"
                key={"addApplications"}
                onPress={() => setCurrentTab("addApplications")}
              >
                <LayoutGridIcon className="w-4 h-4" />
                <Subheading>{t("addApplications")}</Subheading>
              </HButton>
            </div>
            <div className="col-span-1">
              <HButton
                variant="light"
                className={`${
                  currentTab === "removeApplications"
                    ? "underline underline-offset-8 dark:underline-offset-8"
                    : ""
                }`}
                size="sm"
                key={"removeApplications"}
                onPress={() => setCurrentTab("removeApplications")}
              >
                <LayoutGridIcon className="w-4 h-4" />
                <Subheading>{t("removeApplications")}</Subheading>
              </HButton>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Portion */}

      <div className="grid grid-cols-12 ">
        <div className="col-span-4 border dark:border-zinc-800 rounded-bl-xl border-t-0 p-2 h-full  max-h-[calc(100dvh-220px)] overflow-y-auto scrollbar-hide">
          {addRole && (
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
          )}

          <Input
            isClearable={true}
            radius="full"
            size="sm"
            value={roleSearch}
            onValueChange={setRoleSearch}
            className="max-w-sm"
            placeholder={t("searchRoles")}
            startContent={<Search className="w-4 h-4 pointer-events-none" />}
          />

          <div className="flex flex-col gap-2 mt-2">
            {filteredRoles.map((role) =>
              RoleItem(role.applicationRoleId, role.roleName)
            )}

            {allRoles.length === 0 && filteredRoles.length === 0 && (
              <div className="flex mt-2 flex-col items-center gap-2">
                <EmptyApps className="w-24 h-24" />
                <Paragraph>{t("noRoles")}</Paragraph>
              </div>
            )}
            {allRoles.length !== 0 && filteredRoles.length === 0 && (
              <div className="flex mt-2 flex-col items-center gap-2">
                <SearchSvg className="w-24 h-24" />
                <Paragraph>{t("searchEmpty")}</Paragraph>
              </div>
            )}
          </div>
        </div>
        <div
          className="col-span-8 border dark:border-zinc-800 p-2 rounded-br-xl border-t-0 border-l-0 
         h-full  overflow-y-auto scrollbar-hide max-h-[calc(100dvh-220px)]
        "
        >
          <div>
            {currentTab === "addUsers" && selectedRoleId && (
              <AddUsers
                selectedRoleId={selectedRoleId}
                selectedRoleName={selectedRoleName}
              />
            )}
            {currentTab === "removeUsers" && selectedRoleId && (
              <RemoveUsers
                selectedRoleId={selectedRoleId}
                selectedRoleName={selectedRoleName}
              />
            )}
            {/* {currentTab === "addApplications" && selectedRoleId && (
              <AddApplications
                selectedRoleId={selectedRoleId}
                selectedRoleName={selectedRoleName}
              />
            )}
            {currentTab === "removeApplications" && selectedRoleId && (
              <RemoveApplications
                selectedRoleId={selectedRoleId}
                selectedRoleName={selectedRoleName}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleControl;
