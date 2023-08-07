import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { extname } from "path";
import { STORAGE_PATH } from "./constants.helper";

/**
 * check file extension
 * @param {object} file
 * @param {array} extensions
 * @returns
 */
export const checkExtension = (file, extensions) => {
    // Get the extension of the uploaded file
    const file_extension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);

    // Check if the uploaded file is allowed
    if (!extensions.includes(file_extension)) {
        return false;
    }

    return true;
};

/**
 * check file size
 * @param {object} file
 * @param {number} allowed_file_size // In MB
 */
export const checkMaxFileSize = (file, allowed_file_size) => {
    const mb = file.size / 1000000; // byte / megabyte
    if (mb > allowed_file_size) {
        return false;
    }
    return true;
};

/**
 * upload file
 * @param dir
 * @param file
 * @returns
 */
export const uploadFile = (dir, file) => {
    const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join("");
    const fileName = `${dir}/${randomName}${extname(file.name)}`;

    const storageDirExists = existsSync(STORAGE_PATH);
    if (!storageDirExists) mkdirSync(STORAGE_PATH);

    const exists = existsSync(`${STORAGE_PATH}/${dir}`);
    if (!exists) mkdirSync(`${STORAGE_PATH}/${dir}`);

    writeFileSync(`${STORAGE_PATH}/${fileName}`, file.data);

    return fileName;
};

/**
 * delete file
 * @param {string} file
 * @returns
 */
export const deleteFile = (file) => {
    const path = `./${STORAGE_PATH}/${file}`;
    if (existsSync(path)) {
        unlinkSync(path);
    }
    return true;
};

/**
 * get storage url
 * @param file
 * @returns
 */
export const castToStorage = (file) => {
    return `${process.env.APP_URL}/public/storage/${file}`;
};
