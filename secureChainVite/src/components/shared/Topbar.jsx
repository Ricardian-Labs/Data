import React from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="w-full border-b-[#E7ECF1] border-b-[5px]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center h-20">
          <Link to="/">
            <p className="text-4xl text-blue-400">SecureChain</p>
          </Link>
          <p className="text-lg">Account:</p>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
