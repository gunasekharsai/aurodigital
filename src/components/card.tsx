import { useState } from "react";
import CardBody from "./ui/cardbody";
import CardContainer from "./ui/cardcontainer";
import BounceButton from "./ui/Bouncebutton";

interface MerchCardProps {
  merch: any;
  handleAdd: (merch: any, size: string, customName: string) => void;
}

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};

const MerchCard = ({ merch, handleAdd }: MerchCardProps) => {
  const [expandImage, setExpandImage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [customName, setCustomName] = useState("");

  const expandImg = () => {
    setExpandImage(!expandImage);
  };

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const confirmAdd = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    if (merch.isCustomizable && !customName) {
      alert("Please enter a name for customization.");
      return;
    }
    handleAdd(merch, selectedSize, customName);
    setIsModalOpen(false);
    setSelectedSize("");
    setCustomName("");
    alert("Item added.");
  };

  return (
    <>
      <CardContainer className="rounded-lg w-full border border-black border-opacity-30 shadow-lg backdrop-blur-xl">
        <CardBody>
          <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img
              onClick={expandImg}
              className="object-cover w-full cursor-pointer"
              src={merch.image}
              alt={merch.name}
            />
            <div className="flex justify-between w-full p-2 bg-neutral-800 ">
              <div className="flex flex-col justify-between">
                <div className="text-white text-lg font-medium text-left">
                  {merch.name}
                </div>
                <div className="flex gap-2">
                  {merch.initPrice && (
                    <div className="text-white line-through">
                      {merch.initPrice}/-
                    </div>
                  )}
                  <div className="font-bold text-fuchsia-700">₹{merch.price}/-</div>
                </div>
              </div>
              <BounceButton text="Add to Cart" onClick={handleAddToCart} />
            </div>
          </div>
        </CardBody>
      </CardContainer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-black dark:text-white">Add to Cart</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black dark:text-white">
                Select Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-gray-200 text-black rounded-md p-2"
              >
                <option value="">Choose a size</option>
                {merch.sizes.map((size: any) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {merch.isCustomizable && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black dark:text-white">
                  Custom Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Enter name for customization"
                  className="w-full bg-gray-200 text-black rounded-md p-2"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSelectedSize("");
                setCustomName("");
              }}
              className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmAdd}
              className="px-4 py-2 bg-fuchsia-700 text-white rounded-md hover:bg-fuchsia-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MerchCard;