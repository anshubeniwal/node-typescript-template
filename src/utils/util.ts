import config from "@/config/default";
import reader from "xlsx";
import ExcelJS from "exceljs";
import { logger } from "./logger";

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * @method formatDate
 * @param {string} date
 * @returns yyyy-MM-dd formatted date
 */
export const formatDate = (date: string): string => {
  // edge case
  if (!date) return null;
  if (date.length > 10) date = date.slice(0, 10);
  const arr = date.split("/");
  if (arr.length == 1) return arr[0];
  arr.reverse();
  const newDate = arr.join("-");
  return newDate;
};

/**
 * @method isGoodDate
 * @param {String } dt
 * @returns {Boolean} true & false
 * @description this dt is date format Check ie (DD-MM-YYYY)
 */
export const isGoodDate = (dt: string): boolean => {
  const reGoodDate =
    /^(0?[1-9]|[12][0-9]|3[01])[- /.]((0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$/;
  return reGoodDate.test(dt);
};

/**
 * @method formatDates
 * @param {String } dt
 * @returns {Date} true & false
 * @description dt will be formatted to (YYYY/MM/DD)
 */
export const formatDates = (dt: string): Date => {
  if (dt.includes("-")) {
    return new Date(dt.split("-").reverse().join("/"));
  }
  return new Date(dt.split("/").reverse().join("/"));
};

export const getDataFromFile = (fileParam: any): any[] => {
  const file = reader.read(fileParam.buffer, { type: "buffer" });

  const data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }

  return data;
};

export const convertToNumbers = (objBody: object, paramsArr: string[]) => {
  for (const key in objBody) {
    if (paramsArr.includes(key)) objBody[key] = Number(objBody[key]);
  }
};

export const convertToArray = (objBody: object, paramsArr: string[]) => {
  for (const param of paramsArr) {
    const val = objBody[param];
    if (val && !Array.isArray(val)) {
      try {
        objBody[param] = JSON.parse(val);
      } catch (err) {
        logger.error(err.stack);
      }
    }
  }
};
