import "./style.css";

export interface InputBarProps {
  size: string;
  label: string;
  name: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
}

export default function InputBar({
  size = "",
  placeholder = "",
  label = "",
  type = "",
  name = "",
  required = false,
  disabled = false,
  ...rest
}) {
  return (
    <>
      <div className="inputComponent">
        <label className="labelText" htmlFor="input-nome">
          {label}
        </label>
        <input
          style={{ width: `${size}` }}
          placeholder={placeholder}
          type={type}
          name={name}
          {...rest}
          disabled={disabled}
        />
      </div>
    </>
  );
}
