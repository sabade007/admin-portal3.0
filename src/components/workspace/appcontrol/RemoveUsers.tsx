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

const RemoveUsers = ({ selectedRoleId, selectedRoleName }: any) => {
  const {
    getuserslists,
    removeUsersList,

    removeUsersfromRoles,
  } = useRbacStore();

  const t = useTranslations("AppControl.Rbac");

  const [selectedRemoveUsers, setSelectedRemoveUsers] = React.useState<
    string[]
  >([]);
  const [removeUserSearch, setRemoveUserSearch] = React.useState("");

  React.useEffect(() => {
    if (selectedRoleId !== null) {
      fetchUserList();
    }
  }, [selectedRoleId]);

  const fetchUserList = async () => {
    if (!selectedRoleId) return;
    await getuserslists(selectedRoleId, selectedRoleName);
    setSelectedRemoveUsers([]); // Reset on role change
  };

  const filteredRemoveUsers =
    removeUserSearch.length >= 2
      ? removeUsersList.filter(
          (user) =>
            user.fullName
              .toLowerCase()
              .includes(removeUserSearch.toLowerCase()) ||
            user.username.toLowerCase().includes(removeUserSearch.toLowerCase())
        )
      : removeUsersList;

  const allFilteredUsernames = filteredRemoveUsers.map((user) => user.username);

  const allSelected =
    allFilteredUsernames.length > 0 &&
    allFilteredUsernames.every((username) =>
      selectedRemoveUsers.includes(username)
    );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRemoveUsers((prev) =>
        prev.filter((username) => !allFilteredUsernames.includes(username))
      );
    } else {
      setSelectedRemoveUsers((prev) =>
        Array.from(new Set([...prev, ...allFilteredUsernames]))
      );
    }
  };

  const CustomCheckbox = ({ user, value }: any) => (
    <Checkbox
      size="sm"
      aria-label={user.fullName}
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
        <Subheading>{user.fullName}</Subheading>
        <Paragraph>@{user.username}</Paragraph>
      </div>
    </Checkbox>
  );

  const handleRemove = async () => {
    try {
      const body = {
        userList: selectedRemoveUsers,
        roleId: selectedRoleId,
      };

      await removeUsersfromRoles(body);
      addToast({
        title: t("removeUsersSuccess"),
        color: "success",
      });
      fetchUserList();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between mb-2">
        <Input
          isClearable
          radius="full"
          size="sm"
          value={removeUserSearch}
          onValueChange={setRemoveUserSearch}
          className="max-w-[250px]"
          placeholder={t("searchUsers")}
          startContent={<Search className="w-4 h-4 pointer-events-none" />}
        />

        <div className="flex flex-row items-center gap-4">
          {filteredRemoveUsers.length > 0 && (
            <button
              onClick={toggleSelectAll}
              className="text-sm text-default hover:underline ml-4"
            >
              {allSelected ? t("deselectAll") : t("selectAll")}
            </button>
          )}
          <Button
            isDisabled={selectedRemoveUsers.length === 0}
            onPress={handleRemove}
          >
            {t("removeUsers")}
          </Button>
        </div>
      </div>

      {filteredRemoveUsers.length === 0 && removeUsersList.length === 0 && (
        <div className="flex mt-2 flex-col items-center gap-2 mt-4">
          <EmptyApps className="w-24 h-24" />
          <Paragraph>{t("nousers")}</Paragraph>
        </div>
      )}

      {filteredRemoveUsers.length === 0 && removeUsersList.length > 0 && (
        <div className="flex mt-2 flex-col items-center gap-2 mt-4">
          <SearchSvg className="w-24 h-24" />
          <Paragraph>{t("nousers")}</Paragraph>
        </div>
      )}

      <CheckboxGroup
        value={selectedRemoveUsers}
        onValueChange={setSelectedRemoveUsers}
      >
        <div className="grid grid-cols-3 gap-4">
          {filteredRemoveUsers.map((user) => (
            <CustomCheckbox
              key={user.username}
              value={user.username}
              user={{
                fullName: user.fullName,
                username: user.username,
              }}
            />
          ))}
        </div>
      </CheckboxGroup>
    </div>
  );
};

export default RemoveUsers;
