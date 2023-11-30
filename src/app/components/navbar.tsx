"use client";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const Navbar: React.FC = ({}) => {
  const [userPhotoUrl, setUserPhotoUrl] = useState("");

  useEffect(() => {
    const fetchUserPhotoUrl = async () => {
      try {
        const response = await fetch("/api/user");
        const { image } = await response.json();
        setUserPhotoUrl(image);
      } catch (error) {
        console.error("Error fetching user photo URL:", error);
      }
    };

    fetchUserPhotoUrl();
  }, []);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-200">
      <div className="text-xl font-bold">Moody</div>
      <div className="flex items-center">
        {userPhotoUrl ? (
          <img
            src={userPhotoUrl}
            alt="User Profile"
            className="w-8 h-8 object-fill rounded-full cursor-pointer"
          />
        ) : (
          <User size={32} className="cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
