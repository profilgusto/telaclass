import { SLIDE_WIDTH, SLIDE_HEIGHT } from './Slide';

const slidesToReactFlowNodes = (slidesContent) => {

    const nodes = [];
    const edges = [];

    let pos_x_current = 0;
    let pos_y_current = 0;


    slidesContent.forEach( (slideContent, index) => {
        nodes.push({
            id: index.toString(),
            data: {content: slideContent},
            type: 'slide',
            position: { x: pos_x_current, y: pos_y_current }
        });

        edges.push({
            id: `edge-${index}`,
            source: index,
            target: index + 1
        });

        pos_x_current += SLIDE_WIDTH * 1.05;

    });

    return { nodes, edges };
}

export default slidesToReactFlowNodes;