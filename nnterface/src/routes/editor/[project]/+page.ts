import { projects } from "$lib/projects"
import { error } from "@sveltejs/kit"

async function get_model_list() {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/load-model/available`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "repo_id": repoId,
        }),
    });

    const result = await response.json();

}

export function load({ params }) {
    let loadedProject: string = params.project

    if (!projects[loadedProject]) {
        throw error(404, "Project not found")
    }

	return projects[loadedProject];
}