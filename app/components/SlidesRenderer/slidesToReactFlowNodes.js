import { SLIDE_WIDTH, SLIDE_HEIGHT } from './Slide';

const slidesToReactFlowNodes = (slidesContent) => {

    const nodes = [];
    const edges = [];

    let flag_first_slide = true;

    let pos_x_current;
    let pos_y_current;
    let slide_previous_id;
    let slide_next_id;
    

    slidesContent.forEach( (slideContent, index) => {

        // layouting slides position
        if (flag_first_slide) {
            pos_x_current = 0;
            pos_y_current = 0;
            flag_first_slide = false;
        } else {
            if (slideContent.startsWith("##")) {
                pos_y_current += SLIDE_HEIGHT * 1.05;
            } else if (slideContent.startsWith("#")) {
                pos_x_current += SLIDE_WIDTH * 1.2;
                pos_y_current = 0;
            } else {
                const errorMessage = `There was a problem with the slide layouting. Maybe the .mdx file is being splitted uncorretly? Check it out. Each slide content should beging with '#' or '##'.`;
                console.error(errorMessage);
                throw new Error(errorMessage);
            }
        }

        // treating neighbors slides index
        if (index == 0) {
            slide_previous_id = null;
            slide_next_id = (index + 1).toString();
        } else if (index == slidesContent.length - 1) {
            slide_previous_id = (index - 1).toString();
            slide_next_id = null;
        } else {
            slide_previous_id = (index - 1).toString();
            slide_next_id = (index + 1).toString();
        }


        nodes.push({
            id: index.toString(),
            data: {content: slideContent, slide_next_id: slide_next_id, slide_previous_id: slide_previous_id},
            type: 'slide',
            position: { x: pos_x_current, y: pos_y_current }
        });

        edges.push({
            id: `edge-${index}`,
            source: index,
            target: index + 1
        });

    });

    return { nodes, edges };
}

export default slidesToReactFlowNodes;