"use client";
import Heading from "@/components/themes/Heading";
import WorkspaceBottomNavigationMob from "@/components/workspace/mob/WorkspaceBottomNavigationMob";
import WorkspaceHeaderMob from "@/components/workspace/mob/WorkspaceHeaderMob";
import WorkspaceMobContent from "@/components/workspace/mob/WorkspaceMobContent";
import SessionExpiredModal from "@/components/workspace/modals/SessionExpiredModal";
import WorkspaceContent from "@/components/workspace/WorkspaceContent";
import WorkspaceEndbar from "@/components/workspace/WorkspaceEndbar";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import WorkspaceSidebar from "@/components/workspace/WorkspaceSidebar";
import { useSessionManager } from "@/hooks/workspace/useSessionmanager";
import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import { Spinner } from "@heroui/react";
import React, { useEffect, useState } from "react";

const page = () => {
  const {
    firstCheckLoading,
    warningModalOpen,
    sessionExpired,
    warningCountdown,
    handleContinue,
    handleBackToLogin,
  } = useSessionManager();

  const { initializeWorkspace } = useWorkspaceStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!firstCheckLoading && !sessionExpired) {
      fetchAll();
    }
  }, [firstCheckLoading, sessionExpired]);

  const fetchAll = async () => {
    if (firstCheckLoading || sessionExpired) return;

    try {
      const response = await initializeWorkspace();

      setMounted(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {mounted ? (
        <>
          <div className="w-full h-full ">
            <div className="w-full h-[100dvh] sm:hidden md:hidden lg:flex xl:flex flex-col ">
              <div className="w-full h-[60px] bg-iconcolor/1">
                <WorkspaceHeader />
              </div>
              <div className="w-full h-[calc(100dvh-60px)] gap-3 flex flex-row">
                <div className="w-[80px] h-full ">
                  <WorkspaceSidebar />
                </div>
                <div
                  className="w-[calc(100%-120px)] h-full flex flex-col gap-4] border-t  rounded-t-xl
          shadow-2xl shadow-iconcolor/20 dark:bg-zinc-900 dark:border-zinc-900 dark:shadow-none
          "
                >
                  <WorkspaceContent />
                </div>
                <div className="w-[40px] h-full ">
                  <WorkspaceEndbar />
                </div>
              </div>
            </div>

            <div className="w-full h-[100dvh] sm:flex md:flex lg:hidden xl:hidden flex flex-col">
              <div className="w-full h-[60px]  sticky top-0">
                <WorkspaceHeaderMob />
              </div>
              <div className="w-full h-[calc(100dvh-120px)] max-h-[calc(100dvh-120px)] overflow-y-auto ">
                <WorkspaceMobContent />
              </div>
              <div className="w-full h-[60px] shadow-2xl border-t dark:border-zinc-800 ">
                <WorkspaceBottomNavigationMob />
              </div>
            </div>
          </div>
          <SessionExpiredModal
            isOpen={warningModalOpen || sessionExpired}
            warningModalOpen={warningModalOpen}
            onClose={warningModalOpen ? handleContinue : handleBackToLogin}
            warningCountdown={warningCountdown}
          />
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner variant="wave" color="default" />
          <SessionExpiredModal
            isOpen={warningModalOpen || sessionExpired}
            warningModalOpen={warningModalOpen}
            onClose={warningModalOpen ? handleContinue : handleBackToLogin}
            warningCountdown={warningCountdown}
          />
        </div>
      )}
    </div>
  );
};

export default page;
