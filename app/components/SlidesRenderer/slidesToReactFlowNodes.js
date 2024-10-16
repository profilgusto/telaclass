import { SLIDE_WIDTH, SLIDE_HEIGHT } from './Slide';

// defined the slides types
const SLIDE_HEADER = 'slide_header';
const SLIDE_REGULAR = 'slide_regular';

const slidesToReactFlowNodes = (slidesContent) => {

    const nodes = [];
    const edges = [];

    let flag_first_slide = true;

    let slide_type;

    let pos_x_current;
    let pos_y_current;

    let slide_previous_id;
    let slide_next_id;    

    slidesContent.forEach( (slideContent, index) => {

        // layouting slides position
        if (flag_first_slide) {
            pos_x_current = 0;
            pos_y_current = 0;
            slide_type = SLIDE_HEADER;
            flag_first_slide = false;
        } else {
            if (slideContent.startsWith("##")) {
                slide_type = SLIDE_REGULAR;
                pos_y_current += SLIDE_HEIGHT * 1.05;
            } else if (slideContent.startsWith("#")) {
                slide_type = SLIDE_HEADER;
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
            data: {content: slideContent, slide_type: slide_type, slide_next_id: slide_next_id, slide_previous_id: slide_previous_id},
            type: 'slide',
            position: { x: pos_x_current, y: pos_y_current }
        });

        edges.push({
            id: `edge-${index}`,
            source: index,
            target: index + 1
        });

    });
    
    // retrieves from nodes the indexes of the slides that are headers
    const headersIndexes = nodes.map( (node, index) => node.data.slide_type == SLIDE_HEADER ? index : null).filter( (index) => index != null);

    // treating the section navigation ids
    nodes.forEach((node, index) => {
        const surroundingIndexes = findSurroundingIndexes(node.id, headersIndexes);
        node.data.section_previous_id = surroundingIndexes.belowIndex ? surroundingIndexes.belowIndex.toString() : null;
        node.data.section_next_id = surroundingIndexes.aboveIndex ? surroundingIndexes.aboveIndex.toString() : null;
    });

    return { nodes, edges };
}

export default slidesToReactFlowNodes;

// TODO Criar uma maneira de inserir vídeos do youtube de forma fácil. Talvez um plugin para o remark. COMO FAZER ISSO? O QUE É REMARK?

// TODO Fazer os slides terem tamanho variável de acordo com o conteúdo? Daí também implementar uma maneira de o ReactFlow ir fazendo zoomfit para as regiões de um slide que tem um tamanho maior que o slide padrão.

function findSurroundingIndexes(valueToTest, indexesValuesArray) {
    let belowIndex = null;
    let aboveIndex = null;

    for (let i = 0; i < indexesValuesArray.length; i++) {
        if (indexesValuesArray[i] < valueToTest) {
            belowIndex = indexesValuesArray[i];
        } else if (indexesValuesArray[i] > valueToTest && aboveIndex === null) {
            aboveIndex = indexesValuesArray[i];
            break;
        }
    }
    return { belowIndex, aboveIndex };
}