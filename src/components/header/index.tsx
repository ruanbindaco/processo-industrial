import "./style.css";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useWindowSize } from "../../hooks/useWindowSize";

function Header() {
  const windowType = useWindowSize();
  return <>{windowType !== "mobile" ? <Navbar /> : <Sidebar />}</>;
}

export default Header;
