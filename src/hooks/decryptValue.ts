import { env } from "next-runtime-env";
import CryptoJS from "crypto-js";

type DecryptedValues = Record<string, string>;

const decryptValues = async (
  keys: string[]
): Promise<DecryptedValues | null> => {
  const encryptionKey = env("NEXT_PUBLIC_ENCRYPTION_KEY");

  if (!encryptionKey) {
    console.error("Missing encryption key");
    return null;
  }

  if (!Array.isArray(keys)) {
    console.error("decryptValues: input must be an array of keys");
    return null;
  }

  const decryptedResults: DecryptedValues = {};
  let allValid = true;

  for (const key of keys) {
    const value = localStorage.getItem(key);

    if (value !== null && value !== undefined && value !== "") {
      try {
        const decryptedValue = CryptoJS.AES.decrypt(
          value,
          encryptionKey
        ).toString(CryptoJS.enc.Utf8);
        if (decryptedValue === "") {
          allValid = false;
        }
        decryptedResults[key] = decryptedValue;
      } catch (error) {
        console.warn(`Failed to decrypt key "${key}":`, error);
        decryptedResults[key] = "";
        allValid = false;
      }
    } else {
      decryptedResults[key] = "";
      allValid = false;
    }
  }

  if (!allValid) {
    console.log("Missing or invalid localStorage values:", decryptedResults);
    return null;
  }

  return decryptedResults;
};

export default decryptValues;
