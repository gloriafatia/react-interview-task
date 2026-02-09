import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { categoriesData, itemsData } from "../data/mock_data";
import emptyImage from "../assets/empty-box.png";
import { Search } from "lucide-react";
import ItemModal from "../components/ItemModal";
import useLocalStorage from "../hooks/useLocalStorage";
import type { ItemType } from "../types/general";

const JobsiteDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobsite = location.state?.jobsite;

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

  const [items, setItems] = useLocalStorage("items", itemsData);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const handleSaveItem = (updatedItem: ItemType) => {
    setItems((prev) =>
      prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
    );
  };

  if (!jobsite) {
    return <div className="p-4">No jobsite selected</div>;
  }

  const jobCategories = categoriesData.filter((c) =>
    jobsite.categories?.includes(c.id),
  );

  const filteredItems = items.filter(
    (i) =>
      i.jobId === jobsite.id &&
      (!selectedCategoryId || i.categoryId === selectedCategoryId) &&
      (i.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (i.notes || "").toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const closeCategory = () => {
    setSelectedCategoryId(null);
    setSearchTerm("");
  }

  const itemClick = (item: ItemType) => {
    setSelectedItem({ ...item });
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-200px)]">
          <div className="w-full md:w-[260px] bg-white rounded-xl shadow-md flex flex-col">
            <div className="h-[50px] bg-[#F8F8FA] flex items-center px-4 border-b font-semibold">
              {jobsite.name}
            </div>

            <div className="p-4 space-y-3 flex-1 overflow-auto">
              {jobCategories.map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className="
                  cursor-pointer
                  w-full
                  py-2
                  px-3
                  rounded-lg
                  text-sm
                  transition
                  flex
                  items-center
                  justify-between
                "
                    style={{
                      backgroundColor: isSelected ? cat.color : "#f3f4f6",
                      color: isSelected ? "white" : "#374151",
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  >
                    <span>{cat.label}</span>
                    {isSelected && <span className="text-lg font-bold">✓</span>}
                  </div>
                );
              })}
            </div>

            <div className="p-4 flex justify-center">
              <button
                onClick={() => navigate(-1)}
                className="group flex items-center h-9 rounded-lg overflow-hidden bg-[#1264a3] hover:bg-[#0f5c97] transition-colors shrink-0"
              >
                <span className="px-4 text-white text-sm font-medium flex items-center justify-center">
                  Go Back
                </span>
                <span className="h-full w-[2px] bg-[#0f5c97] group-hover:bg-[#1264a3] transition-colors" />
                <span className="px-4 text-white text-lg font-bold flex items-center justify-center">
                  ←
                </span>
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-xl shadow-md flex flex-col">
            <div className="h-[50px] bg-[#F8F8FA] flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 border-b font-medium gap-2 sm:gap-0">
              <span className="font-semibold text-gray-700">
                {selectedCategoryId
                  ? categoriesData.find((c) => c.id === selectedCategoryId)?.label
                  : "Data Grid"}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#eaeaea]"
                  />

                  <input
                    type="text"
                    placeholder="Search a driver"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="
                  pl-9
                  w-full
                  sm:w-[400px]
                  text-sm
                  px-3
                  py-1
                  rounded-md
                  border
                  border-[#eaeaea]
                  focus:outline-none
                  placeholder:text-[#eaeaea]
                "
                  />
                </div>

                {selectedCategoryId && (
                  <button
                    onClick={closeCategory}
                    className="
                  w-8 h-8
                  flex items-center justify-center
                  rounded-md
                  text-gray-500
                  hover:text-red-500
                  hover:bg-gray-200
                  transition
                  font-bold
                "
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="px-2 flex-1 overflow-auto">
              {!selectedCategoryId ? (
                <div className="flex flex-col items-center justify-center text-gray-400 h-full">
                  <img
                    src={emptyImage}
                    alt="No data"
                    className="w-32 h-32 mb-4 opacity-80"
                  />
                  <p className=" text-black font-semibold">No Service Selected</p>
                  <p className="text-sm text-black">
                    Please select a service on your left to proceed.
                  </p>
                </div>
              ) : (
                <>
                  <table className="w-full border-collapse text-sm table-auto">
                    <thead>
                      <tr className=" text-gray-600">
                        <th className="text-left py-1 px-2">Nr</th>
                        <th className="text-left py-1 px-2">Item</th>
                        <th className="text-left py-1 px-2">Quantity</th>
                        <th className="text-left py-1 px-2">Description</th>
                        <th className="text-left py-1 px-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => itemClick(item)}
                          className="
                        cursor-pointer
                        odd:bg-gray-50 even:bg-white
                        hover:bg-gray-100
                        transition
                      "
                        >
                          <td className="py-1 px-2">{item.nr}</td>
                          <td className="py-1 px-2">{item.item}</td>
                          <td className="py-1 px-2">{item.quantity}</td>
                          <td className="py-1 px-2 text-gray-500">
                            {item.description}
                          </td>
                          <td className="py-1 px-4 text-gray-400">
                            {item.notes || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ItemModal
          isOpen={isModalOpen}
          item={selectedItem}
          availableItems={filteredItems} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onSave={handleSaveItem}
        />
      )}
    </>
  );
};

export default JobsiteDetailPage;
