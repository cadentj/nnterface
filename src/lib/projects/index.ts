import test from "./test.json"
import lens from "./lens.json"
import nodeConnections from "./node-connections.json"

export const projects: { [key: string]: any } = {
    "test" : test,
    "lens" : lens,
    "node-connections" : nodeConnections,
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