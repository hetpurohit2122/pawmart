import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isLoggedIn = !!identity;
  const principal = identity?.getPrincipal() ?? null;

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Login error:", err);
      if (err?.message === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return {
    isLoggedIn,
    login: handleLogin,
    logout: handleLogout,
    principal,
    loginStatus,
  };
}
