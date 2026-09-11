import { useState } from 'react';
import Graph from './components/graph';
import getStockData from './api/getStockData';

const App = () => {
    const [symbol, setSymbol] = useState('');
    const [chart, setChart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    async function onSubmit(event) {
        event.preventDefault();
        const next = symbol.trim().toUpperCase();

        if (!next) {
            setChart(null);
            setStatus('Enter a stock symbol.');
            return;
        }

        setLoading(true);
        setStatus(`Looking up ${next}…`);
        setChart(null);

        try {
            const data = await getStockData(next);
            if (data.length === 0) {
                setStatus("No daily averages for that symbol.");
                return;
            }
            setChart({symbol: next, data: data});
            setStatus('');
        } catch {
            setStatus('Could not load averages for that symbol.');
        } finally {
            setLoading(false);
        }

    }
    return (
        <div className="page">
            <h1>Public Stock Averages</h1>
            <form className="lookup" onSubmit={onSubmit}>
                <label>
                    Symbol
                    <input
                        name="symbol"
                        value={symbol}
                        onChange={(event) => setSymbol(event.target.value)}
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="AAPL"
                    />
                </label>
                <button type="submit" disabled={loading}>Look up</button>
                {/* disabled will temporarily disable the button when
                    the ternary evaluates to false*/}
            </form>
            <p className="status" role="status" aria-live="polite">{status}</p>
            {chart && <Graph symbol={chart.symbol} data={chart.data} />}
        </div>
    );
};

export default App;