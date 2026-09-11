import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useState } from 'react';
const tooltipStyle = {
    background: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: 0,
    boxShadow: 'none',
    color: '#171717',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    fontSize: '0.875rem',
    letterSpacing: '0.01em',
};

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
                        contentStyle={tooltipStyle}
                        formatter={(value) => Number(value).toFixed(2)}
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
                            content={<CustomTooltip />}
                        />
                        <Line type="linear" dataKey="highAverage" name="High average" stroke="#171717" strokeWidth={1.5} dot={false} activeDot={{ r: 4 }} />
                        <Line type="linear" dataKey="lowAverage" name="Low average" stroke="#888" strokeWidth={1.5} dot={false} activeDot={{ r: 4 }} />
                    </LineChart>
                </div>
            )}
        </div>
    );
}