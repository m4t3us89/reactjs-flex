import React, { useRef, useEffect } from 'react'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'
import { useField } from '@unform/core'

export default function Select ({ name, label, ...rest }) {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return []
          }
          return ref.state.value.map(option => option.value)
        } else {
          if (!ref.state.value) {
            return ''
          }
          return ref.state.value.value
        }
      }
    })
  }, [fieldName, registerField, rest.isMulti])
  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix='react-select'
        {...rest}
      />
    </>
  )
}
