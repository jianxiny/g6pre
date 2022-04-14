import G6 from "@antv/g6";
import { data } from "./assets/data";

export function initGraph() {
  const graph = new G6.Graph({
    container: "gmount",
    width: 500,
    height: 500,
    defaultNode: {
      size: [50, 50],
      style: {
        fill: "#DEE9FF",
        stroke: "#5B8FF9",
      },
    },
    defaultEdge: {
      size: 1,
      color: "#e2e2e2",
      style: {
        endArrow: true,
      },
    },
    modes: {
      default: ["drag-canvas", "zoom-canvas", "drag-node"],
    },
  });

  //question: the fit-view is not working

  // normal config: animate modes, defaultNodes, defaultEdges,nodeStateStyles, edgeStateSyles

  /**
   *  Layout: graph layout and tree layout
   */

  // Behavior: the interaction of graph

  /*
   * Animation: the animation of graph, is diveded into two parts:
   * 1. graph global animation, such as graph.updateLayout(cfg)
   * 2. graph item animation, you need custom node and edge
   *
   */

  graph.data(data);
  graph.render();
}
