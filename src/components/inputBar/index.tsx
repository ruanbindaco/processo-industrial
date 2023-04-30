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
      <div className="">
        <label className="" htmlFor="input-nome">
          {label}
        </label>
        <input
          className=""
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
