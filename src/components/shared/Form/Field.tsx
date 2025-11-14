
import React, { ReactNode, isValidElement } from "react";


type TFieldProps = {
  label?: string;
  htmlFor?: string;
  children: ReactNode;
  error?: any;
  required?: boolean;
};

const Field = ({ label, children, htmlFor, error, required }: TFieldProps) => {
  const id = htmlFor || getChildId(children);

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`dark:text-white text-[16px] ${
            required
              ? 'after:content-["*"] after:ml-0.5 after:text-primary'
              : 'after:contents-["Optional"] after:ml-0.5 after:text-white'
          }`}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <div role="alert" className="text-red-500 text-sm capitalize ">
        {error.message}
        </div>
      )}
    </div>
  );
};

const getChildId = (children: ReactNode): string | undefined => {
  const childrenArray = React.Children.toArray(children);

  for (const child of childrenArray) {
    if (isValidElement(child)) {
      const id = (child.props as { id?: string }).id;
      if (id) return id;
    }
  }

  return undefined;
};

export default Field;