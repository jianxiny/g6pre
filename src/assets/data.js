// each node should have a unique id
export const nodes = [
  {
    id: "1",
    label: "1",
    x: -300,
    y: -300,
    size: 10,
    color: "#ff0000",
    shape: "circle",
    font: {
      size: 10,
      color: "#ffffff",
    },
  },
  {
    id: "2",
    label: "2",
    x: -200,
    y: -200,
    size: 10,
    color: "#ff0000",
    shape: "circle",
    font: {
      size: 10,
      color: "#ffffff",
    },
  },
  {
    id: "3",
    label: "3",
    x: -100,
    y: -100,
    size: 10,
    color: "#ff0000",
    shape: "circle",
    font: {
      size: 10,
      color: "#ffffff",
    },
  },
  {
    id: "4",
    label: "4",
    x: 0,
    y: 0,
    size: 10,
    color: "#ff0000",
    shape: "circle",
    font: {
      size: 10,
      color: "#ffffff",
    },
  },
  {
    id: "5",
    label: "5",
    x: 100,
    y: 100,
    size: 10,
    color: "#ff0000",
    shape: "circle",
    font: {
      size: 10,
      color: "#ffffff",
    },
  },
  {
    id: "6",
    label: "6",
    x: 200,
    y: 200,
    size: 10,
    color: "#ff0000",
    shape: "circle",
    font: {
      size: 10,
      color: "#ffffff",
    },
  },
  {
    id: "7",
    label: "7",
    x: 300,
    y: 300,
    size: 10,
    color: "#ff0000",
    shape: "circle",
    font: {
      size: 10,
      color: "#ffffff",
    },
  },
];

export const edges = [
  {
    source: "1",
    target: "2",
  },
  {
    source: "1",
    target: "3",
  },
  {
    source: "1",
    target: "4",
  },
  {
    source: "1",
    target: "5",
  },
  {
    source: "1",
    target: "6",
  },
  {
    source: "1",
    target: "7",
  },
  {
    source: "2",
    target: "3",
  },
  {
    source: "2",
    target: "4",
  },
  {
    source: "2",
    target: "5",
  },
  {
    source: "2",
    target: "6",
  },
  {
    source: "2",
    target: "7",
  },
  {
    source: "3",
    target: "4",
  },
  {
    source: "3",
    target: "5",
  },
  {
    source: "3",
    target: "6",
  },
  {
    source: "3",
    target: "7",
  },
  {
    source: "4",
    target: "5",
  },
  {
    source: "4",
    target: "6",
  },
  {
    source: "4",
    target: "7",
  },
  {
    source: "5",
    target: "6",
  },
  {
    source: "5",
    target: "7",
  },
  {
    source: "6",
    target: "7",
  },
];

export const data = {
  nodes: nodes,
  edges: edges,
};

// the graph item is just aim to Node and Edge, the main distinct is graph shape
// item property: 1. style can be changed with state, 2. such as type and id  not change with stateoj
// such as hover and click state, but you can also change type22 with graph.updateItem manuallly
