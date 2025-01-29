"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDirectoryExists = ensureDirectoryExists;
const promises_1 = require("fs/promises");
async function ensureDirectoryExists(directory) {
    try {
        await (0, promises_1.mkdir)(directory, { recursive: true });
    }
    catch (error) {
        if (error instanceof Error &&
            'code' in error &&
            error.code === 'EEXIST') {
            return;
        }
        throw error;
    }
}
//# sourceMappingURL=file-utils.js.map