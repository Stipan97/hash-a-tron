import React, { MouseEvent } from 'react';
import eye from '../../assets/eye.png';

export const ShowPassword: React.FC = () => {
  const onClickShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    if (
      event.currentTarget.parentNode?.firstElementChild?.getAttribute(
        'type',
      ) === 'password'
    ) {
      event.currentTarget.parentNode?.firstElementChild?.setAttribute(
        'type',
        'text',
      );
    } else {
      event.currentTarget.parentNode?.firstElementChild?.setAttribute(
        'type',
        'password',
      );
    }
  };

  return (
    <>
      <button onClick={onClickShowPassword}>
        <img src={eye} alt="Show Password" height="14px" />
      </button>
    </>
  );
};
