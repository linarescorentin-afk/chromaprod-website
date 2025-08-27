import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import { Dispatch } from "react";

function SwitchLangButton({
  setIsMenuOpen,
}: {
  setIsMenuOpen?: Dispatch<React.SetStateAction<boolean>>;
}) {
  const { selectedLanguage, setSelectedLanguage } = useIsSelectedLanguage();
  return (
    <div className="text-white font-karla font-light text-sm lg:text-sm uppercase lg:w-3/12 lg:justify-end flex ">
      <button
        className={`underline ${selectedLanguage === "en" ? "font-black" : ""} transition-all duration-200 ease-in-out cursor-pointer hover:scale-105`}
        onClick={() => {
          setSelectedLanguage("en");
          if (setIsMenuOpen) setIsMenuOpen(false);
        }}
      >
        EN
      </button>
      /
      <button
        className={`underline ${selectedLanguage === "fr" ? "font-black" : ""} transition-all duration-200 ease-in-out cursor-pointer hover:scale-105`}
        onClick={() => {
          if (setIsMenuOpen) setIsMenuOpen(false);
          setSelectedLanguage("fr");
        }}
      >
        FR
      </button>
    </div>
  );
}

export default SwitchLangButton;
