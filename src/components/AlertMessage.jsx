const AlertMessage = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type} d-flex justify-content-between align-items-center`} role="alert">
      <span>{message}</span>
      {onClose && (
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
      )}
    </div>
  );
};

export default AlertMessage;
