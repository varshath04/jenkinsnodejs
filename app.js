const express = require('express');
const app = express();
const port = 3020; // Port to listen on

// Function to generate Fibonacci series up to n terms
function fibonacciSeries(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    let series = [0, 1];
    for (let i = 2; i < n; i++) {
        series.push(series[i - 1] + series[i - 2]);
    }
    return series;
}

// Define the route to get Fibonacci series
app.get('/fibonacci', (req, res) => {
    const n = parseInt(req.query.terms);

    if (isNaN(n) || n <= 0) {
        return res.status(400).send('Please provide a valid number of terms query parameter (e.g., ?terms=10).');
    }

    // Generate the Fibonacci series
    const result = fibonacciSeries(n);

    // Return the result as a response
    res.send(`
        <h1>Fibonacci Series Generator</h1>
        <p>Number of Terms: ${n}</p>
        <p>Fibonacci Series: ${result.join(', ')}</p>
        <p><a href="/">Go back</a></p>
    `);
});

// Define the home route
app.get('/', (req, res) => {
    res.send(`
        <h1>Fibonacci Series Generator</h1>
        <p>Enter the number of terms to generate the Fibonacci series:</p>
        <form action="/fibonacci" method="get">
            <input type="number" name="terms" placeholder="Enter number of terms" required>
            <button type="submit">Generate</button>
        </form>
    `);
});

// Start the server on port 3020
app.listen(port, () => {
    console.log(`Fibonacci series generator app listening at http://localhost:${port}`);
});
