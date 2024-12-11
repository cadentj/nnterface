import { json } from '@sveltejs/kit';
import { BACKEND_URL } from '$env/static/private';

export async function POST({ request }) {
    const component = await request.json();

    const response = await fetch(`${BACKEND_URL}/add-component`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(component),
    });
    
    const result = await response.json();
    
    return json(result);
}