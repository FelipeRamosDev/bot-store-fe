import LoadingButton from '@mui/lab/LoadingButton';

/**
 * `SpinnerButton` is a styled button component that incorporates loading indicators using MUI's `LoadingButton`.
 * It adjusts padding based on the loading state and position of the spinner.
 *
 * @param {Object} props - The props object.
 * @param {boolean} [props.loading=false] - If true, shows a loading spinner within the button.
 * @param {'start' | 'end'} [props.loadingPosition='end'] - The position of the loading spinner relative to the button content. Can be 'start' or 'end'.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the button.
 * @param {Object} [props] - Additional props to be passed to the MUI `LoadingButton` component.
 *
 * @returns {JSX.Element} The rendered `SpinnerButton` component.
 */
export default function SpinnerButton({ loading = false, loadingPosition = 'end', children, ...props}) {
   const style = { padding: '0.89rem 1.5rem' };

   if (loading && loadingPosition === 'start') {
      style.padding = '0.89rem 1.5rem 0.89rem 3rem';
   }
   
   if (loading && loadingPosition === 'end') {
      style.padding = '0.89rem 3rem 0.89rem 1.5rem';
   }

   return (
      <LoadingButton
         loading={loading}
         loadingPosition={loadingPosition}
         variant="contained"
         sx={style}
         {...props}
      >
         <span>{children}</span>
      </LoadingButton>
   );
}
