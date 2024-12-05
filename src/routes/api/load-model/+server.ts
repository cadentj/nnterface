import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const modelLoad = await request.json();

    const response = await fetch('http://localhost:8000/load-model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(modelLoad),
    });
    
    const result = await response.json();
    
    return json(result);
}