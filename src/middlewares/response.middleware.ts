import { NextFunction, Request } from "express";
import { CustomResponse } from "@/interfaces/response.interface";
import { encrypt } from "@/utils/RSAEncryption";

interface ResponseObject {
  ok: boolean;
  err: any;
  msg?: any;
  data: any;
  code?: number;
}

function encryptionWrapper(data: ResponseObject): string {
  return encrypt(
    JSON.stringify(data),
    "config.rsaKeys.app.publicKey",
    undefined
  );
}

function sendResponse(data: ResponseObject, isEncryption: boolean) {
  return isEncryption ? encryptionWrapper(data) : data;
}

export default (req: Request, res: CustomResponse, next: NextFunction) => {
  let isEncryption = false;

  res.invalid = ({ msg, code }) =>
    res
      .status(200)
      .json(
        sendResponse(
          { ok: false, err: msg || "Invalid Parameters", code, data: null },
          isEncryption
        )
      );

  res.failure = ({ msg, code }) =>
    res.status(200).json(
      sendResponse(
        {
          ok: false,
          err: msg || "Something is wrong! We're looking into it.",
          code,
          data: null,
        },
        isEncryption
      )
    );

  res.unauthorized = ({ msg }) =>
    res
      .status(401)
      .json(
        sendResponse(
          { ok: false, err: msg || "Authentication Failed", data: null },
          isEncryption
        )
      );

  res.success = ({ data = {}, msg = "" }) =>
    res
      .status(200)
      .json(sendResponse({ ok: true, err: null, data, msg }, isEncryption));

  res.sendEncryptedData = ({ data, code = 200 }) =>
    res
      .status(code)
      .send(
        encrypt(JSON.stringify(data), "config.rsaKeys.app.publicKey", undefined)
      );

  next();
};
