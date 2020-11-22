const express = require('express');
const app = express();
const sqlite3 = require('sqlite3')

app.use(express.json());

let spell = [
    { spell_name: 'Fireball' },
];
app.listen(3000, () => {
    console.log('Spellbook listening at port 3000...')
})
let con = new sqlite3.Database('./spells.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the spellbook.');
});
app.get('/', function (req, res) {
    res.send('Greetings from your friendly spellbook.')
});
app.post('/api/spells', (req, res) => {
    let spell = {
        id: 1,
        spell_name: req.body.spell_name
    };
    spells.push(spells);
    res.send(spell);
});
app.get('/api/spells/1', (req, res) => {
    res.send(spell);
})
con.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the spellbook.');
});
