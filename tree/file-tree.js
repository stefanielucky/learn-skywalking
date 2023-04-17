import G6 from '@antv/g6';

G6.registerEdge(
  'step-line',
  {
    getControlPoints: function getControlPoints(cfg) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      return [
        startPoint,
        {
          x: startPoint.x,
          y: endPoint.y - 30,
        },
        {
          x: startPoint.x + 30,
          y: endPoint.y - 20,
        },
        endPoint,
      ];
    },
  },
  'polyline',
);

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.TreeGraph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  modes: {
    default: [
      'drag-canvas',
      'zoom-canvas',
    ],
  },
  defaultNode: {
    size: 5,
  },
  defaultEdge: {
    style: {
      stroke: '#A3B1BF',
    },
  },
  layout: {
    type: 'indented',
    isHorizontal: true,
    direction: 'LR',
    indent: 30,
    getHeight: function getHeight() {
      return 16;
    },
    getWidth: function getWidth() {
      return 16;
    },
  },
});
const data = {
  label: '1',
  name: 'src',
  children: [
    {
      label: '1-1',
      name: 'behavior',
      children: [
        {
          label: '1-3',
          name: 'graph',
          children: [
            {
              label: '1-3-1',
              name: 'controller',
              children: [],
            },
          ],
        },
        {
          label: '1-5',
          name: 'item',
          children: [],
        },
        {
          label: '1-6',
          name: 'shape',
          children: [
            {
              label: '1-6-2',
              name: 'extend',
              children: [],
            },
          ],
        },
        {
          label: '1-7',
          name: 'util',
          children: [],
        },
      ],
    }
  ],
};

// graph.node((node) => {
//   return {
//     type: 'file-node',
//     label: node.name,
//   };
// });
graph.edge(() => {
  return {
    type: 'step-line',
  };
});

graph.data(data);
graph.render();
graph.fitView();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
