import G6 from "@antv/g6";

G6.registerNode(
  "cnode",
  (cfg) => `
  <rect style={{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
  }} keyshape="true" name="test" >
    <text style={{ 
			marginTop: 2, 
			marginLeft: 50, 
      textAlign: 'center', 
      fontWeight: 'bold', 
      fill: '#fff' }} 
			name="title">${cfg.label || cfg.id}</text>
    <polygon style={{
      points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
          fill: 'red'
    }} />
        <polyline style={{ points: [[ 30, 30 ], [ 40, 20 ], [ 60, 100 ]] }} />
        <image style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 48, height: 48, marginTop: 100 }} />
  </rect>
`
);

const percentageBar = ({ width, used, height = 12 }) => `
  <rect style={{
    marginLeft: 10,
    marginTop: 3,
    width: ${width},
    height: ${height},
    fill: '#fff',
    stroke: '#1890ff'
  }} name="body" >
    <rect style={{
      marginLeft: 10,
      width: ${(width / 100) * used},
      height: ${height},
      fill: '#1890ff',
      stroke: '#1890ff'
    }}/>
  </rect>
`;

const FULL = "FULL";
const textXML = (cfg) => `
<group>
  <rect style={{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
  }}>
    <text style={{ marginTop: 2, marginLeft: 50, 
			textAlign: 'center',
			fontWeight: 'bold', 
			fill: '#fff' }}>${cfg.id}</text>
  </rect>
  <rect style={{ width: 100, height: 80, fill: 'rgba(24,144,255,0.15)', 
		radius: [0, 0, 6, 6] }} 
		keyshape="true" 
		cursor="move">
    <text style={{marginLeft: 10 ,fill: "red"}}>${FULL}</text>
    <text style={{ marginTop: 5, marginLeft: 10, fill: '#333'}}>${
      cfg.metric
    }: </text>
    <text style={{
      marginTop: 1,
      marginLeft: ${cfg.cpuUsage * 0.8},
      fontSize: 10,
      fill: '#1890ff',
    }}>${cfg.cpuUsage}%</text>
    ${percentageBar({ width: 80, used: cfg.cpuUsage })}
  </rect>
</group>
`;
G6.registerNode("test", {
  jsx: textXML,
});
const nodes = [
  // {
  //   id: "1",
  //   label: "hello",
  //   x: 100,
  //   y: 100,
  //   type: "cnode",
  // },
  {
    id: "2",
    cpuUsage: 90,
    metric: 50,
    type: "test",
  },
];

const data = { nodes: nodes };
export function init() {
  const graph = new G6.Graph({
    container: "gmount",
    width: 1000,
    height: 500,
  });

  graph.data(data);
  graph.render();
}
