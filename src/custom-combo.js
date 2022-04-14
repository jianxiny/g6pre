import G6 from "@antv/g6";

G6.registerCombo(
  "cRect",
  {
    drawShape: function drawShape(cfg, group) {
      const self = this;
      // 获取配置中的 Combo 内边距
      cfg.padding = cfg.padding || [50, 20, 20, 20];
      // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
      const style = self.getShapeStyle(cfg);

      console.log("shape style", style);
      console.log({
        attrs: {
          ...style,
          x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,

          y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
          width: style.width,
          height: style.height,
          stroke: "red",
        },
      });
      // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
      const rect = group.addShape("rect", {
        attrs: {
          ...style,
          x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
          y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
          width: style.width,
          height: style.height,
          stroke: "red",
        },
        draggable: true,
        name: "combo-keyShape",
      });
      // 增加右侧圆
      group.addShape("circle", {
        attrs: {
          ...style,
          fill: "#fff",
          opacity: 1,
          // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
          x: cfg.style.width / 2 + cfg.padding[1],
          y: (cfg.padding[2] - cfg.padding[0]) / 2,
          r: 5,
        },
        draggable: true,
        name: "combo-circle-shape",
      });
      return rect;
    },
    // 定义新增的右侧圆的位置更新逻辑
    afterUpdate: function afterUpdate(cfg, combo) {
      console.log("cfg", cfg);
      const group = combo.get("group");
      const circle = group.find(
        (ele) => ele.get("name") === "combo-circle-shape"
      );
      // 更新右侧圆位置
      circle.attr({
        // cfg.style.width 与 cfg.style.heigth 对应 rect Combo 位置说明图中的 innerWdth 与 innerHeight
        x: cfg.style.width / 2 + cfg.padding[1],
        y: (cfg.padding[2] - cfg.padding[0]) / 2,
      });
    },
  },
  "rect"
);

const collapseIcon = (x, y, r) => {
  return [
    ["M", x - r, y],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x - r + 4, y],
    ["L", x - r + 2 * r - 4, y],
  ];
};
const expandIcon = (x, y, r) => {
  return [
    ["M", x - r, y],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x - r + 4, y],
    ["L", x - r + 2 * r - 4, y],
    ["M", x - r + r, y - r + 4],
    ["L", x, y + r - 4],
  ];
};

G6.registerCombo(
  "cCircle",
  {
    drawShape: function draw(cfg, group) {
      const self = this;
      const style = self.getShapeStyle(cfg);
      // 绘制一个 circle 作为 keyShape，与 'circle' Combo 的 keyShape 一致
      const circle = group.addShape("circle", {
        attrs: {
          ...style,
          x: 0,
          y: 0,
          r: style.r,
        },
        draggable: true,
        name: "combo-keyShape",
      });
      // 增加下方 marker
      const marker = group.addShape("marker", {
        attrs: {
          ...style,
          fill: "#fff",
          opacity: 1,
          x: 0,
          y: style.r,
          r: 10,
          symbol: collapseIcon,
        },
        draggable: true,
        name: "combo-marker-shape",
      });

      return circle;
    },
    // 定义新增的下方 marker 的位置更新逻辑
    afterUpdate: function afterUpdate(cfg, combo) {
      const self = this;
      // 获取样式配置，style.r 是加上了 padding 的半径
      // 对应 Circle Combo 位置说明图中的 R    const style = self.getShapeStyle(cfg);
      const group = combo.get("group");
      // 在该 Combo 的图形分组根据 name 找到下方 marker
      const marker = group.find(
        (ele) => ele.get("name") === "combo-marker-shape"
      );
      // 更新 marker
      marker.attr({
        x: 0,
        y: cfg.style.r,
        // 数据中的 collapsed 代表该 Combo 是否是收缩状态，根据该字段更新 symbol
        symbol: cfg.collapsed ? expandIcon : collapseIcon,
      });
    },
  },
  "circle"
);

const data = {
  nodes: [
    { id: "node1", x: 250, y: 200, comboId: "combo1" },
    { id: "node2", x: 300, y: 200, comboId: "combo1" },
  ],
  combos: [
    { id: "combo1", label: "Combo 1", parentId: "combo2" },
    { id: "combo2", label: "Combo 2" },
    { id: "combo3", label: "Combo 3" },
  ],
};

export function init() {
  const graph = new G6.Graph({
    container: "gmount",
    width: 800,
    height: 800,
    // 全局 Combo 配置
    defaultCombo: {
      // 指定 Combo 类型，也可以将 type 写到 combo 数据中
      type: "cCircle",
      labelCfg: {
        refY: 2,
      },
    },
    modes: {
      default: ["collapse-expand-combo"],
    },
  });
  graph.on("combo:click", (e) => {
    if (e.target.get("name") === "combo-marker-shape") {
      // Collapse or expand the combo
      graph.collapseExpandCombo(e.item);

      if (graph.get("layout")) graph.layout();
      // If there is a layout configured on the graph, relayout
      else graph.refreshPositions(); // Refresh positions for items otherwise
    }
  });
  graph.data(data);
  graph.render();
}
