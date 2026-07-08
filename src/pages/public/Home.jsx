import { Link } from 'react-router-dom';
import VenderGoLogo from '../../assets/VenderGoLogo.jpeg';

const Home = () => (
  <div className="home-container">
    {/* Hero Section */}
    <section className="home-hero">
      <div className="row align-items-center g-5">
        <div className="col-lg-5 order-lg-1">
          <img src={VenderGoLogo} alt="VenderGo logo" className="home-hero-logo" />
        </div>
        <div className="col-lg-7 order-lg-2">
          <p className="text-brand fw-semibold mb-3 fs-6">Welcome to VenderGo</p>
          <h1 className="display-4 fw-bold mb-3">Fast, Reliable E-Commerce</h1>
          <p className="lead mb-4">
            Browse supplies, place orders, let suppliers process them, and follow each package through pickup stations until delivery is complete.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link className="btn btn-brand btn-lg" to="/items">Browse Items</Link>
            <Link className="btn btn-outline-brand btn-lg" to="/register">Create Account</Link>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="home-features py-5">
      <h2 className="text-center mb-5 fw-bold">Order Tracking Made Simple</h2>
      <div className="row g-4">
        {[
          { step: 'Pending', desc: 'Your order is received and awaiting processing' },
          { step: 'Packed', desc: 'Supplier has prepared your items' },
          { step: 'In Transit', desc: 'Package is on its way to pickup station' },
          { step: 'Ready for Pickup', desc: 'Your order is ready for collection' }
        ].map((item, index) => (
          <div className="col-md-6 col-lg-3" key={item.step}>
            <div className="feature-card h-100">
              <div className="feature-number">{index + 1}</div>
              <h3 className="feature-title">{item.step}</h3>
              <p className="feature-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Home;
