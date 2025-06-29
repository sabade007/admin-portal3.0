// import React, { useEffect, useState } from "react";
// import { addToast, DatePicker, Textarea, TimeInput } from "@heroui/react";
// import { parseISO, format } from "date-fns";
// import {
//   CalendarDate,
//   today,
//   getLocalTimeZone,
//   parseDate,
// } from "@internationalized/date";
// import useMaintenanceStore from "@/store/workspace/useMaintenanceStore";
// import { useTranslations } from "next-intl";
// import Subheading from "@/components/themes/SubHeading";
// import Paragraph from "@/components/themes/Paragraph";
// import { parseAbsoluteToLocal } from "@internationalized/date";
// import { Time } from "@internationalized/date";
// import Switch from "@/components/themes/Switch";
// import Button from "@/components/themes/Button";
// import { RangeCalendar } from "@heroui/react";
// import { DateTime } from "luxon";
// import Input from "@/components/themes/Input";

// const MaintenanceSettings = () => {
//   const t = useTranslations("Maintenance");

//   const {
//     getServerMaintainenceSettings,
//     mStartDate,
//     setMStartDate,
//     mEndDate,
//     setMEndDate,
//     mStartTime,
//     setMStartTime,
//     mEndTime,
//     setMEndTime,
//     mdesc,
//     setMDesc,
//     madd,
//     setMAdd,
//     postServerMaintenance,
//   } = useMaintenanceStore();

//   const [displayRange, setDisplayRange] = useState<{
//     start: CalendarDate;
//     end: CalendarDate;
//   }>({
//     start: today(getLocalTimeZone()),
//     end: today(getLocalTimeZone()).add({ days: 7 }),
//   });

//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [description, setDescription] = useState("");

//   const todayDate = new Date().toISOString().split("T")[0];

//   const getNextMinute = () => {
//     const now = new Date();
//     now.setSeconds(0, 0);
//     now.setMinutes(now.getMinutes() + 1);
//     return now.toTimeString().slice(0, 5); // "HH:mm"
//   };

//   const nowDate = new Date().toISOString().split("T")[0];
//   const nextMinute = getNextMinute();

//   useEffect(() => {
//     fetchMaintenanceSettings();
//   }, [getServerMaintainenceSettings]);

//   const fetchMaintenanceSettings = async () => {
//     const orgId = localStorage.getItem("orgId");
//     if (!orgId) return;

//     const res = await getServerMaintainenceSettings(orgId);
//     if (res?.value) {
//       try {
//         const parsed = JSON.parse(res.value);

//         const start = parseISO(parsed.fromDateTime);
//         const end = parseISO(parsed.toDateTime);

//         setStartDate(start);
//         setEndDate(end);
//         setDescription(parsed.description);

//         setDisplayRange({
//           start: parseDate(parsed.fromDateTime.slice(0, 10)),
//           end: parseDate(parsed.toDateTime.slice(0, 10)),
//         });
//       } catch (e) {
//         console.error("Failed to parse maintenance config:", e);
//       }
//     }
//   };

//   const formatToUTC = (date: string, time: string) => {
//     const combined = `${date}T${time}`;
//     return DateTime.fromISO(combined, { zone: "local" }).toUTC().toISO();
//   };

//   const handleSave = async () => {
//     if (!mdesc || !mStartDate || !mEndDate || !mStartTime || !mEndTime) {
//       addToast({
//         title: t("addScheduleError"),
//         color: "danger",
//       });
//       return;
//     }

//     const orgId = localStorage.getItem("orgId");
//     if (!orgId) return;

//     const fromDateTime = formatToUTC(mStartDate, mStartTime);
//     const toDateTime = formatToUTC(mEndDate, mEndTime);

//     const data = {
//       description: mdesc,
//       fromDateTime,
//       toDateTime,
//       maintenance: madd,
//       orgId: Number(orgId),
//       totalDuration: "",
//     };

//     try {
//       const response = await postServerMaintenance(data);
//       console.log("Maintenance schedule updated:", response);

//       addToast({
//         title: t("successMessage"),
//         color: "success",
//       });

//       setMStartDate("");
//       setMEndDate("");
//       setMStartTime("");
//       setMEndTime("");
//       setMDesc("");
//       setMAdd(false);

//       fetchMaintenanceSettings();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async () => {
//     const orgId = localStorage.getItem("orgId");
//     if (!orgId) return;

//     const now = new Date();
//     const todayDate = now.toISOString().split("T")[0];
//     const currentTime = now.toTimeString().slice(0, 5); // "HH:mm"

//     const fromDateTime = formatToUTC(todayDate, currentTime);
//     const toDateTime = formatToUTC(todayDate, currentTime);

//     const data = {
//       description: mdesc,
//       fromDateTime,
//       toDateTime,
//       maintenance: false,
//       orgId: Number(orgId),
//       totalDuration: "",
//     };

//     try {
//       const response = await postServerMaintenance(data);
//       console.log("Maintenance schedule updated:", response);

//       addToast({
//         title: t("successMessage"),
//         color: "success",
//       });

//       setMStartDate("");
//       setMEndDate("");
//       setMStartTime("");
//       setMEndTime("");
//       setMDesc("");
//       setMAdd(false);

//       fetchMaintenanceSettings();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-h-[calc(100dvh-220px)] overflow-y-auto scrollbar-hide">
//       <div className="flex flex-row  gap-8">
//         {/* Left Section - Inputs */}
//         <div className="p-4">
//           <Subheading>{t("title1")}</Subheading>
//           <Paragraph>{t("desc1")}</Paragraph>

//           <div className="grid grid-cols-2 gap-4 mt-4">
//             <Input
//               label={t("startDate")}
//               type="date"
//               onChange={(e) => setMStartDate(e.target.value)}
//               value={mStartDate}
//               min={todayDate}
//             />
//             <Input
//               type="date"
//               label={t("endDate")}
//               onChange={(e) => setMEndDate(e.target.value)}
//               value={mEndDate}
//               min={mStartDate || todayDate}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4 mt-4">
//             <Input
//               type="time"
//               label={t("startTime")}
//               onChange={(e) => setMStartTime(e.target.value)}
//               value={mStartTime}
//               min={mStartDate === nowDate ? nextMinute : undefined}
//             />
//             <Input
//               type="time"
//               label={t("endTime")}
//               onChange={(e) => setMEndTime(e.target.value)}
//               value={mEndTime}
//               min={mEndDate === nowDate ? nextMinute : undefined}
//             />
//           </div>

//           <div className="mt-4">
//             <Textarea
//               variant="bordered"
//               className="max-w-[416px]"
//               label={t("description")}
//               placeholder={t("descriptionPlaceholder")}
//               value={mdesc}
//               onChange={(e) => setMDesc(e.target.value)}
//             />
//           </div>

//           <div className="max-w-[416px] mt-4 flex flex-row items-center gap-4">
//             <Switch
//               onValueChange={setMAdd}
//               isSelected={madd}
//               label={<Subheading>{t("addSchedule")}</Subheading>}
//             />
//             <Button onPress={handleSave}>{t("update")}</Button>
//           </div>
//         </div>

//         {/* Right Section - Display */}
//         {startDate && endDate && (
//           <div className="p-4 border dark:border-zinc-800 rounded-2xl">
//             <Subheading>{t("title2")}</Subheading>
//             <RangeCalendar
//               className="mt-2 scale-90"
//               aria-label="Maintenance Window"
//               value={displayRange}
//               minValue={displayRange.start}
//               maxValue={displayRange.end}
//               isReadOnly
//               color="foreground"
//               errorMessage="Maintenance window is currently closed"
//             />

//             <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
//               <Subheading>
//                 {t("notes")} : {description || "—"}
//               </Subheading>
//               <Subheading>
//                 {t("start")} : {format(startDate, "p")} {/* just time */}
//               </Subheading>
//               <Subheading>
//                 {t("end")} : {format(endDate, "p")} {/* just time */}
//               </Subheading>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MaintenanceSettings;

import React, { useEffect, useState } from "react";
import { addToast, Textarea, RangeCalendar } from "@heroui/react";
import { parseISO, format } from "date-fns";
import {
  CalendarDate,
  today,
  getLocalTimeZone,
  parseDate,
} from "@internationalized/date";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";

import useMaintenanceStore from "@/store/workspace/useMaintenanceStore";
import Subheading from "@/components/themes/SubHeading";
import Paragraph from "@/components/themes/Paragraph";
import Switch from "@/components/themes/Switch";
import Button from "@/components/themes/Button";
import Input from "@/components/themes/Input";

const MaintenanceSettings = () => {
  const t = useTranslations("Maintenance");

  const {
    getServerMaintainenceSettings,
    mStartDate,
    setMStartDate,
    mEndDate,
    setMEndDate,
    mStartTime,
    setMStartTime,
    mEndTime,
    setMEndTime,
    mdesc,
    setMDesc,
    madd,
    setMAdd,
    postServerMaintenance,
  } = useMaintenanceStore();

  const [displayRange, setDisplayRange] = useState<{
    start: CalendarDate;
    end: CalendarDate;
  }>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 7 }),
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [description, setDescription] = useState("");

  const todayDate = new Date().toISOString().split("T")[0];
  const nowDate = todayDate;

  const getNextMinute = () => {
    const now = new Date();
    now.setSeconds(0, 0);
    now.setMinutes(now.getMinutes() + 1);
    return now.toTimeString().slice(0, 5);
  };

  const nextMinute = getNextMinute();

  useEffect(() => {
    fetchMaintenanceSettings();
  }, []);

  const fetchMaintenanceSettings = async () => {
    const orgId = localStorage.getItem("orgId");
    if (!orgId) return;

    const res = await getServerMaintainenceSettings(orgId);
    if (res?.value) {
      try {
        const parsed = JSON.parse(res.value);
        const start = parseISO(parsed.fromDateTime);
        const end = parseISO(parsed.toDateTime);

        setStartDate(start);
        setEndDate(end);
        setDescription(parsed.description);

        setDisplayRange({
          start: parseDate(parsed.fromDateTime.slice(0, 10)),
          end: parseDate(parsed.toDateTime.slice(0, 10)),
        });
      } catch (e) {
        console.error("Failed to parse maintenance config:", e);
      }
    }
  };

  const formatToUTC = (date: string, time: string) => {
    const combined = `${date}T${time}`;
    return DateTime.fromISO(combined, { zone: "local" }).toUTC().toISO();
  };

  const handleSave = async () => {
    if (!mdesc || !mStartDate || !mEndDate || !mStartTime || !mEndTime) {
      addToast({ title: t("addScheduleError"), color: "danger" });
      return;
    }

    const orgId = localStorage.getItem("orgId");
    if (!orgId) return;

    const fromDateTime = formatToUTC(mStartDate, mStartTime);
    const toDateTime = formatToUTC(mEndDate, mEndTime);

    const data = {
      description: mdesc,
      fromDateTime,
      toDateTime,
      maintenance: madd,
      orgId: Number(orgId),
      totalDuration: "",
    };

    try {
      await postServerMaintenance(data);
      addToast({ title: t("successMessage"), color: "success" });

      setMStartDate("");
      setMEndDate("");
      setMStartTime("");
      setMEndTime("");
      setMDesc("");
      setMAdd(false);

      fetchMaintenanceSettings();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const orgId = localStorage.getItem("orgId");
    if (!orgId) return;

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().slice(0, 5);

    const fromDateTime = formatToUTC(dateStr, timeStr);
    const toDateTime = formatToUTC(dateStr, timeStr);

    const data = {
      description: mdesc,
      fromDateTime,
      toDateTime,
      maintenance: false,
      orgId: Number(orgId),
      totalDuration: "",
    };

    try {
      await postServerMaintenance(data);
      addToast({ title: t("successMessage"), color: "success" });

      setMStartDate("");
      setMEndDate("");
      setMStartTime("");
      setMEndTime("");
      setMDesc("");
      setMAdd(false);

      // ✅ Reset calendar preview
      setStartDate(null);
      setEndDate(null);
      setDescription("");

      fetchMaintenanceSettings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-h-[calc(100dvh-220px)] overflow-y-auto scrollbar-hide">
      <div className="flex flex-row gap-8">
        {/* Left Section */}
        <div className="p-4">
          <Subheading>{t("title1")}</Subheading>
          <Paragraph>{t("desc1")}</Paragraph>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              label={t("startDate")}
              type="date"
              value={mStartDate}
              onChange={(e) => setMStartDate(e.target.value)}
              min={todayDate}
            />
            <Input
              label={t("endDate")}
              type="date"
              value={mEndDate}
              onChange={(e) => setMEndDate(e.target.value)}
              min={mStartDate || todayDate}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              label={t("startTime")}
              type="time"
              value={mStartTime}
              onChange={(e) => setMStartTime(e.target.value)}
              min={mStartDate === nowDate ? nextMinute : undefined}
            />
            <Input
              label={t("endTime")}
              type="time"
              value={mEndTime}
              onChange={(e) => setMEndTime(e.target.value)}
              min={mEndDate === nowDate ? nextMinute : undefined}
            />
          </div>

          <div className="mt-4">
            <Textarea
              variant="bordered"
              className="max-w-[416px]"
              label={t("description")}
              placeholder={t("descriptionPlaceholder")}
              value={mdesc}
              onChange={(e) => setMDesc(e.target.value)}
            />
          </div>

          <div className="max-w-[416px] mt-4 flex flex-row items-center gap-4">
            <Switch
              onValueChange={setMAdd}
              isSelected={madd}
              label={<Subheading>{t("addSchedule")}</Subheading>}
            />
            <Button onPress={handleSave}>{t("update")}</Button>
          </div>
        </div>

        {/* Right Section */}
        {startDate && endDate && (
          <div className="p-4 border dark:border-zinc-800 rounded-2xl flex flex-col items-center">
            <div className="flex flex-row justify-between items-center gap-4">
              <Subheading>{t("title2")}</Subheading>
              <Button size="sm" onPress={handleDelete}>
                {t("remove")}
              </Button>
            </div>

            <RangeCalendar
              className="mt-2 scale-90"
              aria-label="Maintenance Window"
              value={displayRange}
              minValue={displayRange.start}
              maxValue={displayRange.end}
              isReadOnly
              color="foreground"
              errorMessage="Maintenance window is currently closed"
            />

            <div className="text-sm text-gray-700 dark:text-gray-300 w-full space-y-1 ">
              <div className="border dark:border-zinc-800 p-2 flex flex-row items-center gap-4 w-full rounded-xl">
                <Subheading>{t("timeRange")}</Subheading>
                <Subheading>{format(startDate, "p")}</Subheading>
                <Subheading>-</Subheading>
                <Subheading>{format(endDate, "p")}</Subheading>
              </div>
              <div className="border dark:border-zinc-800 p-2 flex flex-row items-center gap-4 w-full rounded-xl">
                <Subheading>{description || "—"}</Subheading>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceSettings;
