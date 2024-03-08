import { useState } from "react";

const useToggle = (initValue) => {
    const [value, setValue] = useState(initValue);

    const toggle = (value) => {
        setValue(prev => {
            return typeof value === 'boolean' ? value : !prev;
        })
    }

    return [value, toggle];

}

export default useToggle