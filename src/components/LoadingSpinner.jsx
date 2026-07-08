const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="d-flex align-items-center gap-2 py-4">
    <div className="spinner-border text-brand" role="status" aria-hidden="true" />
    <span>{message}</span>
  </div>
);

export default LoadingSpinner;
