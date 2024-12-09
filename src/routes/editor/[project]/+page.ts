import { projects } from "$lib/projects"
import { error } from "@sveltejs/kit"

export function load({ params }) {
    let loadedProject: string = params.project

    if (!projects[loadedProject]) {
        throw error(404, "Project not found")
    }

	return projects[loadedProject];
}