import { json } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';

export async function POST({ request }) {
    const modelLoad = await request.json();

    const response = await fetch(`${BACKEND_URL}/load-model`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(modelLoad),
    });
    
    const result = await response.json();
    
    return json(result);
}