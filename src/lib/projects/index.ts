import test from "./test.json"
import lens from "./lens.json"
export const projects: { [key: string]: any } = {
    "test" : test,
    "lens" : lens,
    "new" : {
        nodes: [],
        edges: [],
        viewport: {
            zoom: 1.2,
            x: 250,
            y: 200,
        },
    }
}