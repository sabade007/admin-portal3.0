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

const AddUsers = ({ selectedRoleId, selectedRoleName }: any) => {
  const { getuserslists, addUsersList, removeUsersList, addUserstoRoles } =
    useRbacStore();

  const t = useTranslations("AppControl.Rbac");

  const [selectedAddUsers, setSelectedAddUsers] = React.useState<string[]>([]);
  const [addUserSearch, setAddUserSearch] = React.useState("");

  React.useEffect(() => {
    if (selectedRoleId !== null) {
      fetchUserList();
    }
  }, [selectedRoleId]);

  const fetchUserList = async () => {
    if (!selectedRoleId) return;
    await getuserslists(selectedRoleId, selectedRoleName);
    setSelectedAddUsers([]); // Reset selection on role change
  };

  // Filtered users based on search
  const filteredAddUsers =
    addUserSearch.length >= 2
      ? addUsersList.filter(
          (user) =>
            user.fullName.toLowerCase().includes(addUserSearch.toLowerCase()) ||
            user.username.toLowerCase().includes(addUserSearch.toLowerCase())
        )
      : addUsersList;

  const allFilteredUsernames = filteredAddUsers.map((user) => user.username);

  const allSelected =
    allFilteredUsernames.length > 0 &&
    allFilteredUsernames.every((username) =>
      selectedAddUsers.includes(username)
    );

  const toggleSelectAll = () => {
    if (allSelected) {
      // Deselect all
      setSelectedAddUsers((prev) =>
        prev.filter((username) => !allFilteredUsernames.includes(username))
      );
    } else {
      // Select all
      setSelectedAddUsers((prev) =>
        Array.from(new Set([...prev, ...allFilteredUsernames]))
      );
    }
  };

  const CustomCheckbox = ({ user, value }: any) => {
    return (
      <Checkbox
        size="sm"
        aria-label={user.fullName}
        value={value}
        color="default"
        classNames={{
          base: cn(
            "inline-flex max-w-md w-full bg-content1 m-0",
            "hover:bg-default/10 items-center justify-start",
            "cursor-pointer rounded-xl gap-2  border-2 border-transparent",
            "data-[selected=true]:border-default/50"
          ),
          label: "w-full",
          icon: "text-buttontext",
        }}
      >
        <div className="w-full flex flex-col ">
          <Subheading>{user.fullName}</Subheading>

          <Paragraph>@{user.username}</Paragraph>
        </div>
      </Checkbox>
    );
  };

  const handleAdd = async () => {
    try {
      const body = {
        userList: selectedAddUsers,
        roleId: selectedRoleId,
      };

      await addUserstoRoles(body);
      addToast({
        title: t("addUsersSuccess"),
        color: "success",
      });
      fetchUserList();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between mb-2">
        <Input
          isClearable={true}
          radius="full"
          size="sm"
          value={addUserSearch}
          onValueChange={setAddUserSearch}
          className="max-w-[250px]"
          placeholder={t("searchUsers")}
          startContent={<Search className="w-4 h-4 pointer-events-none" />}
        />

        <div className="flex flex-row items-center gap-4">
          {filteredAddUsers.length > 0 && (
            <button
              onClick={toggleSelectAll}
              className="text-sm text-default hover:underline ml-4"
            >
              {allSelected ? t("deselectAll") : t("selectAll")}
            </button>
          )}
          <Button
            size="sm"
            isDisabled={selectedAddUsers.length === 0}
            onPress={handleAdd}
          >
            {t("addUsers")}
          </Button>
        </div>
      </div>

      {filteredAddUsers.length === 0 && addUsersList.length === 0 && (
        <div className="flex mt-2 flex-col items-center gap-2 mt-4">
          <EmptyApps className="w-24 h-24" />
          <Paragraph>{t("nousers")}</Paragraph>
        </div>
      )}

      {filteredAddUsers.length === 0 && addUsersList.length > 0 && (
        <div className="flex mt-2 flex-col items-center gap-2 mt-4">
          <SearchSvg className="w-24 h-24" />
          <Paragraph>{t("nousers")}</Paragraph>
        </div>
      )}

      <CheckboxGroup
        value={selectedAddUsers}
        onValueChange={setSelectedAddUsers}
      >
        <div className="grid grid-cols-3  gap-4">
          {filteredAddUsers.map((user) => (
            <CustomCheckbox
              key={user.username}
              value={user.username}
              user={{
                fullName: user.fullName,
                username: user.username,
                role: user.role || "User",
                status: user.status || "Active",
              }}
            />
          ))}
        </div>
      </CheckboxGroup>
    </div>
  );
};

export default AddUsers;
