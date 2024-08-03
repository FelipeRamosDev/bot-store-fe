import LoadingButton from '@mui/lab/LoadingButton';

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
