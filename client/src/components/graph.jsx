import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useState } from 'react';
import '../styles/graph.css';

function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    const row = payload[0].payload;
    return (
        <div className="tooltipStyle">
            <div className="tooltipLabel">{label}</div>
            <div className="tooltipItemStyle">High average : {Number(row.highAverage).toFixed(2)}</div>
            <div className="tooltipItemStyle">Low average : {Number(row.lowAverage).toFixed(2)}</div>
            <div className="tooltipItemStyle">Volume : {Math.round(row.volume).toLocaleString('en-US')}</div>
        </div>
    );
}

export default function Graph({ symbol, data, volume }) {
    const[ volumeView, setVolumeView ] = useState(false);
    return (
        <div className="graph-frame">
            <ul className="links-list">
                <li><em>{symbol}</em></li>
                <li>
                    <button type="button" aria-pressed={!volumeView} onClick={() => setVolumeView(false)}>
                        {volumeView ? 'Low average · High average' : <em>Low average · High average</em>}
                    </button>
                </li>
                <li>
                    <button type="button" aria-pressed={volumeView} onClick={() => setVolumeView(true)}>
                        {volumeView ? <em>Volume</em> : 'Volume'}
                    </button>
                </li>
            </ul>
            {volumeView ? (
            <div className="graph-plot">
                <LineChart
                    style={{ width: '100%', height: '100%' }}
                    responsive
                    data={data}
                    margin={{ top: 12, right: 16, bottom: 8, left: 12 }}
                >
                    <XAxis dataKey="date" minTickGap={24} stroke="#ccc" tick={{ fill: '#888', fontSize: 12 }} />
                    <YAxis domain={['auto', 'auto']} stroke="#ccc" tick={{ fill: '#888', fontSize: 12 }} width={56} />
                    <Tooltip
                        content={ChartTooltip}
                    />
                    <Line type="linear" dataKey="volume" name="Volume" stroke="#171717" strokeWidth={1.5} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
            </div>
            ) : (
                <div className="graph-plot">
                    <LineChart
                        style={{ width: '100%', height: '100%' }}
                        responsive
                        data={data}
                        margin={{ top: 12, right: 16, bottom: 8, left: 12 }}
                    >
                        <XAxis dataKey="date" minTickGap={24} stroke="#ccc" tick={{ fill: '#888', fontSize: 12 }} />
                        <YAxis domain={['auto', 'auto']} stroke="#ccc" tick={{ fill: '#888', fontSize: 12 }} width={56} />
                        <Tooltip
                            content={ChartTooltip}
                        />
                        <Line type="linear" dataKey="highAverage" name="High average" stroke="#171717" strokeWidth={1.5} dot={false} activeDot={{ r: 4 }} />
                        <Line type="linear" dataKey="lowAverage" name="Low average" stroke="#888" strokeWidth={1.5} dot={false} activeDot={{ r: 4 }} />
                    </LineChart>
                </div>
            )}
        </div>
    );
}