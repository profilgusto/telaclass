import { SLIDE_WIDTH, SLIDE_HEIGHT } from './Slide';

const slidesToReactFlowNodes = (slidesContent) => {

    const nodes = [];
    const edges = [];

    let pos_x_current = 0;
    let pos_y_current = 0;


    slidesContent.forEach( (slide, index) => {
        nodes.push({
            id: index,
            slideContentData: slide,
            type: 'slide',
            position: { x: pos_x_current, y: pos_y_current }
        });

        edges.push({
            id: `edge-${index}`,
            source: index,
            target: index + 1
        });

        pos_x_current += SLIDE_WIDTH * 1.1;

    });

    console.log('cp0');
    console.log(nodes);
    console.log(edges);

    return { nodes, edges };
}

export default slidesToReactFlowNodes;