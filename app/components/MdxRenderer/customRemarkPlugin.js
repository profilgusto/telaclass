import { visit } from 'unist-util-visit';

const customRemarkPlugin = () => {
    return (tree) => {

        //console.log('tree');
        //console.log(tree);

        visit(tree, 'paragraph', (node, index, parent) => {
            const youtubePattern = /\\youtube\[([a-zA-Z0-9_-]+)\]/g;
            let match;

            while ((match = youtubePattern.exec(node.children[0].value)) !== null) {

                const videoId = match[1];

                console.log(`Match!: ${match[1]}`);
                console.log(node);

                const iframeNode = {
                    type: 'mdxJsxFlowElement',
                    name: 'iframe',
                    attributes: [
                        { type: 'mdxJsxAttribute', name: 'src', value: `https://www.youtube.com/embed/${videoId}` },
                        { type: 'mdxJsxAttribute', name: 'frameBorder', value: '0' },
                        { type: 'mdxJsxAttribute', name: 'allowFullScreen', value: null }
                    ],
                    children: []
                };
                node.children[0] = iframeNode;
            }
        });
    }
}


export default customRemarkPlugin;

