import { Ripple } from '@nextui-org/ripple';
import { Spinner } from '@nextui-org/spinner';
import { forwardRef } from '@nextui-org/system';

import { useButton, UseButtonProps } from './use-button';

export interface ButtonProps extends UseButtonProps {}

const Button = forwardRef<'button', ButtonProps>((props, ref) => {
  const {
    Component,
    domRef,
    children,
    styles,
    spinnerSize,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
    isIconOnly,
  } = useButton({ ...props, ref });

  return (
    <Component ref={domRef} className={styles} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === 'start' && spinner}
      {isLoading && isIconOnly ? null : children}
      {isLoading && spinnerPlacement === 'end' && spinner}
      {endContent}
      {!disableRipple && <Ripple {...getRippleProps()} />}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
