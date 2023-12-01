"use client";
import { LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar: React.FC = ({}) => {
  const [userPhotoUrl, setUserPhotoUrl] = useState("");

  const session = useSession();

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
    if (session.status == "authenticated") {
      fetchUserPhotoUrl();
    }
  }, [session]);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-200">
      <div className="text-xl font-bold">Moody</div>
      <div className="flex items-center">
        {userPhotoUrl ? (
          <img
            src={userPhotoUrl}
            alt="User Profile"
            className="w-8 h-8 object-fill rounded-full cursor-pointer"
            onClick={() => signOut()}
          />
        ) : (
          <LogIn
            size={24}
            className="cursor-pointer"
            onClick={() => signIn("spotify")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
