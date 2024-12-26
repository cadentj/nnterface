import { projects } from "$lib/projects"
import { error } from "@sveltejs/kit"

export function load({ params }) {
    let loadedProject: string = params.project

    if (!projects[loadedProject]) {
        throw error(404, "Project not found")
    }

	let project = projects[loadedProject];

    project.name = params.project;

    return project;
}