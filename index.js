const express = require('express');
const app = express();
const sqlite3 = require('sqlite3')
let con = new sqlite3.Database('./spells.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the spellbook.');
});

con.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the spellbook.');
});
