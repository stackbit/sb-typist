import * as React from 'react';
import classNames from 'classnames';
import Typist from 'react-typist';
import hash from 'object-hash';

// React-typist doesn't like fragments, custom components and such,
// so return an array of actual simple elements to add. Each should have a unique key.
function makeChildren(elem, i) {
    let children = [];
    if (elem.delayBefore) children.push(<Typist.Delay key={`delaybefore-${i}`} ms={elem.delayBefore} />);

    const baseProps = { key: i, 'data-sb-field-path': `.[${i}]` };
    if (elem.type === 'TypistTextElement') {
        children.push(
            <span {...baseProps}>
                {elem.text}
                {elem.lineBreak ? <br /> : ''}
            </span>
        );
    } else if (elem.type === 'TypistBackspaceElement') {
        children.push(<Typist.Backspace {...baseProps} count={elem.count} />);
    } else {
        throw new Error(`Unknown element: ${elem}`);
    }
    return children;
}

function TerminalWindow(props) {
    // Adapted from https://tailwindcomponents.com/component/terminal
    return (
        <div className="px-32 justify-center">
            <div
                className="coding mt-6 px-3 pt-4 pb-6 shadow-lg text-gray-100 text-lg font-mono
                             bg-gray-800 rounded-lg overflow-hidden"
            >
                <div className="top mb-2 flex">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="ml-2 h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="mt-4 flex">
                    <p className="flex-1 h-28 typing items-center pl-2">{props.children}</p>
                </div>
            </div>
        </div>
    );
}

export default function TypistSection(props) {
    // react-typist component won't re-run by itself once done - even if its children changed.
    // To trigger it on changes to props.elements, the key is based on the elements hash
    // See: https://github.com/jstejada/react-typist/issues/6#issuecomment-458473948
    return (
        <div className={classNames('sb-component', 'sb-component-section', 'sb-typist-section')}>
            <TerminalWindow>
                {props.elements && (
                    <Typist key={hash(props.elements)}>
                        <span data-sb-field-path=".elements">{props.elements.flatMap((elem, i) => makeChildren(elem, i))}</span>
                    </Typist>
                )}
            </TerminalWindow>
        </div>
    );
}
