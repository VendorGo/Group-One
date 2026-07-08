import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import TrackingTimeline from '../../components/TrackingTimeline';
import { trackingService } from '../../services/trackingService';

const TrackOrder = () => {
  const { id } = useParams();
  const [tracking, setTracking] = useState(null);

  useEffect(() => {
    trackingService.getOrderTracking(id).then((response) => setTracking(response.data));
  }, [id]);

  if (!tracking) return <LoadingSpinner />;

  return (
    <div className="panel p-4">
      <h1 className="h3 mb-3">Track Order</h1>
      <TrackingTimeline tracking={tracking} />
    </div>
  );
};

export default TrackOrder;
