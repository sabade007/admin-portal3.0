import useTokenStore from "@/store/login/useTokenStore";
import decryptValues from "./decryptValue";

interface DecryptedUserData {
  token?: string;
}

// This doesn't use a hook, just directly accesses the store
const { tokenValidCheck, setSessionExpired } = useTokenStore.getState();

const getSession = async (): Promise<boolean> => {
  try {
    const userData: DecryptedUserData | null = await decryptValues(["token"]);

    if (!userData || !userData.token) {
      setSessionExpired(true);
      return false;
    }

    const isValid: boolean = await tokenValidCheck(userData.token);

    if (!isValid) {
      setSessionExpired(true);
      return false;
    }

    return true;
  } catch (err) {
    console.error("getSession error:", err);
    setSessionExpired(true);
    return false;
  }
};

export default getSession;
