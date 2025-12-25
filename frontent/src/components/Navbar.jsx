//@ts-nocheck
import { useState, useEffect, useRef } from "react";
import { LogOut, CheckSquare } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-b border-gray-200 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div
          className="
            flex items-center gap-2
            text-emerald-500 font-semibold text-xl
            cursor-pointer
            transition-opacity
            hover:opacity-90
          "
        >
          <CheckSquare size={22} />
          <span>Task Manager</span>
        </div>

        <div className="flex items-center gap-4">

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="
                flex items-center gap-2
                cursor-pointer
                transition-opacity
                hover:opacity-90
              "
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-medium">
                {user?.name?.[0]?.toUpperCase()}
              </div>

              <span className="text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </button>

            {open && (
              <div
                className="
                  absolute right-0 mt-3 w-64
                  bg-white
                  border border-gray-200
                  rounded-lg shadow-md
                  overflow-hidden
                "
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>

                <div className="border-t border-gray-200">
                  <button
                    onClick={onLogout}
                    className="
                      w-full flex items-center gap-2
                      px-4 py-3 text-sm text-red-500
                      cursor-pointer
                      transition-colors
                      hover:bg-red-50
                    "
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
