import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertMessage from '../../components/AlertMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { paymentService } from '../../services/paymentService';
import { orderService } from '../../services/orderService';
import { formatCurrency } from '../../utils/formatCurrency';

const validatePhoneNumber = (phone) => {
  if (!phone || phone.trim() === '') return 'Phone number is required';
  const cleanPhone = phone.replace(/[\s\-()]/g, '');
  if (/^(?:\+?256|0)?7\d{8}$/.test(cleanPhone)) return null;
  return 'Invalid phone format. Use 256701234567 or 0701234567';
};

const validatePin = (pin) => {
  if (!pin || pin.trim() === '') return 'PIN is required';
  const cleanPin = pin.trim();
  if (!/^\d{4,6}$/.test(cleanPin)) return 'PIN must be 4-6 digits';
  return null;
};

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('airtel');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [orderInfo, setOrderInfo] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    if (!orderId) return;

    const initializePayment = async () => {
      setLoading(true);
      setMessage('');

      try {
        const response = await paymentService.initiate(parseInt(orderId, 10));
        const data = response.data;

        if (!data || (!data.orderNumber && !data.order_number && !data.totalAmount && !data.total_amount)) {
          throw new Error('Payment initiation did not return order details.');
        }

        setOrderInfo(data);
        setMessage(data.message || 'Payment details loaded.');
        setMessageType(data.success ? 'success' : 'info');
      } catch (error) {
        try {
          const orderResponse = await orderService.getOrder(orderId);
          setOrderInfo(orderResponse.data);
          setMessage('Unable to initialize payment session. Showing order details instead.');
          setMessageType('warning');
        } catch {
          setMessage('Error loading payment details.');
          setMessageType('danger');
        }
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, [orderId]);

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    setPhoneError(validatePhoneNumber(value) || '');
  };

  const handlePinChange = (event) => {
    const value = event.target.value;
    setPin(value);
    setPinError(validatePin(value) || '');
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    setMessage('');

    const phoneErr = validatePhoneNumber(phoneNumber);
    const pinErr = validatePin(pin);

    setPhoneError(phoneErr || '');
    setPinError(pinErr || '');

    if (phoneErr || pinErr) {
      setMessage('Please fix the errors above before proceeding.');
      setMessageType('danger');
      return;
    }

    setLoading(true);

    try {
      const response = await paymentService.process({
        order_id: parseInt(orderId, 10),
        payment_method: paymentMethod,
        phone_number: phoneNumber,
        pin
      });

      const data = response.data;

      if (data.success) {
        setMessage(`✅ SUCCESS: ${data.message}`);
        setMessageType('success');
        setTimeout(() => navigate('/orders'), 2000);
      } else {
        setMessage(`❌ FAILED: ${data.message}`);
        setMessageType('danger');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setMessage(`❌ Error: ${errorMsg}`);
      setMessageType('danger');
    } finally {
      setLoading(false);
    }
  };

  const orderNumber = orderInfo?.order_number || orderInfo?.order?.order_number || orderInfo?.orderNumber;
  const totalAmount = orderInfo?.total_amount || orderInfo?.order?.total_amount || orderInfo?.totalAmount;

  return (
    <div className="panel p-3" style={{ maxWidth: '560px', margin: '0 auto' }}>
      <h1 className="h3 mb-3">Payment</h1>

      {loading && !orderInfo ? (
        <LoadingSpinner />
      ) : (
        <>
          {orderInfo && (
            <div className="mb-4 p-3 bg-light rounded-2">
              <p className="mb-1"><strong>Order:</strong> {orderNumber}</p>
              <p className="mb-0"><strong>Amount:</strong> {formatCurrency(totalAmount)}</p>
            </div>
          )}

          <AlertMessage type={messageType} message={message} onClose={() => setMessage('')} />

          <form onSubmit={handlePayment}>
            <div className="mb-3">
              <label className="form-label"><strong>Payment Method</strong></label>
              <div className="form-check">
                <input
                  id="airtel"
                  className="form-check-input"
                  type="radio"
                  value="airtel"
                  checked={paymentMethod === 'airtel'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="airtel">Airtel Money</label>
              </div>
              <div className="form-check">
                <input
                  id="mtn"
                  className="form-check-input"
                  type="radio"
                  value="mtn"
                  checked={paymentMethod === 'mtn'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="mtn">MTN Mobile Money</label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label"><strong>Phone Number</strong></label>
              <input
                type="text"
                className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                placeholder="256701234567 or 0701234567"
                value={phoneNumber}
                onChange={handlePhoneChange}
              />
              {phoneError ? (
                <div className="invalid-feedback d-block">{phoneError}</div>
              ) : (
                <small className="text-muted">Format: 256xxxxxxxxx or 0xxxxxxxxx</small>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label"><strong>PIN (4-6 digits)</strong></label>
              <input
                type="password"
                className={`form-control ${pinError ? 'is-invalid' : ''}`}
                placeholder="****"
                maxLength="6"
                value={pin}
                onChange={handlePinChange}
              />
              {pinError ? (
                <div className="invalid-feedback d-block">{pinError}</div>
              ) : (
                <small className="text-muted">For testing: use 1234</small>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-brand w-100"
              disabled={loading || !!phoneError || !!pinError}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
