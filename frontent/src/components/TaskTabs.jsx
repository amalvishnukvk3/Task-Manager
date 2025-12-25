//@ts-nocheck
export default function TaskTabs({ filter, setFilter, counts }) {
  return (
    <div className="mt-6 bg-gray-100 rounded-xl flex p-1">
      {["All", "Pending", "Completed"].map((tab) => {
        const active = filter === tab;

        return (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`
              flex-1 py-2 rounded-lg text-sm font-medium cursor-pointer
              transition-all duration-200
              ${active
                ? "bg-white shadow text-gray-900"
                : "text-gray-500 hover:bg-emerald-50"
              }
            `}
          >
            {tab}
            <span
              className="
                ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-xs
              "
            >
              {counts[tab]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
