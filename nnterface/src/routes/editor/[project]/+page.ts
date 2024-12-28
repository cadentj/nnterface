import { projects } from "$lib/projects"
import { error } from "@sveltejs/kit"
import { PUBLIC_BACKEND_URL } from "$env/static/public"


async function ping() {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/ping`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    return result;
}


export async function load({ params }) {
    let loadedProject: string = params.project

    if (!projects[loadedProject]) {
        throw error(404, "Project not found")
    }

    let status = "offline";
    try {
        const result = await ping();
        console.log(result);
        status = result.status;
    } catch (error) {
        console.error(error);
    }

	let project = projects[loadedProject];

    project.name = params.project;

    return { project, status };
}