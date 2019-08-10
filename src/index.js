import './style.scss';
import Prism from 'prismjs';

( function( wp ) {

    const { addFilter } = wp.hooks;
    const { PlainText } = wp.editor;

    const extendCodeBlock = ( settings ) => {

        if ( settings.name !== "core/code" ) {
            return settings;
        }

        const newSettings = {
            ...settings,
            edit(props) {
                const { content } = props.attributes;
                const { setAttributes } = props;

                return (
                    <div className="pcf--container">
                        {settings.edit(props)}
                        <div className="wp-bloc-code__preview">
                            Preview:
                            <pre className={`language-javascript`}>
                                <code
                                    className={`language-javascript`}
                                    dangerouslySetInnerHTML={
                                        { 
                                            __html: Prism.highlight(props.attributes.content, Prism.languages.javascript),
                                        }   
                                    }
                                >
                                </code>
                            </pre>
                        </div>
                    </div>
                );
            },
            save(props) {
                const { content } = props.attributes;

                return (
                    <pre className={`language-javascript`}>
                        <code
                            className={`language-javascript`}
                            dangerouslySetInnerHTML={
                                { 
                                    __html: Prism.highlight(props.attributes.content, Prism.languages.javascript),
                                }   
                            }
                        >
                        </code>
                    </pre>
                );
            }
        }

        return newSettings;
    }

    addFilter(
        'blocks.registerBlockType',
        'prism-code-filter/code-block',
        extendCodeBlock
    );

} ) ( wp );