const FormRow = ({ type, name, value, labelText, handleInput }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">{labelText || name}</label>
            <input type={type} name={name} onChange={handleInput} value={value} className="form-input"/>
        </div>
    );
};

export default FormRow;