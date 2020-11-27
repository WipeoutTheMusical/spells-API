const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');

app.listen(3000, () => {
    console.log('The spellbook is listening at port 3000')
});

app.use(express.json());
let spellArray = [];
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
//This runs the SQL
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

sql = 'SELECT spell_name FROM spell_info WHERE spell_id = ?';
spell_id = 2;
con.get (sql, [spell_id], (err, row) => {
    if (err){
        return console.error(err.message)
    }
    else {
        const spell2 = {
            id: spell_id,
            name: row ? row.spell_name : "Error cannot find spell with that name"
        }
        
        return app.post('/api/spells/2', (req, res) => {
            // TODO: read spell_name parameter from POST request
            // TODO: insert new spell_name into db
            // TODO: construct spell2 object here with new spell_name
            res.send(spell2)
        })
    }
})


con.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closing the spellbook.');
});