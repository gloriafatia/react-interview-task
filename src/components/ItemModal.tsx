import React, { useState, useEffect } from "react";
import type { ItemType } from "../types/general";

interface ItemModalProps {
  isOpen: boolean;
  item: ItemType | null;
  availableItems: ItemType[];
  onClose: () => void;
  onSave: (item: ItemType) => void;
}

const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  item,
  availableItems,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    }
  }, [item]);

  if (!formData) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const isItemValid =
    formData.quantity.toString().trim() !== "" &&
    !isNaN(Number(formData.quantity)) &&
    formData.description.trim() !== "";

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[700px] bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[#f5f5f7]">
          <h2 className="text-sm font-medium text-gray-700">
            Edit Item Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-lg font-semibold"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 text-xs text-gray-500">
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white text-xs font-bold">
            i
          </span>
          You can edit the fields below and save changes.
        </div>

        <div className="px-4 py-3 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600">Item</label>

              <div className="relative">
                <select
                  name="item"
                  value={formData.item}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 text-sm border rounded-md outline-none bg-[#f5f5f7] appearance-none pr-10"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <option value="">Select an item</option>

                  {availableItems.map((it: any) => (
                    <option key={it.id} value={it.item}>
                      {it.item}
                    </option>
                  ))}
                </select>

                <span
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-2xl pointer-events-none transform transition-transform ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▾
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="text-xs font-medium text-gray-600"
              >
                Quantity
              </label>

              <input
                id="quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                placeholder="Set Quantity"
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 text-sm border rounded-md outline-none bg-[#f5f5f7]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-xs font-medium text-gray-600"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              placeholder="Type a description..."
              onChange={handleChange}
              rows={3}
              className="w-full mt-1 px-3 py-2 text-sm border rounded-md outline-none resize-none bg-[#f5f5f7]"
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="text-xs font-medium text-gray-600"
            >
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              placeholder="Type a note..."
              rows={3}
              className="w-full mt-1 px-3 py-2 text-sm border rounded-md outline-none resize-none bg-[#f5f5f7]"
            />
          </div>
        </div>

        <div className="flex items-center px-4 py-3">
          {!isItemValid && (
            <p className="text-sm text-red-500 mr-auto ml-4">
              Quantity and Description are required!
            </p>
          )}

          <div className="flex gap-3 ml-auto">
            <button
              onClick={() => {
                if (!isItemValid) return;
                handleSave();
              }}
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

export default ItemModal;
