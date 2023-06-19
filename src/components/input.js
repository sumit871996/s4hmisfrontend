const Input = (props) => {
  const {
    title,
    type,
    onChange,
    placeholder,
    className,
    value,
    readOnly,
    defaultValue,
  } = props

  return (
    <div style={{ textAlign: 'left' }} className='mb-2 '>
      <label htmlFor={title} style={{ padding: '10px 20px' }}>
        {title}
      </label>
      <input
        id={title}
        onChange={onChange}
        type={type ? type : 'text'}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        className={className ? className : 'form-control'}></input>
    </div>
  )
}

export default Input
