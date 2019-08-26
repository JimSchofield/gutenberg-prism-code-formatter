import './style.scss';
import Prism from '../vendor/prism';

( function( wp ) {

    const { addFilter } = wp.hooks;
    const { PlainText } = wp.editor;
    const { SelectControl } = wp.components;

    const extendCodeBlock = ( settings ) => {

        if ( settings.name !== "core/code" ) {
            return settings;
        }

        const prismLanguagesMap = [
            { label: 'Javascript', value: 'javascript' },
            { label: 'CSS', value: 'css' },
            { label: 'HTML/markup', value: 'markup' },
            { label: 'SCSS', value: 'scss' },
            { label: 'JSON', value: 'json' },
            { label: 'JSX', value: 'jsx' },
            { label: 'TSX', value: 'tsx' },
            { label: 'TypeScript', value: 'ts' },
            { label: 'Rust', value: 'rust' },
            { label: 'Python', value: 'python' },
            { label: 'PHP', value: 'php' },
            { label: 'C++', value: 'cpp'}
        ]

        const newSettings = {
            ...settings,
            supports: {
                ...settings.supports,
                align: true,
            },
            attributes: {
                ...settings.attributes,
                language: {
                    type: 'string',
                    default: 'javascript',
                },
                align: {
                    type: 'string',
                }
            },
            edit(props) {
                const { content, language } = props.attributes;
                const { setAttributes } = props;

                return (
                    <div className="pcf--container">
                        <div className="wp-block-code__options">
                            <SelectControl
                                label="Select language:"
                                value={language}
                                onChange={ language => setAttributes( { language } ) }
                                options={ prismLanguagesMap }
                            />
                        </div>
                        {settings.edit(props)}
                        <div className="wp-block-code__preview">
                            Preview:
                            <pre className={`language-${language}`}>
                                { content &&
                                    <code
                                        className={`language-${language}`}
                                        dangerouslySetInnerHTML={
                                            { 
                                                __html: Prism.highlight( content, Prism.languages[language], language),
                                            }   
                                        }
                                    >
                                    </code>
                                }
                            </pre>
                        </div>
                    </div>
                );
            },
            save(props) {
                const { content, language } = props.attributes;

                return (
                    <pre className={`language-${language}`}>
                        { content &&
                            <code
                                className={`language-${language}`}
                                dangerouslySetInnerHTML={
                                    { 
                                        __html: Prism.highlight( content, Prism.languages[language], language),
                                    }   
                                }
                            >
                            </code>
                        }
                    </pre>
                );
            },
            deprecated: [
                ...( settings.deprecated || [] ),
                {
                    attributes: {
                        ...settings.attributes,
                        language: {
                            type: 'string',
                        },
                    },
    
                    save( props ) {
                        const { language } = props.attributes || 'javascript';

                        return (
                            <pre className={`language-${language}`}>
                                { content &&
                                    <code
                                        className={`language-${language}`}
                                        dangerouslySetInnerHTML={
                                            { 
                                                __html: Prism.highlight( content, Prism.languages[language], language),
                                            }   
                                        }
                                    >
                                    </code>
                                }
                            </pre>
                        );
                    },
                },
            ],
        }

        return newSettings;
    }

    addFilter(
        'blocks.registerBlockType',
        'prism-code-filter/code-block',
        extendCodeBlock
    );

} ) ( wp );
