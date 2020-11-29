const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');

app.listen(3000, () => {
    console.log('The server is listening at port 3000')
});

app.use(express.json());
let yesNo = 'n';
//This just opens a connection to the database in question, for reading
let con = new sqlite3.Database('./spells.db', sqlite3.OPEN_READ, (err) => { 
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the Spellbook.');
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
    con.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Closing the Spellbook.');
    });
})

: console.log('Error: No spell found with that ID')
});

app.post('/api/spells/8', (req, res) => {
    con.run('INSERT INTO spell_info(spell_id, spell_name, spell_range, concentration, is_cantrip, bard, cleric, druid, paladin, ranger, sorcerer, warlock, wizard) VALUES(8, "Tashas Caustic Brew", 30, "yes", "no", "no", "no", "no", "no", "no", "yes", "yes", "no")', (err) => {
        if(err) {
            return console.log(err.message);
        }
        else{
        res.send('Tashas Caustic Brew added to the Spellbook.')
            con.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closing the Spellbook.');
            });
        }
    })
});

app.put('/api/spells/5', (req, res) => {
    let updateSpell = 'UPDATE spell_info SET spell_name = ? WHERE spell_id = ?';
    let values = ['Black Tenticles', 5];
    con.run(updateSpell, values, function(err) {
        if (err) {
            return console.log(err.message);
        }
        else {
            res.send('Updated Black Tenticles');
            con.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closing the Spellbook.');
            }); 
        }
    })
});
//Send a DELETE request to the server, deleting the spell that was added earlier.
app.delete('/api/spells/8', (req, res) =>{
    let deleteTashas = 'DELETE FROM spell_info WHERE spell_id = ?';
    let spell_id = 8;
    con.run(deleteTashas, spell_id, function(err){
        if (err){
            return console.error(err.message);
        }

        else{
            res.send('Erased Tashas Caustic Brew from the Spellbook.');
            con.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Closing the spellbook.');
            });
        }
    })
})