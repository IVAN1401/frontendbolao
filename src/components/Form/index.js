import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';


export default function Input({ name }) {
    const inputRed = useRef(null);
const { fieldName, registerField, defaultValue, error } = useField(name);

useEffect(() => {}, []);

    return(
        <input ref={inputRed}/>
    );
}