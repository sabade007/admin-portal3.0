import React from "react";

interface WorkspaceTabItemProps {
  child1: React.ReactNode;
  child2: React.ReactNode;
}

const SetupTabItem = ({ child1, child2 }: WorkspaceTabItemProps) => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 w-full h-full gap-4">
        <div className="col-span-1 max-h-full h-full overflow-y-auto scrollbar-hide ">
          {child1}
        </div>
        <div className="col-span-1 h-full overflow-y-auto scrollbar-hide max-h-full ">
          {child2}
        </div>
      </div>
    </div>
  );
};

export default SetupTabItem;
