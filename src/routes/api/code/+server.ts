import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const graph = await request.json();

    const response = await fetch('http://localhost:8000/code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            op: "code",
            graph: graph,
        }),
    });
    
    const result = await response.json();
    
    return json(result);
}