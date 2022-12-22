import Button, { ButtonProps } from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

export type BtnSize = 'small' | 'medium' | 'large' | undefined;
export type BtnVariant = 'text' | 'outlined' | 'contained' | undefined;
export type BtnColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | undefined;
export interface IButtonOwnProps extends ButtonProps {
  children: any;
  loading?: boolean;
}

export type ICustomButtonProps = IButtonOwnProps & ButtonProps;

export default ({
  size = 'small',
  loading,
  children,
  ...rest
}: ICustomButtonProps) => {
  return (
    <Button size={size} {...rest}>
      {loading ? (
        <>
          <CircularProgress
            style={{ padding: 5 }}
            size={size === 'large' ? 35 : 25}
          />{' '}
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
};
