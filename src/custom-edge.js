import G6 from "@antv/g6";
G6.registerEdge("hvh", {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    console.log("start and end", startPoint, endPoint);
    const shape = group.addShape("path", {
      attrs: {
        stroke: "#333",
        path: [
          ["M", startPoint.x, startPoint.y],
          ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
          ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
          ["L", endPoint.x, endPoint.y],
        ],
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: "path-shape",
    });
    return shape;
  },
  afterDraw(cfg, group) {
    const shape = group.get("children")[0];
    const length = shape.getTotalLength();
    shape.animate(
      (ratio) => {
        const startLen = ratio * length;
        const cfg = {
          lineDash: [startLen, length - startLen],
        };
        return cfg;
      },
      {
        repeat: true,
        duration: 2000,
      }
    );

    const midPoint = shape.getPoint(0.5);
    group.addShape("rect", {
      attrs: {
        width: 10,
        height: 10,
        fill: "#f00",
        // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
        x: midPoint.x - 5,
        y: midPoint.y - 5,
      },
    });
  },
});

const data = {
  nodes: [
    {
      id: "node1",
      x: 100,
      y: 200,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: "node2",
      x: 200,
      y: 100,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: "node3",
      x: 200,
      y: 300,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
  ],
  edges: [
    {
      id: "edge1",
      target: "node2",
      source: "node1",
      type: "hvh",
    },
    {
      id: "edge2",
      target: "node3",
      source: "node1",
      type: "hvh",
    },
  ],
};

export function init() {
  const graph = new G6.Graph({
    container: "gmount",
    width: 1000,
    height: 500,
  });

  graph.data(data);
  graph.render();
}
