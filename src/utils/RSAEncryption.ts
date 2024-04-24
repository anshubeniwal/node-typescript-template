import crypto from "crypto";
import path from "path";
import fs from "fs";

import { writeFileSync } from "fs";
import { generateKeyPairSync } from "crypto";
import { Base64 } from "aws-sdk/clients/ecr";

export function generateKeys() {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  writeFileSync("../private.pem", privateKey);
  writeFileSync("../public.pem", publicKey);
}

function getEncryptedValue(payload: Buffer, publicKey: string) {
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey.toString(),
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    payload
  );
  return encrypted.toString("base64");
}

export function encrypt(
  payload: any,
  publicKey: string | undefined,
  keyPath: string | undefined
): string {
  if (!(publicKey || keyPath)) {
    // return Error('Please provide the private key or the path to the private key');
    return null;
  }

  let key = publicKey
    ? Buffer.from(publicKey, "base64").toString("utf8")
    : null;
  if (!key) {
    const absolutePath = path.resolve(keyPath);
    key = fs.readFileSync(absolutePath, "utf8");
  }

  return getEncryptedValue(Buffer.from(payload, "utf8"), key);
}

function getDecryptedValue(payload: Buffer, privateKey: string) {
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    payload
  );
  return decrypted.toString("utf8");
}

export function decrypt(
  payload: Base64,
  privateKey: Base64 | undefined,
  keyPath: string | undefined
): string {
  if (!(privateKey || keyPath)) {
    // return Error('Please provide the private key or the path to the private key');
    return null;
  }

  let key = privateKey
    ? Buffer.from(privateKey, "base64").toString("utf8")
    : null;
  if (!key) {
    const absolutePath = path.resolve(keyPath);
    key = fs.readFileSync(absolutePath, "utf8");
  }

  return getDecryptedValue(Buffer.from(payload, "base64"), key);
}
