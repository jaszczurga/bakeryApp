'use client'
import { useState } from 'react';
import { decode } from 'next-auth/jwt';

export default function DecodeJWTPage() {
    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState(null);
    const [error, setError] = useState(null);

    const handleDecode = async () => {
        setError(null); // Clear any previous error
        setDecoded(null); // Clear previous results

        try {
            const result = await decode({
                token: token,
                secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment
            });

            if (result) {
                setDecoded(result);
            } else {
                setError('Invalid token or secret.');
            }
        } catch (err) {
            setError(`Error decoding token: ${err.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Decode JWT</h1>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="token" style={{ display: 'block', marginBottom: '5px' }}>
                    Enter your JWT:
                </label>
                <textarea
                    id="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    rows="5"
                    style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                ></textarea>
            </div>
            <button
                onClick={handleDecode}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                Decode
            </button>
            {decoded && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Decoded Token</h2>
                    <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
                        {JSON.stringify(decoded, null, 2)}
                    </pre>
                </div>
            )}
            {error && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
    );
}
