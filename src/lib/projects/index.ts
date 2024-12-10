import test from "./test.json"
import lens from "./lens.json"
import chat from "./chat.json"
import nodeConnections from "./node-connections.json"
import patching from "./patching.json"
import steering from "./steering.json"

export const projects: { [key: string]: any } = {
    "test" : test,
    "lens" : lens,
    "node-connections" : nodeConnections,
    "steering" : steering,
    "chat" : chat,
    "patching" : patching,
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