import { useState } from "react";
import Tab from "./Tab";
import Source from "./Source";

import Language from "./Language";
import Category from "./Category";
import { useAppDispatch } from "../../redux/hooks";
import { modalHandler } from "../../redux/features/userPrefSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Dialog = () => {
  const [activeTab, setActiveTab] = useState<string>("source");
  const dispatch = useAppDispatch();
  return (
    <dialog id="feed_modal" className="modal modal-bottom sm:modal-middle p-0">
      <div
        style={{ height: "85vh", maxWidth: "850px" }}
        className="modal-box flex bg-base-300 p-0 overflow-hidden justify-between static"
      >
        <div className="flex flex-col h-100 bg-base-100 mr-4">
          <Tab
            label="Sources"
            active={activeTab === "source"}
            onClick={() => setActiveTab("source")}
          />
          <Tab
            label="Languages"
            active={activeTab === "language"}
            onClick={() => setActiveTab("language")}
          />
          <Tab
            label="Categories"
            active={activeTab === "category"}
            onClick={() => setActiveTab("category")}
          />
        </div>

        <div className="flex-grow overflow-auto p-3">
          {activeTab === "source" && <Source />}
          {activeTab === "category" && <Category />}
          {activeTab === "language" && <Language />}
          {/* Add more tab content as needed */}
        </div>
        <form method="dialog">
          <button>
            <XMarkIcon
              tabIndex={0}
              onClick={() => dispatch(modalHandler(true))}
              className="w-8 h-8 absolute top-0 right-0 m-2 cursor-pointer hover:text-red-500"
            />
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Dialog;
