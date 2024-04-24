import * as validator from "class-validator";
import { format } from "date-fns";
const crypto = require("crypto");
const Algorithm = "aes-256-cbc";
import fs, { WriteFileOptions } from "fs";
import MediaFileModel from "@/database/mysql/mediaFile";
import { getKnexInstance } from "@/utils/mysql";

export default class CommonHelper {
  private static db = getKnexInstance;
  static FileModel = new MediaFileModel();

  static ucwords(str: string) {
    return (str + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  }
  static indianFormateAmount(x) {
    return x.toString().split(".")[0].length > 3
      ? x
          .toString()
          .substring(0, x.toString().split(".")[0].length - 3)
          .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
          "," +
          x.toString().substring(x.toString().split(".")[0].length - 3)
      : x.toString();
  }

  static getSuccessResponse(
    res,
    code = 200,
    message = "",
    value = true,
    result = {},
    totalCount = 0
  ) {
    if (code == 200 && value == true) {
      value = true;
    } else {
      value = false;
    }

    const responseBody = {
      message: message,
      status: value,
      data: result,
      count: totalCount,
    };

    res.resBody = responseBody;
    res.status(code).json(responseBody);
  }

  static getResponse(
    res,
    code = 200,
    message = "",
    value = true,
    result = {},
    totalCount = 0
  ) {
    const status = code === 200 && value;

    const responseBody = {
      message,
      status,
      ...result,
      count: totalCount,
    };

    res.resBody = responseBody;
    res.status(code).json(responseBody);
  }

  static commonValidations(data: Object, validatorDate: Object) {
    const errorArray = [];
    if (validatorDate) {
      let specificValidationValue: string | number;
      let min: any, max: any;
      Object.entries(validatorDate).forEach(async ([key, value]) => {
        const validationList = value.split(" | ");
        validationList.forEach((listData: string) => {
          if (listData.indexOf(":") !== -1) {
            const specificValidationList = listData.split(":");
            listData = specificValidationList[0];
            specificValidationValue = specificValidationList[1];
            min = specificValidationValue;
            if (specificValidationList[0] == "min") {
              min = specificValidationList[1];
            } else if (specificValidationList[0] == "max") {
              max = specificValidationList[1];
            }
          }

          switch (listData) {
            case "required":
              if (validator.isEmpty(data[key])) {
                key = key.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2");
                key = key
                  .split(" ")
                  .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
                  .join(" ");
                errorArray.push(key + " is a required field.");
              }
              break;
            case "numeric":
              if (!validator.isNumber(data[key])) {
                errorArray.push(key + " should be numeric - " + data[key]);
              }
              break;
            case "digits":
            case "min":
            case "max":
              if (!validator.isByteLength(String(data[key]), min, max)) {
                errorArray.push(
                  `${key} should be of ${
                    min && max
                      ? "minimum " + min + " and maximum " + max
                      : specificValidationValue
                  } digits - ${data[key]}`
                );
              }
              break;
          }
        });
      });
    }
    return errorArray;
  }

  static async formatBytes(bytes: number) {
    const decimals = 2;
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const fileSize = `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
      sizes[i]
    }`;
    return fileSize;
  }

  static is_valid_mobile_number(mobile_number) {
    const regex = `/^[6789]\d{9}$/`;
    return regex.match(mobile_number);
  }

  static prepareDataForCsv(data: any): string {
    let csvData = "";

    const headers = Object.keys(data[0]);
    const rows = data.map((user: any) => Object.values(user).join(","));

    csvData += headers.join(",") + "\r\n";
    csvData += rows.join("\r\n");

    return csvData;
  }

  static async onlyDigits(s) {
    for (let i = s.length - 1; i >= 0; i--) {
      const d = s.charCodeAt(i);
      if (d < 48 || d > 57) return false;
    }
    return true;
  }

  static parseName(input: string) {
    const [firstName, ...restNames] = (input || "").trim().split(" ");
    const lastName = restNames.pop() || "";
    const middleName = restNames.join(" ");

    return {
      firstName,
      middleName,
      lastName,
    };
  }
  static createUserName(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return "AK" + format(new Date(), "yyyyMMdd") + result;
  }

  static generateSHA256Hash(payload: string): string {
    return crypto.createHash("sha256").update(payload).digest("hex");
  }
}
