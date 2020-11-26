const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');

app.listen(3000, () => {
    console.log('The spellbook is listening at port 3000')
});

app.use(express.json());
//This just opens a connection to the database in question, for reading
let con = new sqlite3.Database('./spells.db', sqlite3.OPEN_READ, (err) => { 
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the spellbook.');
});
//SQL Query for the name of the spell with given row ID.
    let sql = 'SELECT spell_name FROM spell_info WHERE spell_id = ?';
    let spell_id = 1;

con.get (sql, [spell_id], (err, row) => {
if (err){
    return console.error(err.message)
}
return row
? app.get ('/api/spells/1', (req, res) => {
    res.send(row.spell_name)
})
: console.log('Error: No spell found with that ID')
});
con.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closing the spellbook.');
});