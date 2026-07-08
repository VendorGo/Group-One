import { formatDate } from '../utils/formatDate';
import OrderStatusBadge from './OrderStatusBadge';

const TrackingTimeline = ({ tracking }) => {
  if (!tracking || tracking.length === 0) {
    return <p className="text-muted">No tracking history yet.</p>;
  }

  return (
    <div className="timeline">
      {tracking.map((entry) => (
        <div className="timeline-entry" key={entry.id}>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <OrderStatusBadge status={entry.status} />
            <strong>{entry.current_location || 'VenderGo'}</strong>
          </div>
          <p className="mb-1">{entry.description}</p>
          <small className="text-muted">
            {formatDate(entry.created_at)} by {entry.updated_by_name || 'System'}
          </small>
        </div>
      ))}
    </div>
  );
};

export default TrackingTimeline;
