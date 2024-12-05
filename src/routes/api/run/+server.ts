import { json } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';

export async function POST({ request }) {
    const graph = await request.json();

    console.log(JSON.stringify(graph));
    
    const response = await fetch(`${BACKEND_URL}/run`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(graph),
    });
    
    const result = await response.json();
    return json(result);
}