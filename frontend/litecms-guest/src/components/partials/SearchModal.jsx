import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const SearchModal = ({ searchModal, setSearchModal }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!searchModal) return;

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        navigate(`/search?q=${encodeURIComponent(input)}`);
        setSearchModal(false);
      }
      if (e.key === "Escape") {
        setSearchModal(false);
      }
    };

    const inputEl = document.getElementById("searchModal");
    inputEl?.focus();

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchModal, input, navigate, setSearchModal]);
  
  return (
    <div className={`search-modal ${searchModal ? "open" : ""}`}>
      <button onClick={() => setSearchModal(false)} className="search-close">
        <IoCloseCircleOutline />
      </button>
      <input
        type="text"
        className="form-input bg-body placeholder:text-base dark:bg-darkmode-body"
        id="searchModal"
        placeholder="Type and hit enter..."
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchModal;
