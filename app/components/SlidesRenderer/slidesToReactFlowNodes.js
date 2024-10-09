import { SLIDE_WIDTH, SLIDE_HEIGHT } from './Slide';
 

const slidesToReactFlowNodes = (initial, slides) => {

    // Push the initial slide's id and the position `{ x: 0, y: 0 }` onto a stack.
    const stack = [{ id: initial, position: { x: 0, y: 0 } }];
    const visited = new Set();
    const nodes = [];
    const edges = [];

    // While that stack is not empty...
    while (stack.length) {
        // Pop the current position and slide id off the stack.
        const { id, position } = stack.pop();

        // Look up the slide data by id.
        const slide_i = slides[id];
        const node = { id, type: 'slide', position, data: slide_i };
 
        // Push a new node onto the nodes array with the current id, position, and slide
        // data.
        nodes.push(node);
        // add the slide's id to a set of visited slides.
        visited.add(id);
 
        // For every direction (left, right, up, down)...
        // Make sure the slide has not already been visited.
        if (slide_i.left && !visited.has(slide_i.left)) {
        // Take the current position and update the x or y coordinate by adding or
        // subtracting `SLIDE_WIDTH` or `SLIDE_HEIGHT` depending on the direction.
            const nextPosition = {
                x: position.x - SLIDE_WIDTH,
                y: position.y,
            }

            // Push the new position and the new slide's id onto a stack.
            stack.push({ id: slide_i.left, position: nextPosition });
            // Push a new edge onto the edges array connecting the current slide to the
            // new slide.
            edges.push({ id: `${id}->${slide_i.left}`, source: id, target: slide_i.left });
        };

        // The logic repeats for all directions
        if (slide_i.right && !visited.has(slide_i.right)) {
            const nextPosition = {
                x: position.x + SLIDE_WIDTH,
                y: position.y,
            }
            stack.push({ id: slide_i.right, position: nextPosition });
            edges.push({ id: `${id}->${slide_i.right}`, source: id, target: slide_i.right });
        };

        if (slide_i.up && !visited.has(slide_i.up)) {
            const nextPosition = {
                x: position.x,
                y: position.y - SLIDE_HEIGHT,
            }
            stack.push({ id: slide_i.up, position: nextPosition });
            edges.push({ id: `${id}->${slide_i.up}`, source: id, target: slide_i.up });
        };

        if (slide_i.down && !visited.has(slide_i.down)) {
            const nextPosition = {
                x: position.x,
                y: position.y + SLIDE_HEIGHT,
            }
            stack.push({ id: slide_i.down, position: nextPosition });
            edges.push({ id: `${id}->${slide_i.down}`, source: id, target: slide_i.down });
        };
    };
 
  return { nodes, edges };
};

export default slidesToReactFlowNodes;