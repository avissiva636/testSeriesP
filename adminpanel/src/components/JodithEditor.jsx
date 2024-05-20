import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';


const JodithEditor = ({content, setContent}) => {
    const editor = useRef(null);    

    const config = {
        readonly: false,
        placeholder: 'Start typings...',
        toolbar: true,
        buttons: [
            'bold', 'italic', 'underline', '|',
            'ul', 'ol', '|',
            'outdent', 'indent', '|',
            'link', 'unlink', '|',
            'hr', '|',
            'table', 'fullsize', '|',
        ],
    }

    return (
        <JoditEditor    
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={newContent => setContent(newContent)}
        // onChange={newContent => { setContent(newContent) }}
        />
    );
}

export default JodithEditor