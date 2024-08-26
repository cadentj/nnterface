export function compile(nodes, edges) {
    const nodesData = []; // Initialize an empty array to store node values
    const edgesData = []; // Initialize an empty array to store edge values

    const unsubscribeNodes = nodes.subscribe(value => {
        nodesData.push(value); // Push each node value into nodesData array
    });

    const unsubscribeEdges = edges.subscribe(value => {
        edgesData.push(value); // Push each edge value into edgesData array
    });

    unsubscribeNodes();
    unsubscribeEdges();

    return { nodesData, edgesData }; // Return both arrays if needed
}