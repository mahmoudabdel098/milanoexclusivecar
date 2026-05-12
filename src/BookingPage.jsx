import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, MapPin, Calendar, Clock, Plane, Info, 
  Users, Briefcase, ChevronRight, Check, Shield, 
  User, Users as UsersIcon, Loader2, Tag, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapRecenter({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [coords, map]);
  return null;
}

const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('first');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [calculating, setCalculating] = useState(false);

  const [routeData, setRouteData] = useState({
    coords: [],
    duration: 'Calculating...',
    distance: '-- km',
    pickupCoords: [45.4642, 9.1900],
    dropoffCoords: null
  });

  const [formData, setFormData] = useState({
    pickup: 'Milano, Italia',
    dropoff: 'Malpensa Airport',
    date: '2026-05-24',
    time: '09:00',
    flight: '',
    booker: 'myself'
  });

  const carClasses = [
    { id: 'business', name: 'Business Class', model: 'Mercedes-Benz E-Class', image: '/images/classe_e.png', passengers: 3, luggage: 2, pricePerKm: 2.5, desc: 'Sophisticated comfort for business travel.' },
    { id: 'first', name: 'First Class', model: 'Mercedes-Benz S-Class', image: '/images/classe_e.png', passengers: 3, luggage: 2, pricePerKm: 3.5, desc: 'The ultimate luxury experience.' },
    { id: 'van', name: 'Business Van', model: 'Mercedes-Benz V-Class', image: '/images/classe_v.png', passengers: 7, luggage: 6, pricePerKm: 3.0, desc: 'Premium space for groups and families.' }
  ];

  const activeClass = carClasses.find(c => c.id === selectedClass);
  const totalPrice = routeData.distance !== '-- km'
    ? Math.max(80, Math.round(parseFloat(routeData.distance) * activeClass.pricePerKm)) 
    : '--';

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateRoute();
    }, 800);
    return () => clearTimeout(timer);
  }, [formData.pickup, formData.dropoff]);

  const calculateRoute = async () => {
    if (!formData.pickup || !formData.dropoff) return;
    setCalculating(true);
    try {
      const pRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.pickup)}`);
      const pData = await pRes.json();
      const dRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.dropoff)}`);
      const dData = await dRes.json();

      if (pData[0] && dData[0]) {
        const pLoc = [parseFloat(pData[0].lat), parseFloat(pData[0].lon)];
        const dLoc = [parseFloat(dData[0].lat), parseFloat(dData[0].lon)];
        const rRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${pLoc[1]},${pLoc[0]};${dLoc[1]},${dLoc[0]}?overview=full&geometries=geojson`);
        const rData = await rRes.json();

        if (rData.routes && rData.routes[0]) {
          const route = rData.routes[0];
          setRouteData({
            coords: route.geometry.coordinates.map(c => [c[1], c[0]]),
            duration: `${Math.round(route.duration / 60)} min`,
            distance: `${(route.distance / 1000).toFixed(1)} km`,
            pickupCoords: pLoc,
            dropoffCoords: dLoc
          });
        }
      }
    } catch (err) { console.error(err); } finally { setCalculating(false); }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      const msg = `*RESERVATION REQUEST*%0A*Model:* ${activeClass.name}%0A*From:* ${formData.pickup}%0A*To:* ${formData.dropoff}%0A*Date:* ${formData.date} ${formData.time}%0A*Price:* €${totalPrice}`;
      setTimeout(() => window.open(`https://wa.me/393492406924?text=${msg}`, '_blank'), 1500);
    }, 2000);
  };

  if (success) {
    return (
      <div className="booking-page-container success-view">
        <div className="success-card glass">
          <div className="success-icon"><Check size={40} /></div>
          <h1>Reservation Sent</h1>
          <p>Your request for the <strong>{activeClass.name}</strong> is being processed.</p>
          <p className="subtext">A concierge will contact you via WhatsApp shortly.</p>
          <button onClick={() => navigate('/')} className="btn-reserve-final">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      {/* MINIMAL HEADER */}
      <header className="booking-header-exclusive">
        <button onClick={() => navigate('/')} className="back-link">
          <ArrowLeft size={18} /> <span>Exit</span>
        </button>
        <div className="logo-center-wrapper">
          <div className="logo-wrap-exclusive">
            <img src="https://lirp.cdn-website.com/63b9c161/dms3rep/multi/opt/Unknown-1-1920w.png" alt="Logo" />
          </div>
        </div>
        <div className="header-actions-exclusive">
          <div className="lang-switch">EN</div>
        </div>
      </header>

      <main className="booking-dashboard-main">
        {/* LEFT SIDE: LARGE MAP */}
        <div className="map-view-hero">
          <MapContainer center={[45.4642, 9.1900]} zoom={13} zoomControl={false} style={{ height: '100%', width: '100%', zIndex: 1 }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
            {routeData.pickupCoords && <Marker position={routeData.pickupCoords} />}
            {routeData.dropoffCoords && <Marker position={routeData.dropoffCoords} />}
            {routeData.coords.length > 0 && <Polyline positions={routeData.coords} color="#ffa239" weight={4} opacity={0.8} />}
            <MapRecenter coords={[routeData.pickupCoords, routeData.dropoffCoords].filter(c => c)} />
          </MapContainer>
          
          <div className="map-vignette"></div>
          
          <div className="map-floating-stats">
            <div className="f-stat"><span>Distance</span><strong>{routeData.distance}</strong></div>
            <div className="f-stat-divider"></div>
            <div className="f-stat"><span>Duration</span><strong>{routeData.duration}</strong></div>
          </div>
        </div>

        {/* RIGHT SIDE: INTERACTIVE PANEL */}
        <div className="booking-panel-exclusive">
          <div className="panel-scroll-area">
            {/* 1. ROUTE ENTRY */}
            <div className="panel-section">
              <span className="section-step">01. Route Details</span>
              <div className="route-input-group">
                <div className="route-line"></div>
                <div className="r-input-row">
                  <div className="r-dot pickup"></div>
                  <div className="r-content">
                    <label>From</label>
                    <input value={formData.pickup} onChange={e => setFormData({...formData, pickup: e.target.value})} placeholder="Pickup address..." />
                  </div>
                </div>
                <div className="r-input-row">
                  <div className="r-dot dropoff"></div>
                  <div className="r-content">
                    <label>To</label>
                    <input value={formData.dropoff} onChange={e => setFormData({...formData, dropoff: e.target.value})} placeholder="Destination..." />
                  </div>
                </div>
              </div>

              <div className="panel-grid-inputs">
                <div className="p-input">
                  <Calendar size={14} />
                  <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="p-input">
                  <Clock size={14} />
                  <input type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                </div>
              </div>
            </div>

            {/* 2. VEHICLE SELECTION */}
            <div className="panel-section last">
              <span className="section-step">02. Choose Vehicle</span>
              <div className="panel-fleet-list">
                {carClasses.map(car => (
                  <div 
                    key={car.id} 
                    className={`p-car-card ${selectedClass === car.id ? 'active' : ''}`}
                    onClick={() => setSelectedClass(car.id)}
                  >
                    <img src={car.image} alt={car.name} />
                    <div className="p-car-info">
                      <h4>{car.name}</h4>
                      <div className="p-car-meta">
                        <span><Users size={12} /> {car.passengers}</span>
                        <span className="p-price">€{Math.max(80, Math.round(parseFloat(routeData.distance || 0) * car.pricePerKm))}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FIXED FOOTER */}
          <div className="panel-footer-exclusive">
            <div className="p-price-summary">
              <div className="p-total-label">Total Amount</div>
              <div className="p-total-amount">€{totalPrice}</div>
            </div>

            <button 
              className={`p-btn-book ${loading || calculating ? 'loading' : ''}`}
              onClick={handleSubmit}
              disabled={loading || calculating}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : `Confirm Reservation`}
            </button>
            <p className="p-secure-note"><Shield size={10} /> Secure WhatsApp Reservation</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
