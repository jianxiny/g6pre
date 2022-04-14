import G6, { Util } from "@antv/g6";

G6.registerNode("cnode", {
  /**
   * 绘制节点，包含文本
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 图形分组，节点中图形对象的容器
   * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 node.get('keyShape') 可以获取。
   */
  draw(cfg, group) {
    const keyShape = group.addShape("path", {
      attrs: {
        path: this.getPath(cfg), // 获取路径
        stroke: cfg.color, // 获取颜色到描边
      },
      name: "path-shape",
      draggable: true,
    });

    if (cfg.label) {
      const label = group.addShape("text", {
        attrs: {
          x: 0, // 居中
          y: 0,
          textAlign: "center",
          textBaseline: "middle",
          text: cfg.label,
          fill: "#666",
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: "text-shape",
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      });
    }
    return keyShape;
  },
  getPath(cfg) {
    console.log("config", cfg);
    const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
    const width = size[0];
    const height = size[1];
    //  / 1 \
    // 4     2
    //  \ 3 /
    const path = [
      ["M", 0, 0 - height / 2], // 上部顶点
      ["L", width / 2, 0], // 右侧顶点
      ["L", 0, height / 2], // 下部顶点
      ["L", -width / 2, 0], // 左侧顶点
      ["Z"], // 封闭
    ];
    return path;
  },

  update(cfg, node) {
    const group = node.getContainer();
    const shape = group.get("children")[0];

    const style = {
      stroke: cfg.color,
      path: this.getPath(cfg),
    };
    shape.attr(style);
  },
});

G6.registerNode("cnode2", {
  getSize(cfgg) {
    return cfgg.size || [40, 40];
  },
  draw(cfg, group) {
    const size = this.getSize(cfg); // 转换成 [width, height] 的模式
    const color = cfg.color;
    const width = size[0];
    const height = size[1];
    //  / 1 \
    // 4     2
    //  \ 3 /
    const path = [
      ["M", 0, 0 - height / 2], // 上部顶点
      ["L", width / 2, 0], // 右侧顶点
      ["L", 0, height / 2], // 下部顶点
      ["L", -width / 2, 0], // 左侧顶点
      ["Z"], // 封闭
    ];
    const style = {
      ...{
        path: path,
        stroke: color,
      },
      ...cfg.style,
    };
    // 增加一个 path 图形作为 keyShape
    const keyShape = group.addShape("path", {
      attrs: {
        ...style,
      },
      draggable: true,
      name: "diamond-keyShape",
    });
    // 返回 keyShape
    return keyShape;
  },
});

G6.registerNode(
  "inner-animate",
  {
    afterDraw(cfg, group) {
      const size = cfg.size;
      console.log("size", size);
      const width = size[0] - 14;
      const height = size[1] - 14;
      // 添加图片
      const image = group.addShape("image", {
        attrs: {
          x: -width / 2,
          y: -height / 2,
          width: width,
          height: height,
          img: cfg.img,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: "image-shape",
      });
      image.animate(
        (ratio) => {
          const matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          const toMatrix = Util.transform(matrix, [["r", ratio * Math.PI * 2]]);
          return {
            matrix: toMatrix,
          };
        },
        {
          repeat: true,
          duration: 3000,
          easing: "easeCubic",
        }
      );
    },
  },
  // 继承了 rect 节点
  "rect"
);

G6.registerNode(
  "cnode3",
  {
    // 响应状态变化
    setState(name, value, item) {
      console.log("item", item);
      const group = item.getContainer();
      const shape = group.get("children")[0]; // 顺序根据 draw 时确定
      if (name === "selected") {
        if (value) {
          shape.attr("fill", "red");
        } else {
          shape.attr("fill", "white");
        }
      }
    },
  },
  "rect"
);

export const data = {
  nodes: [
    { id: "node1", x: 50, y: 100, type: "cnode", color: "blue" }, // 最简单的
    {
      id: "node2",
      x: 150,
      y: 100,
      type: "cnode",
      size: [50, 100],
      color: "blue",
      label: "ok",
    }, // 添加宽高
    { id: "node3", x: 250, y: 100, color: "red", type: "cnode" }, // 添加颜色
    {
      id: "node4",
      x: 350,
      y: 100,
      label: "菱形",
      type: "cnode2",
      color: "red",
    }, // 附加文本
    {
      id: "node5",
      x: 500,
      y: 100,
      size: [100, 100],
      type: "inner-animate",
      color: "red",
      img: "https://picsum.photos/seed/picsum/200/300",
    }, // 附加文本
    {
      id: "node6",
      x: 700,
      y: 100,
      size: [100, 100],
      type: "cnode3",
      color: "red",
    },
  ],
};

export function init() {
  const graph = new G6.Graph({
    container: "gmount",
    width: 1000,
    height: 500,
  });
  graph.on("node:click", (evt) => {
    const { item } = evt;
    graph.setItemState(item, "selected", !item.hasState("selected"));
  });
  graph.data(data);
  graph.render();
}
