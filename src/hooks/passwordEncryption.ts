import { env } from "next-runtime-env";
import forge from "node-forge";

/**
 * Encrypts a password using an RSA public key.
 * @param password The plain text password to encrypt.
 * @returns The base64-encoded encrypted password.
 */
export const encryptPassword = (password: string): string => {
  const publicKeyPem = env("NEXT_PUBLIC_LOGIN_PUB_KEY");

  if (typeof publicKeyPem !== "string") {
    throw new Error("Public key is not defined or not a string");
  }

  const rsa = forge.pki.publicKeyFromPem(publicKeyPem);
  const encryptedPassword = rsa.encrypt(password);
  return window.btoa(encryptedPassword);
};
