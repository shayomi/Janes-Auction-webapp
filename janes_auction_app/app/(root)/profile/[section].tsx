// pages/profile/[section].tsx
"use client";
import { useSearchParams } from "next/navigation";

const ProfileSection: React.FC = () => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  // Type assertion to ensure `section` is treated as a string
  const sectionName = Array.isArray(section) ? section[0] : section;

  // Function to capitalize the first letter of the section name if it's defined
  const capitalize = (s: string | undefined) => {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div>
      <h1>{capitalize(sectionName)} Section</h1>
      <p>This is the {sectionName} section of the profile page.</p>
      <a href="/profile">Go back to Profile</a>
    </div>
  );
};

export default ProfileSection;
