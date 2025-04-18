const sqlite = require('better-sqlite3');
const db = new sqlite("./zakat.db");
exports.db = db;