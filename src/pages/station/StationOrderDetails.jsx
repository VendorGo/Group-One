import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import TrackingTimeline from '../../components/TrackingTimeline';
import { orderService } from '../../services/orderService';
import { trackingService } from '../../services/trackingService';
import { formatCurrency } from '../../utils/formatCurrency';

const StationOrderDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([orderService.getOrder(id), trackingService.getOrderTracking(id)]).then(([orderResponse, trackingResponse]) => {
      setData({ ...orderResponse.data, tracking: trackingResponse.data });
    });
  }, [id]);

  if (!data) return <LoadingSpinner />;

  return (
    <>
      <h1 className="h3">{data.order.order_number}</h1>
      <p><OrderStatusBadge status={data.order.status} /></p>
      <div className="panel p-3 mb-3">
        <p className="mb-1"><strong>Customer:</strong> {data.order.customer_name}</p>
        <p className="mb-1"><strong>Supplier:</strong> {data.order.supplier_name}</p>
        <p className="mb-0"><strong>Total:</strong> {formatCurrency(data.order.total_amount)}</p>
      </div>
      <div className="panel p-4">
        <h2 className="h5">Tracking Notes</h2>
        <TrackingTimeline tracking={data.tracking} />
      </div>
    </>
  );
};

export default StationOrderDetails;
