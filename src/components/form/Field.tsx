import React from 'react';

interface FieldProps {
    type: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Field: React.FC<FieldProps> = ({ type, name, label, value, onChange }) => {
    return (
        <div className="relative z-0">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="peer block md:w-[25em] w-[18em] appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=""
                required
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
                {label}
            </label>
        </div>
    );
};

export default Field;