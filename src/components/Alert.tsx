import React from 'react';

export interface IAlert {
  error: boolean | null;
  message: string;
}

const Alert: React.FC<IAlert> = (props: IAlert) => {
  return (
    <div
      className={`w-full h-fit bg-${
        props.error ? 'red-400' : 'green-600'
      } p-3 rounded-md text-center`}
    >
      <p className="font-medium text-center text-base text-white">
        {props.message}
      </p>
    </div>
  );
};

export default Alert;
