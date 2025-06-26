import Button from "@/components/themes/Button";
import Heading from "@/components/themes/Heading";
import Paragraph from "@/components/themes/Paragraph";
import { Modal, ModalBody, ModalContent } from "@heroui/react";
import { LogOut } from "lucide-react";

import { FC } from "react";

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  warningModalOpen: boolean;
  warningCountdown: number;
}

const SessionExpiredModal: FC<SessionExpiredModalProps> = ({
  isOpen,
  onClose,
  warningModalOpen,
  warningCountdown,
}) => {
  return (
    <Modal
      isDismissable={false}
      size="2xl"
      isOpen={isOpen}
      onOpenChange={onClose}
      backdrop="opaque"
      classNames={{
        closeButton: "hidden",
        wrapper: "p-0",
        base: "p-0",
        body: "p-0",
        header:
          "text-iconcolor sm:text-sm md:text-sm lg:text-base xl:text-base font-semibold tracking-wide",
      }}
    >
      <ModalContent>
        {/* @ts-ignore - ModalContent expects children as a render function in HeroUI */}
        {(closeFn: () => void) => (
          <ModalBody>
            <div className="grid grid-cols-12 h-[200px] sm:h-[150px] md:h-[150px] lg:h-[200px] xl:h-[200px]">
              {/* Countdown or Icon Panel */}
              <div className="col-span-6 sm:hidden md:hidden lg:col-span-4 xl:col-span-4 w-full h-full bg-sidebarbg dark:bg-zinc-800 text-center shadow-lg gap-2 flex flex-col justify-center items-center rounded-xl">
                {warningModalOpen ? (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <p className="text-iconcolor font-bold mt-4 text-5xl">
                      {warningCountdown}
                    </p>
                    <p className="text-iconcolor font-bold text-lg">
                      seconds remaining
                    </p>
                  </div>
                ) : (
                  <LogOut className="w-8 h-8 text-iconcolor animate-pulse" />
                )}
              </div>

              {/* Content Section */}
              <div className="col-span-6 sm:col-span-12 md:col-span-12 lg:col-span-8 xl:col-span-8 w-full h-full max-h-full overflow-y-auto">
                <div className="flex flex-col gap-2 justify-between h-full p-4 overflow-y-auto">
                  <div className="flex flex-col gap-2">
                    {warningModalOpen ? (
                      <div className="flex flex-col gap-2 justify-between h-full">
                        <div className="flex flex-row items-center gap-2">
                          <Heading>Session Expiring Soon!</Heading>
                          <LogOut className="w-8 h-8 text-iconcolor" />
                        </div>
                        <Paragraph>
                          Your session is about to expire in one minute. Please
                          make any user actions to keep the session active.
                        </Paragraph>
                      </div>
                    ) : (
                      <div>
                        <Heading>Oops! Session Expired !!</Heading>
                        <Paragraph>
                          Your session has expired. Please log in again to
                          continue.
                        </Paragraph>
                      </div>
                    )}
                  </div>

                  {/* Button */}
                  <div className="flex flex-row gap-2 justify-end">
                    {!warningModalOpen && (
                      <Button onPress={onClose}>Log in Again!</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SessionExpiredModal;
