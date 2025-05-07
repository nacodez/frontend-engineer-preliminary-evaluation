import { useNavigate } from "react-router-dom";

const TileComponent = ({ children }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-end pb-2">
          {" "}
          <button onClick={handleClose} className=" text-black">
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default TileComponent;
