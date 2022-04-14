## core concept

Graph: initial and render
Shape: key shape, group, transform
Graph item: Node(build in, custom, and anchorPoints)
: Edge:( build-in, custom )
: Combo(build-in, custom, build and split combo)
: Advance Style(item background...)
: Advance Operation(update node and edge style, z-index justify, visible, lock and unlock)

Layout: build-in and custom
interaction: event listenser, build-in, custom, and Mode manager,
Animation: ...
Graph Algorithm: ...
Plugin: ...

### Graph

in G6 is the combination of Objects and Relations, and the vehicle is Graph object
**lifecicly of Graph**: initial, load data, render, update, and destory

### Graph item

node, edge, and combo contained.
every item combinated with one or more `Shape`, and must have one `keyShape`

#### The Common

**style**: style filed such as fill and stoke, can changed with state
**id, type**: update with graph.updateItem, not changed in state,

the item has some method for updating, destory and get and update attrs, you can also change item instance by call graph methods

### Shape

for shape such as cicle ,rect, and path.
keyshape used for interaction detect, and style with state

#### key shape

returned with draw and drawShape method, has two main feature:
**response to style**
**bounding box**

lifecycle: init, update and operate(add state such as selected, active), destory,
: draw(cfg, group), update(cfg, n), setState(name, value, item)

#### build-in shape

cicle, rect, ellipse, polygon, fan, image, marker, path, text, dom(svg)

### Group

aim at the graph's shape

### Edge, Combo

### Notes

What about shape animate
