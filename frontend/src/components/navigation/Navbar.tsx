import React from "react";
import MenuButton from "./Menu";
import MenuButtonAdmin from "./MenuAdmin";
interface NavbarProps {
  role: string;
}
const Navbar: React.FC<NavbarProps> = ({ role }) => {
  return (
    <div className="w-100" style={{ backgroundColor: "black", height: "80px" }}>
      {role === "Admin" ? <MenuButtonAdmin /> : <MenuButton />}
    </div>
  );
};

export default Navbar;
