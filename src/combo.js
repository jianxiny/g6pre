import G6 from "@antv/g6";
const data = {
  nodes: [
    {
      id: "node1",
      label: "Node1",
      comboId: "rect_combo",
      x: 200,
      y: 200,
    },
    {
      id: "node2",
      label: "Node 2",
      x: 400,
      y: 200,
    },
  ],
  combos: [
    {
      id: "circle_combo",
      type: "circle",
      label: "Circle",
    },
    {
      id: "rect_combo",
      type: "rect",
      label: "Rect",
      labelCfg: {
        position: "bottom",
        refX: 5,
        refY: -12,
        style: {
          fill: "#fff",
        },
      },
      style: {
        fill: "#fa8c16",
        stroke: "#000",
        lineWidth: 2,
      },
    },
  ],
};

export function init() {
  const graph = new G6.Graph({
    container: "gmount",
    width: 1500,
    height: 300,
    // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
    groupByTypes: false,
    modes: {
      default: ["drag-combo", "collapse-expand-combo", "drag-node"],
    },
  });
  graph.data(data);
  graph.render();
}
