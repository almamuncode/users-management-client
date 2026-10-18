export async function POST(request: Request) {
    const { name, email } = await request.json();

    if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.trim()) {
        return Response.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    try {
        const response = await fetch('http://localhost:5001/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name.trim(), email: email.trim() }),
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
            return Response.json({ error: 'The server could not add this user. Please try again.' }, { status: response.status });
        }

        return Response.json({ success: true }, { status: 201 });
    } catch {
        return Response.json({ error: 'Cannot reach the users API. Make sure the backend is running on port 5001, then try again.' }, { status: 502 });
    }
}
