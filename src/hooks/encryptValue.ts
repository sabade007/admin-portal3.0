import { env } from "next-runtime-env";
import CryptoJS from "crypto-js";
import { addToast } from "@heroui/react";

type InputData = Record<string, string | number | boolean>;

const encryptValues = async (
  data: InputData
): Promise<Record<string, string> | null> => {
  const encryptionKey = env("NEXT_PUBLIC_ENCRYPTION_KEY");

  if (!encryptionKey) {
    console.error("Encryption key is missing.");
    return null;
  }

  if (!data || typeof data !== "object") {
    console.error(
      "encryptValues: input must be an object with key-value pairs"
    );
    return null;
  }

  const keys = Object.keys(data);
  const invalidKeys: string[] = [];

  // Validate keys before encryption
  for (const key of keys) {
    const value = data[key];
    if (value === null || value === undefined || value === "") {
      invalidKeys.push(key);
    }
  }

  if (invalidKeys.length > 0) {
    invalidKeys.forEach((key) => {
      addToast({
        title: "Missing Value",
        description: `Value for "${key}" is null, undefined, or empty.`,
        color: "danger",
      });
    });

    console.log("Encryption aborted due to invalid values:", invalidKeys);
    return null;
  }

  const encryptedResults: Record<string, string> = {};

  for (const [key, value] of Object.entries(data)) {
    const encryptedValue = CryptoJS.AES.encrypt(
      String(value),
      encryptionKey
    ).toString();
    localStorage.setItem(key, encryptedValue);
    encryptedResults[key] = encryptedValue;
  }

  return encryptedResults;
};

export { encryptValues };
