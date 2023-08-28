import { useState } from "react";

function InputFile({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };
  // console.log(value);

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <input
        type="file"
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.files[0])}
        className="file-input  input-bordered w-full "
      />
    </div>
  );
}

export default InputFile;
