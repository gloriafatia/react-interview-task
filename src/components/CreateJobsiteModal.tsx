import React, { useState, useEffect } from "react";
import { Listbox, ListboxOptions, ListboxOption, ListboxButton } from "@headlessui/react";
import { categoriesData } from "../data/mock_data";
import type { Category } from "../types/general";

interface CreateJobsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    categories: number[];
    status: string;
  }) => void;
}

const STATUS_OPTIONS = [
  { label: "Completed", value: "Completed", color: "#7ac14d" },
  { label: "In Progress", value: "In Progress", color: "#b3d99b" },
  { label: "On Hold", value: "On Hold", color: "#ecde7c" },
];

const CreateJobsiteModal: React.FC<CreateJobsiteModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const removeCategory = (cat: Category) => {
    setSelectedCategories((prev) => prev.filter((c) => c.id !== cat.id));
  };

  const saveChanges = () => {
    if (!name || selectedCategories.length === 0 || !status) {
      setError("Filling all fields is required!");
      return;
    }
    
    onSave({
      name,
      categories: selectedCategories.map((c) => c.id),
      status: status!,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[868px] h-[500px] flex flex-col overflow-hidden">
        <div className="bg-gray-200 flex justify-between items-center px-4 h-12 flex-shrink-0">
          <h2 className="text-lg font-semibold">Title</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          <div className="flex items-start gap-2 text-gray-600 mb-4 text-sm">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white text-xs font-bold">
              i
            </span>
            <p>Please, fill in all fields to add a jobsite.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type the jobsite's name"
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none bg-[#f5f5f7] text-black"
              />
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex-[3]">
                <label className="block font-semibold text-gray-700 mb-1">
                  Category Included
                </label>

                <Listbox
                  multiple
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                >
                  {({ open }) => (
                    <div className="relative">
                      <ListboxButton className="w-full rounded-md border px-3 py-2 text-left text-sm bg-[#f5f5f7] text-[#bcc0c9] relative flex items-center justify-between">
                        Select
                        <span className="text-xl text-black">
                          {open ? "▴" : "▾"}
                        </span>
                      </ListboxButton>

                      <ListboxOptions className="absolute z-20 mt-1 w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 max-h-56 overflow-auto">
                        {categoriesData.map((cat) => {
                          const isSelected = selectedCategories.some(
                            (c) => c.id === cat.id,
                          );
                          return (
                            <ListboxOption key={cat.id} value={cat}>
                              {({ focus }) => (
                                <div
                                  className="flex items-center justify-between px-3 py-2 cursor-pointer text-sm transition-colors"
                                  style={{
                                    backgroundColor: focus
                                      ? cat.color
                                      : isSelected
                                        ? cat.color
                                        : undefined,
                                    color:
                                      focus || isSelected ? "#fff" : "#111",
                                  }}
                                >
                                  <span>{cat.label}</span>
                                  {isSelected && <span>✓</span>}
                                </div>
                              )}
                            </ListboxOption>
                          );
                        })}
                      </ListboxOptions>
                    </div>
                  )}
                </Listbox>

                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCategories.map((cat) => (
                      <div
                        key={cat.id}
                        className="flex items-center gap-2 px-2 py-1 text-xs bg-white"
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-gray-800">{cat.label}</span>
                        <button
                          onClick={() => removeCategory(cat)}
                          className="w-4 h-4 flex items-center justify-center rounded-sm bg-red-500 text-white text-[15px]"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-[2]">
                <label className="block font-semibold text-gray-700 mb-1">
                  Status
                </label>

                <Listbox value={status} onChange={setStatus}>
                  {({ open }) => (
                    <div className="relative">
                      <ListboxButton className="w-full rounded-md border px-3 py-2 text-left text-sm bg-[#f5f5f7] text-[#111] relative flex items-center justify-between">
                        <span className="flex items-center gap-2 text-[#bcc0c9]">
                          {status ? (
                            <>
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: STATUS_OPTIONS.find(
                                    (s) => s.value === status,
                                  )?.color,
                                }}
                              />
                              {status}
                            </>
                          ) : (
                            "Select one"
                          )}
                        </span>

                        <span className="text-xl">{open ? "▴" : "▾"}</span>
                      </ListboxButton>

                      <ListboxOptions className="absolute z-20 mt-1 w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 max-h-56 overflow-auto">
                        {STATUS_OPTIONS.map((s) => (
                          <ListboxOption key={s.label} value={s.label}>
                            {({ focus, selected }) => (
                              <div
                                className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm transition-colors"
                                style={{
                                  backgroundColor: focus ? s.color : undefined,
                                  color: focus ? "#fff" : "#111",
                                }}
                              >
                                {selected && !focus && (
                                  <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: s.color }}
                                  />
                                )}
                                <span>{s.label}</span>
                              </div>
                            )}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  )}
                </Listbox>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center p-4 flex-shrink-0 sticky bottom-0">
          {error && (
            <p className="text-red-500 text-sm font-medium px-4">{error}</p>
          )}

          <div className="flex gap-3 ml-auto">
            <button
              onClick={onClose}
              className="group flex items-center h-9 rounded-lg overflow-hidden bg-[#fe4c4a] hover:bg-[#eb4345] transition-colors shrink-0"
            >
              <span className="px-4 text-white text-sm flex items-center justify-center">
                Cancel Changes
              </span>

              <span className="h-full w-[2px] bg-[#eb4345] group-hover:bg-[#fe4c4a] transition-colors" />

              <span className="px-4 text-white text-lg font-semibold flex items-center justify-center">
                x
              </span>
            </button>

            <button
              onClick={saveChanges}
              className="group flex items-center h-9 rounded-lg overflow-hidden bg-[#71cf48] hover:bg-[#68c142] transition-colors shrink-0"
            >
              <span className="px-4 text-white text-sm flex items-center justify-center">
                Save Changes
              </span>

              <span className="h-full w-[2px] bg-[#68c142] group-hover:bg-[#71cf48] transition-colors" />

              <span className="px-4 text-white text-lg font-semibold flex items-center justify-center">
                ✓
              </span>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CreateJobsiteModal;
