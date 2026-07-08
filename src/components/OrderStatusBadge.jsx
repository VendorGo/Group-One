const statusColors = {
  Pending: 'secondary',
  Accepted: 'primary',
  Rejected: 'danger',
  Packed: 'info',
  'In Transit to Pickup Station': 'warning',
  'Arrived at Pickup Station': 'warning',
  'Ready for Pickup': 'success',
  'Picked Up': 'success',
  Completed: 'success',
  Cancelled: 'dark'
};

const OrderStatusBadge = ({ status }) => (
  <span className={`badge text-bg-${statusColors[status] || 'secondary'}`}>{status}</span>
);

export default OrderStatusBadge;
