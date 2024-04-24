import * as crypto from "crypto";
import { config } from "@/config.server";
import * as uuid from "uuid";

export function generateUniqueId(): string {
  return uuid.v1().replace(/-/g, "").substring(0, 16);
}

export function getBase64Payload(payload: string): string {
  return Buffer.from(payload).toString("base64");
}

export function aes256cbcDecryption(
  key: Buffer,
  initVector: Buffer,
  encryptedString: Buffer
): string {
  const aes256Key = crypto.createDecipheriv("aes-256-cbc", key, initVector);
  const aes256DecryptedKey = aes256Key.update(encryptedString);
  return Buffer.concat([aes256DecryptedKey, aes256Key.final()]).toString(
    "utf8"
  );
}

export function generateSHA512Hash(input: Buffer, key: Buffer): Buffer {
  return crypto.createHmac("sha3-512", key).update(input).digest();
}

export function getBase64DecodedValue2(payload: string): Buffer {
  return Buffer.from(payload, "base64");
}

export function getDecryptedValue(base64Data: string): string {
  if (!base64Data) return undefined;
  const input = Buffer.from(base64Data, "base64");
  const base64EncryptionKey1 = getBase64DecodedValue2(
    "config.encryption.encryptionKey1"
  );
  const base64EncryptionKey2 = getBase64DecodedValue2(
    "config.encryption.encryptionKey2"
  );
  const len = input.length;
  const iv = input.slice(0, 16);
  const SHA512Value = input.slice(16, 80);
  const encryptAES256CBCValue = input.slice(80, len);
  const value = aes256cbcDecryption(
    base64EncryptionKey1.slice(0, 32),
    iv,
    encryptAES256CBCValue
  );
  const newSHA512Value = generateSHA512Hash(
    encryptAES256CBCValue,
    base64EncryptionKey2
  );

  if (SHA512Value.toString("hex") === newSHA512Value.toString("hex")) {
    return value;
  } else {
    throw new Error("Data not equal During decryption");
  }
}

export function getEncryptedValue(input: string): string {
  if (!input) return undefined;
  const base64EncryptionKey1 = getBase64DecodedValue2(
    "config.encryption.encryptionKey1"
  );
  const base64EncryptionKey2 = getBase64DecodedValue2(
    "config.encryption.encryptionKey2"
  );
  const uniqueId = Buffer.from(generateUniqueId());
  const encryptAES256CBCValue = aes256cbcEncryption(
    base64EncryptionKey1.slice(0, 32),
    uniqueId,
    Buffer.from(input)
  );

  const SHA512Value = generateSHA512Hash(
    Buffer.from(encryptAES256CBCValue),
    base64EncryptionKey2
  );
  const output = Buffer.concat([uniqueId, SHA512Value, encryptAES256CBCValue]);
  return output.toString("base64");
}

export function aes256cbcEncryption(
  key: Buffer,
  initVector: Buffer,
  value: Buffer
): Buffer {
  const aes256Key = crypto.createCipheriv("aes-256-cbc", key, initVector);
  const aes256EncryptedKey = aes256Key.update(value);
  return Buffer.concat([aes256EncryptedKey, aes256Key.final()]);
}

export function getEncryptedObject(inputObject: Object): Object {
  for (const key in inputObject) {
    inputObject[key] = getEncryptedValue(inputObject[key]?.toString());
  }
  return inputObject;
}

export function getDecryptedObject(inputObject: Object): Object {
  for (const key in inputObject) {
    inputObject[key] = getDecryptedValue(inputObject[key]);
  }
  return inputObject;
}
