
import * as React from 'react';

interface TextInputProps {
    type: 'text' | 'number';
    value: string | number;
    min?: number;
    max?: number;
    onChange: (newValue: string | number ) => void;
}

const TextInput: React.SFC<TextInputProps> = (props) => {
    return (
        <input className="text-input" 
            type={ props.type } 
            value={ props.value } 
            onChange={ ev => props.onChange( ev.target.value ) }
            min={ props.min }
            max={ props.max }/>
    );
};

export default TextInput;
