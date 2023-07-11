const API_KEY = 'e01ffe1c66cbb475893aa1494a0e6834';

export async function getCards() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e01ffe1c66cbb475893aa1494a0e6834&page=1`);
        if (!response.ok) {
            throw new Error('Failed to fetch cards.');
        }

        const data = await response.json();
        return data.results; // Обратите внимание, что здесь используется data.results, так как это поле содержит массив фильмов.
    } catch (error) {
        console.error(error);
        return [];
    }
}