import { useEffect, useState } from "react";

function Select({
  labelTitle,
  labelStyle,
  containerStyle,
  defaultValue,
  updateFormValue,
  updateType,
  options,
}) {
  const [value, setValue] = useState("");

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>

      <select
        className="select select-bordered w-full"
        onChange={(e) => updateInputValue(e.target.value)}
      >
        {options?.map((o, i) =>
          i === 0 ? (
            <option key={i + o} defaultValue={value} value={o}>
              {o}
            </option>
          ) : (
            <option key={1 + o} value={o}>
              {o}
            </option>
          )
        )}
      </select>
    </div>
  );
}

export default Select;
