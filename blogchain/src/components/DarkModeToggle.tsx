import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { Button } from "./ui/button";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <Button variant="outline" onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </Button>
  );
}
export default DarkModeToggle;
