import { useEffect, useState } from "react";

function InputText({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
  disable,
}) {
  const [value, setValue] = useState("");

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };
  
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  // console.log(defaultValue)

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <input
        type={type || "text"}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        className="input  input-bordered w-full "
        disabled={disable}
      />
    </div>
  );
}

export default InputText;
