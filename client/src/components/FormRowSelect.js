const FormRowSelect = ({ labelText, name, value, options, handleChange }) => {
  return (
    <div className="form-row">
      {/* htmlFor points to id of the input field it is associated with */}
      {/* this binds the label and select visually and programatically */}
      <label htmlFor="dropdown" className="form-label">
        {labelText}
      </label>
      <select id="dropdown" className="form-select" name={name} value={value} onChange={handleChange}>
        {options.map((el, index) => {
          return (
            <option key={index} value={el}>
              {el}
            </option>
          );
        })}
      </select>
    </div>
  )
}

export default FormRowSelect;