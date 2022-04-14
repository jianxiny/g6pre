import G6 from "@antv/g6";

// there is no dom constructor in ShapeBase3
G6.registerNode(
  "dom-node",
  {
    draw: (cfg, group) => {
      return group.addShape("dom", {
        attrs: {
          width: cfg.size[0],
          height: cfg.size[1],
          // 传入 DOM 的 html
          html: `
        <div style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${
          cfg.size[0] - 5
        }px; height: ${cfg.size[1] - 5}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="img" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
          </div>
          <span style="margin:auto; padding:auto; color: #5B8FF9">${
            cfg.label
          }</span>
        </div>
          `,
        },
        draggable: true,
      });
    },
  },
  "single-node"
);

const data = {
  nodes: [
    { id: "node1", x: 50, y: 100 },
    { id: "node2", x: 150, y: 100 },
  ],
  edges: [{ source: "node1", target: "node2" }],
};

export function init() {
  const graph = new G6.Graph({
    container: "gmount",
    width: 500,
    height: 500,
    defaultNode: {
      type: "dom-node",
      size: [120, 40],
    },
    renderer: "svg",
  });
  graph.data(data);
  graph.render();
}
