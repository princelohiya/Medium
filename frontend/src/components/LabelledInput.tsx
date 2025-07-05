interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  type?: string;
}

export const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) => {
  return (
    <div>
      <div className="m-4">
        <label className="ml-1 block mb-0.5 text-sm font-medium text-black">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};
