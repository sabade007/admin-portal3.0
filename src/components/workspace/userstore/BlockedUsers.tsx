"use client";

import Button from "@/components/themes/Button";
import Heading from "@/components/themes/Heading";
import Input from "@/components/themes/Input";
import Paragraph from "@/components/themes/Paragraph";
import Subheading from "@/components/themes/SubHeading";
import { EmptyApps } from "@/lib/svg";
import useUserStore from "@/store/workspace/useUserStore";
import { addToast, Pagination } from "@heroui/react";
import { LayoutList, Search, UserCheck2, UserCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const BlockedUsers = () => {
  const t = useTranslations("UserStore.Iam");

  const [searchUserTerm, setSearchUserTerm] = React.useState<string>("");
  const [pageSize, setPageSize] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(1);
  const [pageNo, setPageNo] = React.useState(1);
  const [users, setUsers] = React.useState<any[]>([]);
  const hasSearchedOnce = React.useRef(false);

  const { getUsers, getSearchResults, updateStorage } = useUserStore();
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [editableStorage, setEditableStorage] = React.useState<number | string>(
    ""
  );

  useEffect(() => {
    fetchDetails();
  }, [pageNo, pageSize]);

  const fetchDetails = async () => {
    const body = {
      asc: true,
      pageNb: 1,
      step: pageSize,
      sortBy: "username",
      userStore: "BLOCKED_USER", // 🔁 Only change here
    };

    const response = await getUsers(body);
    if (response) {
      setUsers(response.users);
      setTotalPages(Math.ceil(response.totalRecord / pageSize));
      return response.users;
    }

    return [];
  };

  useEffect(() => {
    if (searchUserTerm.length >= 3) {
      hasSearchedOnce.current = true;
      fetchSearchResults();
    } else {
      if (hasSearchedOnce.current) {
        fetchDetails();
      }
    }
  }, [searchUserTerm]);

  const fetchSearchResults = async () => {
    try {
      const body = {
        asc: true,
        pageNb: 1,
        step: 10,
        sortBy: "username",
        userStore: "BY_ADMIN", // 🔁 Only change here
      };
      const response = await getSearchResults(body, searchUserTerm);
      if (response) {
        setUsers(response.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPageNo(1);
  }, [pageSize]);

  useEffect(() => {
    if (selectedUser) {
      const space = Number(selectedUser.availableSpace);
      setEditableStorage(space ? space / (1024 * 1024 * 1024) : 0);
    }
  }, [selectedUser]);

  const UserItem = ({ user }: { user: any }) => {
    const isSelected = selectedUser?.id === user.id;

    return (
      <div
        className={`flex flex-col rounded-xl border dark:border-zinc-800 p-2 cursor-pointer ${
          isSelected ? "bg-default/30" : ""
        }`}
        onClick={() => setSelectedUser(user)}
      >
        <div className="flex gap-2 items-center">
          <UserCircle2 className="h-4 w-4" />
          <div className="flex flex-col">
            <Subheading>{user.fullName}</Subheading>
            <Paragraph>{user.email}</Paragraph>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="grid grid-cols-3">
        <div className="col-span-2 flex flex-col gap-2 border dark:border-zinc-800 p-2 rounded-tl-xl">
          <div className="flex items-center gap-2">
            <UserCircle2 className="h-4 w-4" />
            <Subheading>{t("userslist")}</Subheading>
          </div>
          <Input
            isClearable={true}
            radius="full"
            size="sm"
            value={searchUserTerm}
            onValueChange={setSearchUserTerm}
            placeholder={t("searchUsers")}
            startContent={<Search className="w-4 h-4 pointer-events-none" />}
          />
        </div>
        <div className="col-span-1 flex flex-row items-center h-full justify-center gap-2 border dark:border-zinc-800 p-2 rounded-tr-xl border-l-0 border-b-0">
          <LayoutList className="w-4 h-4" />
          <Subheading>{t("userDetails")}</Subheading>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="col-span-2 flex flex-col gap-2 border dark:border-zinc-800 p-2 border-t-0 max-h-[calc(100dvh-286px)] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2">
            {users.map((user: any) => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
          {users.length === 0 && (
            <div className="flex mt-2 flex-col items-center gap-2 mt-4">
              <EmptyApps className="w-24 h-24" />
              <Paragraph>{t("nousers")}</Paragraph>
            </div>
          )}
        </div>
        <div className="col-span-1 flex flex-col gap-2 border dark:border-zinc-800 p-2 border-l-0 border-t-0 border-b-0">
          {selectedUser ? (
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-center">
                {selectedUser.displayPicture ? (
                  <img
                    src={selectedUser.displayPicture}
                    alt="User"
                    className="w-16 h-16 rounded-full border"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-default/20 flex items-center justify-center text-xs text-muted-foreground">
                    <Heading>
                      {selectedUser.fullName?.[0]?.toUpperCase()}
                    </Heading>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Paragraph>{t("username")}</Paragraph>
                  <Subheading>{selectedUser.username}</Subheading>
                </div>
                <div>
                  <Paragraph>{t("emailVerified")}</Paragraph>
                  <Subheading>
                    {selectedUser.emailVerified ? t("yes") : t("no")}
                  </Subheading>
                </div>
                <div>
                  <Paragraph>{t("mobile")}</Paragraph>
                  <Subheading>{selectedUser.phone || t("none")}</Subheading>
                </div>
                <div>
                  <Paragraph>{t("createdDate")}</Paragraph>
                  <Subheading>
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </Subheading>
                </div>
                <div>
                  <Paragraph>{t("blocked")}</Paragraph>
                  <Subheading>
                    {selectedUser.enabled ? t("no") : t("yes")}
                  </Subheading>
                </div>
                <div>
                  <Paragraph>{t("userRole")}</Paragraph>
                  <Subheading>{selectedUser.userRole}</Subheading>
                </div>
              </div>

              <Input
                label={t("storageLabel")}
                type="number"
                min={0}
                value={String(editableStorage)}
                onChange={(e) => setEditableStorage(Number(e.target.value))}
                endContent="GB"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center mt-4 mb-4">
              <UserCheck2 className="h-8 w-8" />
              <Paragraph>{t("selectUserPrompt")}</Paragraph>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="col-span-2 flex flex-col gap-2 border dark:border-zinc-800 p-2 border-t-0 rounded-bl-xl">
          {users.length > 0 && (
            <div className="w-full flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <label htmlFor="pageSize" className="mr-2 text-sm">
                  <Paragraph>{t("itemsPerPage")}</Paragraph>
                </label>
                <select
                  id="pageSize"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="p-1 cursor-pointer rounded-xl text-sm"
                >
                  {[5, 10, 20, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <Pagination
                size="sm"
                variant="light"
                classNames={{
                  base: "group-data-[selected=true]:text-buttontext",
                }}
                color="default"
                initialPage={pageNo}
                total={totalPages}
                onChange={(newPage) => setPageNo(newPage)}
              />
            </div>
          )}
        </div>
        <div className="col-span-1 flex flex-col gap-2 border dark:border-zinc-800 p-2 border-t-0 rounded-br-xl border-l-0">
          <div className="flex items-center justify-end gap-2">
            {selectedUser?.userRole !== "ADMIN" && (
              <Button
                isDisabled={!selectedUser}
                size="sm"
                onPress={async () => {
                  if (!selectedUser) return;

                  const isBlocked = !selectedUser.enabled;
                  const actionType = isBlocked ? "unblock" : "block";
                  const enabled = isBlocked;

                  const body = {
                    userId: selectedUser.id,
                    actionType,
                    enabled,
                    space: selectedUser.availableSpace,
                  };

                  try {
                    const response = await updateStorage(body);
                    if (response?.code === 200) {
                      addToast({
                        title:
                          actionType === "block"
                            ? t("userBlocked")
                            : t("userUnblocked"),
                        color: "success",
                      });

                      const updatedUsers = await fetchDetails();
                      const updated = updatedUsers.find(
                        (u: any) => u.id === selectedUser.id
                      );
                      if (updated) {
                        setSelectedUser(updated);
                      } else {
                        setSelectedUser(null); // 👈 Reset selection if user is no longer in the list
                      }
                    } else {
                      addToast({
                        title: t("failedtoblock"),
                        color: "danger",
                      });
                    }
                  } catch (err) {
                    console.error(`Failed to ${actionType} user`, err);
                  }
                }}
              >
                {!selectedUser?.enabled ? t("unblock") : t("block")}
              </Button>
            )}

            <Button
              isDisabled={!selectedUser}
              size="sm"
              onPress={async () => {
                if (!selectedUser) return;

                const storageInBytes =
                  Number(editableStorage) * 1024 * 1024 * 1024;
                const body = {
                  userId: selectedUser.id,
                  actionType: "update",
                  enabled: true,
                  space: storageInBytes,
                };

                try {
                  const response = await updateStorage(body);
                  if (response?.code === 200) {
                    addToast({
                      title: t("storageUpdated"),
                      color: "success",
                    });
                    const updatedUsers = await fetchDetails();
                    const updated = updatedUsers.find(
                      (u: any) => u.id === selectedUser.id
                    );
                    if (updated) setSelectedUser(updated);
                  } else {
                    addToast({
                      title: t("storageUpdatedError"),
                      color: "danger",
                    });
                  }
                } catch (err) {
                  console.error("Failed to update storage", err);
                }
              }}
            >
              {t("update")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedUsers;
