import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import useActivityStore from "@/store/workspace/useActivityStore";
import React, { useEffect } from "react";
import {
  now,
  getLocalTimeZone,
  type ZonedDateTime,
} from "@internationalized/date";
import { DatePicker, Pagination } from "@heroui/react";
import { CircleX, History, SearchIcon } from "lucide-react";
import Input from "@/components/themes/Input";
import Subheading from "@/components/themes/SubHeading";
import Paragraph from "@/components/themes/Paragraph";
import Button from "@/components/themes/Button";
import { useTranslations } from "next-intl";

type Activity = {
  fullName?: string;
  userName?: string;
  description?: string;
  dateAndTime?: string;
};

const UserActivity = () => {
  const t = useTranslations("Activity.UserActivity");
  const { getUserActivity } = useActivityStore();
  const [pageNo, setPageNo] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isSearched, setIsSearched] = React.useState(false);

  const today = now(getLocalTimeZone());
  const [fromDate, setFromDate] = React.useState<ZonedDateTime | null>(today);
  const [toDate, setToDate] = React.useState<ZonedDateTime | null>(today);
  const [filtervalue, setFilterValue] = React.useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageNo, pageSize]);

  useEffect(() => {
    setPageNo(1);
  }, [pageSize]);

  const fetchData = async () => {
    const data = {
      userId: 0,
      dateRange: null,
      filterValue: null,
      pageNo: pageNo,
      pageSize: pageSize,
    };

    const response = await getUserActivity(data);
    if (response?.userActivityResponses) {
      setActivities(response.userActivityResponses);
      setTotalPages(Math.ceil(response.count / pageSize));
      setIsSearched(false);
    }
  };

  const formatDateTime = (date: ZonedDateTime | null) => {
    if (!date) return "";
    const jsDate = date.toDate();
    return `${jsDate.getFullYear()}-${String(jsDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(jsDate.getDate()).padStart(2, "0")} ${String(
      jsDate.getHours()
    ).padStart(2, "0")}:${String(jsDate.getMinutes()).padStart(
      2,
      "0"
    )}:${String(jsDate.getSeconds()).padStart(2, "0")}`;
  };

  const formatDate = (isoString: any) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  const renderDescription = (text: string) => {
    const match = text.match(/"([^"]+)"\s*(.*)/);
    if (match) {
      const rest = match[2];
      return <>{rest}</>;
    }
    return text;
  };

  const handleSubmit = async () => {
    const from = formatDateTime(fromDate);
    const to = formatDateTime(toDate);
    const dateRange = `${from},${to}`;

    const payload = {
      pageNo: 1,
      pageSize: pageSize,
      userId: 0,
      filterValue: filtervalue || null,
      dateRange,
    };

    try {
      const response = await getUserActivity(payload);
      if (response?.userActivityResponses) {
        setActivities(response.userActivityResponses);
        setTotalPages(Math.ceil(response.count / pageSize));
        setIsSearched(true);
        setPageNo(1);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleClearSearch = async () => {
    setFilterValue("");
    setIsSearched(false);
    fetchData(); // resets to full list
  };

  const ActivityItem = ({
    userName,
    fullName,
    desc,
    date,
  }: {
    userName?: string;
    fullName?: string;
    desc?: string;
    date?: string;
  }) => (
    <div className="flex items-center justify-between rounded-xl p-2 shadow-sm">
      <div className="flex items-center gap-2">
        <History className="h-4 w-4" />
        <div className="flex flex-col gap-0">
          <Subheading>{fullName || userName}</Subheading>
          <Paragraph>{renderDescription(desc || "")}</Paragraph>
        </div>
      </div>
      <Paragraph>{formatDate(date)}</Paragraph>
    </div>
  );

  return (
    <div>
      <div className="flex gap-4 items-end">
        <DatePicker
          size="sm"
          classNames={{ inputWrapper: "border-inputborder" }}
          hideTimeZone
          showMonthAndYearPickers
          label={t("fromDateLabel")}
          variant="bordered"
          value={fromDate}
          onChange={setFromDate}
          maxValue={today}
          labelPlacement="outside"
          className="max-w-xs"
        />
        <DatePicker
          size="sm"
          classNames={{ inputWrapper: "border-inputborder" }}
          hideTimeZone
          showMonthAndYearPickers
          label={t("toDateLabel")}
          labelPlacement="outside"
          variant="bordered"
          value={toDate}
          className="max-w-xs"
          onChange={setToDate}
          maxValue={today}
        />
        <Input
          isClearable
          radius="full"
          size="sm"
          label={t("search")}
          value={filtervalue}
          className="max-w-sm h-full"
          startContent={<SearchIcon className="w-4 h-4 pointer-events-none" />}
          onValueChange={setFilterValue}
          onClear={handleClearSearch}
        />
        <Button onPress={handleSubmit} isIconOnly size="sm">
          <SearchIcon className="w-4 h-4 pointer-events-none" />
        </Button>

        <Button onPress={handleClearSearch} isIconOnly size="sm">
          <CircleX className="w-4 h-4 pointer-events-none" />
        </Button>
      </div>

      <div className="max-h-[calc(100vh-266px)] overflow-y-auto scrollbar-hide mt-4">
        {activities.length === 0 && isSearched ? (
          <Paragraph className="text-center text-gray-400 mt-10">
            {t("noActivityFound")}
          </Paragraph>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {activities.map((activity, index) => (
              <ActivityItem
                key={index}
                fullName={activity.fullName}
                userName={activity.userName}
                desc={activity.description}
                date={activity.dateAndTime}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-full flex flex-row items-center justify-between p-2 mb-2">
        <div className="flex flex-row items-center">
          <label htmlFor="pageSize" className="mr-2 text-sm font-medium">
            <Paragraph>{t("itemsPerPage")}</Paragraph>
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-gray-300 p-1 cursor-pointer rounded-xl text-sm"
          >
            {[5, 10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {activities.length > 0 && (
          <Pagination
            size="sm"
            variant="light"
            classNames={{ base: "group-data-[selected=true]:text-buttontext" }}
            color="default"
            initialPage={pageNo}
            total={totalPages}
            onChange={(newPage) => setPageNo(newPage)}
          />
        )}
      </div>
    </div>
  );
};

export default UserActivity;
