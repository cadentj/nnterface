import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const item = await request.json();
    
    const response = await fetch('http://localhost:8000/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    
    const result = await response.json();
    return json(result);
}

export async function GET({ url }) {
    const itemId = url.searchParams.get('id');
    
    const response = await fetch(`http://localhost:8000/items/${itemId}`);
    const item = await response.json();
    
    return json(item);
}
