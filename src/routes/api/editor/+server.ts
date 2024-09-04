import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const graph = await request.json();

    console.log(JSON.stringify(graph));
    
    const response = await fetch('http://localhost:8000/compile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(graph),
    });
    
    const result = await response.json();
    return json(result);
}