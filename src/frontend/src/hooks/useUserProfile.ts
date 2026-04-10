import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

interface UserProfileData {
  displayName: string;
}

const STORAGE_KEY = "petnest_user_profile";

function loadProfile(principalId: string): UserProfileData {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${principalId}`);
    if (raw) return JSON.parse(raw) as UserProfileData;
  } catch {
    /* ignore */
  }
  return { displayName: "" };
}

function saveProfile(principalId: string, data: UserProfileData): void {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${principalId}`, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function useUserProfile() {
  const { principal, isLoggedIn } = useAuth();
  const principalId = principal?.toString() ?? "";
  const [displayName, setDisplayName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (isLoggedIn && principalId) {
      const stored = loadProfile(principalId);
      setDisplayName(stored.displayName);
    } else {
      setDisplayName("");
    }
  }, [isLoggedIn, principalId]);

  const save = async (newName: string) => {
    if (!principalId) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    saveProfile(principalId, { displayName: newName });
    setDisplayName(newName);
    setIsSaving(false);
    setSavedAt(Date.now());
  };

  return { displayName, setDisplayName, save, isSaving, savedAt };
}
