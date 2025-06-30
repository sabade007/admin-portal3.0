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

type Activity = {
  fullName?: string;
  userName?: string;
  description?: string;
  createdAt?: string;
};

const AdminActivity = () => {
  const { getAdminActivity } = useActivityStore();
  const [pageNo, setPageNo] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);

  const today = now(getLocalTimeZone());
  const [fromDate, setFromDate] = React.useState<ZonedDateTime | null>(today);
  const [toDate, setToDate] = React.useState<ZonedDateTime | null>(today);
  const [filtervalue, setFilterValue] = React.useState("");
  const [isSearched, setIsSearched] = React.useState(false);

  useEffect(() => {
    fetchData();
    setIsSearched(false);
  }, [pageNo, pageSize]);

  const fetchData = async (customParams?: {
    filterValue?: string;
    dateRange?: string;
    resetPage?: boolean;
  }) => {
    if (customParams?.resetPage) setPageNo(1);

    const data = {
      adminId: 0,
      dateRange: customParams?.dateRange || null,
      filterValue: customParams?.filterValue || null,
      pageNo,
      pageSize,
    };

    try {
      const response = await getAdminActivity(data);
      if (response?.adminActivityResponses) {
        setActivities(response.adminActivityResponses);
        setTotalPages(Math.ceil(response.count / pageSize));
      }
    } catch (err) {
      console.error("Error fetching activity:", err);
    }
  };

  const formatDateTime = (date: ZonedDateTime | null) => {
    if (!date) return "";
    const jsDate = date.toDate(); // ✅ no argument
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

  const formatDate = (isoString: string = "") => {
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

  const renderDescription = (text: string = "") => {
    const match = text.match(/"([^"]+)"\s*(.*)/);
    if (match) {
      const nameOnly = match[1];
      const rest = match[2];
      return <>{rest}</>;
    }
    return text;
  };

  const handleSubmit = async () => {
    const from = formatDateTime(fromDate);
    const to = formatDateTime(toDate);
    const dateRange = `${from},${to}`;

    await fetchData({
      filterValue: filtervalue,
      dateRange,
      resetPage: true,
    });

    setIsSearched(true); // <-- ADD THIS LINE
  };

  const ActivityItem = ({
    userName,
    fullName,
    description,
    createdAt,
  }: Activity) => {
    return (
      <div className="flex items-center justify-between rounded-xl p-2 shadow-sm">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4" />
          <div className="flex flex-col gap-0">
            <Subheading>{userName}</Subheading>
            <Paragraph>{renderDescription(description)}</Paragraph>
          </div>
        </div>
        <Paragraph>{formatDate(createdAt)}</Paragraph>
      </div>
    );
  };

  const handleClearSearch = async () => {
    setFilterValue("");
    setIsSearched(false);
    fetchData(); // resets to full list
  };

  return (
    <div className="">
      <div className="flex gap-4 items-end">
        <DatePicker
          size="sm"
          classNames={{ inputWrapper: "border-inputborder" }}
          hideTimeZone
          showMonthAndYearPickers
          label="From Date & Time"
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
          label="To Date & Time"
          variant="bordered"
          value={toDate}
          onChange={setToDate}
          maxValue={today}
          labelPlacement="outside"
          className="max-w-xs"
        />
        <Input
          isClearable={true}
          radius="full"
          size="sm"
          label="Search"
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
            No activity found.
          </Paragraph>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {activities.map((activity, index) => (
              <ActivityItem
                key={index}
                fullName={activity.fullName}
                userName={activity.userName}
                description={activity.description}
                createdAt={activity.createdAt}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-full flex flex-row items-center justify-between p-2 mb-2">
        <div className="flex flex-row items-center">
          <label htmlFor="pageSize" className="mr-2 text-sm font-medium">
            <Paragraph>Items per page:</Paragraph>
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

export default AdminActivity;
