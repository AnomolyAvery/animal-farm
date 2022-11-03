import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import Chance from 'chance';

const chance = new Chance();

const animals = [...Array(250).keys()].map((id) => {
    return {
        id,
        type: chance.animal(),
        age: chance.age(),
        name: chance.name(),
    };
});

app.get('/', (req, res) => {
    const q = req.query.q?.toLowerCase() || '';

    const results = animals.filter((animal) =>
        animal.type.toLowerCase().includes(q)
    );

    res.send(results);
});

app.listen(8080, () => {
    console.log('Server started on port 8080');
});
