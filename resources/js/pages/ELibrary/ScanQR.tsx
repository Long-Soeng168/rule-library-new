import { router } from '@inertiajs/react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

export default function App() {
    const [result, setResult] = useState([]);
    const [flash, setFlash] = useState(false);
    const [error, setError] = useState(null);

    const handleScan = (detectedCodes) => {
        if (detectedCodes && detectedCodes.length > 0) {
            console.log('Detected codes:', detectedCodes);
            const firstCode = detectedCodes[0];
            const value = firstCode.rawValue;

            setResult(detectedCodes);
            setFlash(true);

            // Flash effect for 1 second
            setTimeout(() => setFlash(false), 1000);

            // If value is a URL, open it
            try {
                const url = new URL(value);
                router.visit('/profile') // opens in a new tab
            } catch {
                console.log('Scanned value is not a URL:', value);
            }
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="mb-4 text-2xl font-semibold">Attendance QR Scanner</h1>

            <div className={`mb-4 w-full max-w-md rounded-xl p-4 shadow-lg transition-all ${flash ? 'bg-green-200' : 'bg-white'}`}>
                <Scanner onScan={handleScan} onError={(error) => setError(error.message || 'Camera error')} />
            </div>

            {result.length > 0 && (
                <div className="w-full max-w-md rounded-xl bg-white p-4 text-center shadow-md">
                    <h2 className="mb-2 text-lg font-semibold">Scanned QR Codes:</h2>
                    {result.map((code, idx) => (
                        <div key={idx}>{`Format: ${code.format}, Value: ${code.rawValue}`}</div>
                    ))}
                </div>
            )}

            {flash && <p className="mt-4 animate-pulse font-bold text-green-600">✅ QR Scanned!</p>}

            {error && <p className="mt-4 font-medium text-red-500">{error}</p>}
        </div>
    );
}
