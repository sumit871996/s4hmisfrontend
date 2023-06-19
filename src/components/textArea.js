const TextArea = (props) => {
  const {
    title,
    lines,
    onChange,
    defaultvalue,
    placeholder,
    className,
    readOnly,
    value,
  } = props
  return (
    <div className='mb-2' style={{ textAlign: 'left' }}>
      <label htmlFor={title} style={{ padding: '10px 20px' }}>
        {title}
      </label>
      <textarea
        id={title}
        rows={lines}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultvalue}
        value={value}
        style={{ resize: 'none' }}
        className='form-control'></textarea>
    </div>
  )
}

export default TextArea
