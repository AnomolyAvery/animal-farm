import { useEffect, useState } from 'react';
import './App.css';

function useAnimalSearch() {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        const lastQuery = localStorage.getItem('lastQuery');
        search(lastQuery);
    }, []);

    const search = async (q) => {
        const response = await fetch(
            'http://localhost:8080?' + new URLSearchParams({ q })
        );

        const data = await response.json();

        setAnimals(data);

        localStorage.setItem('lastQuery', q);
    };

    return {
        animals,
        search,
    };
}

function App() {
    const { search, animals } = useAnimalSearch();

    return (
        <main>
            <h1>Animal farm</h1>

            <input type="text" onChange={(e) => search(e.target.value)} />

            <ul>
                {animals.map((animal) => (
                    <Animal key={animal.id} animal={animal} />
                ))}
                {animals.length === 0 && <p>No animals found</p>}
            </ul>
        </main>
    );
}

function Animal({ animal }) {
    return (
        <li>
            <strong>{animal.type}</strong>
            {animal.age}
        </li>
    );
}

export default App;
