import React from "react";
import LogoImage from "../../assets/logo.png";

export default function Header() {
  return (
    <div className="px-44 py-6 bg-[#252F3D]">
      <img src={LogoImage} alt="logo" />
    </div>
  );
}
