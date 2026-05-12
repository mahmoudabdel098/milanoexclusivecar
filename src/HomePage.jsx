import React, { useEffect, useState, useRef } from 'react';
import { 
  User, Globe, ChevronDown, ArrowRight, Play, CheckCircle2, 
  MapPin, Phone, Mail, ArrowUpRight, Calendar, Clock, Users, MessageSquare, Send 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setCursorType, scrollY, sectionsRef, handleMagnetMove, handleMagnetLeave, magnetBtnRef, magnetTextRef }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <nav className={`${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-left">
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>About</a>
            <a href="#vehicles" onClick={() => setMobileMenuOpen(false)} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>Vehicles</a>
            <button 
              className="nav-link-btn" 
              onClick={() => navigate('/booking')}
              onMouseEnter={() => setCursorType('hover')} 
              onMouseLeave={() => setCursorType('default')}
            >
              Booking
            </button>
            <a href="#contacts" onClick={() => setMobileMenuOpen(false)} onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>Contacts</a>
          </div>
        </div>
        
        <div className="logo-center">
            <div className="logo-wrap-exclusive" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
              <img src="https://lirp.cdn-website.com/63b9c161/dms3rep/multi/opt/Unknown-1-1920w.png" alt="Logo" />
            </div>
          </div>

        <div className="nav-actions right">
          <div className="lang-selector" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
            <Globe size={16} />
            <span>ENG</span>
            <ChevronDown size={12} />
          </div>
        </div>
      </nav>

      <main className="main-content-wrapper">
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-bg-container">
            <img 
              src="/images/classe_e.png" 
              alt="Mercedes E Class" 
              className="hero-bg" 
              style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.1)` }}
            />
            <div className="hero-gradient-overlay"></div>
          </div>
          
          <div className="section-content hero-layout visible" ref={(el) => (sectionsRef.current[0] = el)}>
            <div className="hero-left">
              <h1 style={{ transform: `translateY(${scrollY * -0.2}px)` }}>Luxury car<br />rental in Italy</h1>
              
              <div className="magnet-wrapper">
                <button 
                  ref={magnetBtnRef}
                  className="btn btn-primary pill magnetic-btn-js"
                  onMouseMove={handleMagnetMove}
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={handleMagnetLeave}
                  onClick={() => navigate('/booking')}
                >
                  <span ref={magnetTextRef}>Rent Now</span>
                </button>
              </div>

            </div>

            <div className="hero-right" style={{ transform: `translateY(${scrollY * -0.1}px)` }}>
              <div 
                className="price-card-top glass" 
                onMouseEnter={() => setCursorType('hover')} 
                onMouseLeave={() => setCursorType('default')}
              >
                <div className="price-info">
                  <span>Premium Fleet</span>
                  <div className="arrow-circle">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                <img src="/images/classe_v.png" alt="Mercedes V Class" className="small-car-img" />
              </div>
              
              <p className="hero-desc">
                Experience the pinnacle of Italian elegance. Our 18 years of expertise ensures a 5-star chauffeur service exclusively with Mercedes-Benz, tailored for high-profile transfers and executive travel.
              </p>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about">
          <div className="section-content about-layout" ref={(el) => (sectionsRef.current[1] = el)}>
            <div className="about-left">
              <div className="reveal-text">
                <span className="section-label">Our Heritage</span>
              </div>
              <h2 className="split-text">Excellence in Every<br />Journey Since 2008</h2>
              <p className="fade-up-text">
                Milano Exclusive Car meets your need for business trips, ceremonies, sport events, and high-end exhibitions in Milan. 
                Our fleet is representative of the highest standards in the industry.
              </p>
              <p className="fade-up-text" style={{ transitionDelay: '0.3s' }}>
                Our car rental service with driver is timely, flexible, and elegant. We ensure a limo and chauffeur service that is accurately executed and exclusively tailored to your specific requirements.
              </p>
            </div>
            
            <div className="about-right-grid">
              <div 
                className="about-main-img parallax-img-container"
                onMouseEnter={() => setCursorType('view')} 
                onMouseLeave={() => setCursorType('default')}
              >
                <img src="/images/classe_e.png" alt="Mercedes E Class" className="parallax-img" />
                <div className="img-overlay"></div>
              </div>
              <div className="about-side">
                <div className="exp-card">
                  <span className="plus">+18</span>
                  <span className="label">Years of Experience</span>
                </div>
                <div 
                  className="about-small-img parallax-img-container" 
                  style={{ transitionDelay: '0.2s' }}
                  onMouseEnter={() => setCursorType('view')} 
                  onMouseLeave={() => setCursorType('default')}
                >
                  <img src="/images/classe_v.png" alt="Mercedes V Class" className="parallax-img" />
                  <div className="img-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Fleet Section */}
        <section id="vehicles">
          <div className="section-content" ref={(el) => (sectionsRef.current[2] = el)}>
            <div className="pricing-header">
              <span className="section-label">Exclusive Fleet</span>
              <h2>Pricing & Services</h2>
              <p className="subtitle">We specialize exclusively in the highest tier of Mercedes-Benz vehicles, ensuring unmatched consistency, elegance, and reliability.</p>
            </div>
            
            <div className="pricing-grid">
              
              {/* Mercedes E Class */}
              <div 
                className="pricing-card glass"
                onMouseEnter={() => setCursorType('hover')} 
                onMouseLeave={() => setCursorType('default')}
              >
                <div className="pricing-img-wrapper">
                  <img src="/images/classe_e.png" alt="Mercedes Classe E" />
                </div>
                <div className="pricing-info">
                  <h3>Mercedes Classe E</h3>
                  <p className="pricing-desc">The epitome of modern luxury sedans. Perfect for executive business travel, airport transfers, and elegant city tours with maximum comfort for up to 3 passengers.</p>
                  
                  <ul className="pricing-list">
                    <li>
                      <span className="service">Malpensa Airport Transfer</span>
                      <div className="dots"></div>
                      <span className="price">€120</span>
                    </li>
                    <li>
                      <span className="service">Linate Airport Transfer</span>
                      <div className="dots"></div>
                      <span className="price">€60</span>
                    </li>
                    <li>
                      <span className="service">Hourly Rate (Min 3h)</span>
                      <div className="dots"></div>
                      <span className="price">€50 / hr</span>
                    </li>
                    <li>
                      <span className="service">Daily Disposition (8h)</span>
                      <div className="dots"></div>
                      <span className="price">€350</span>
                    </li>
                  </ul>
                  
                  <button className="btn btn-primary pill pricing-btn" onClick={() => navigate('/booking')}>Book Classe E</button>
                </div>
              </div>

              {/* Mercedes V Class */}
              <div 
                className="pricing-card glass"
                onMouseEnter={() => setCursorType('hover')} 
                onMouseLeave={() => setCursorType('default')}
              >
                <div className="pricing-img-wrapper">
                  <img src="/images/classe_v.png" alt="Mercedes Classe V" />
                </div>
                <div className="pricing-info">
                  <h3>Mercedes Classe V</h3>
                  <p className="pricing-desc">The ultimate luxury minivan experience. Unrivaled space and sophistication for up to 7 passengers, ideal for roadshows, family travel, and VIP event logistics.</p>
                  
                  <ul className="pricing-list">
                    <li>
                      <span className="service">Malpensa Airport Transfer</span>
                      <div className="dots"></div>
                      <span className="price">€150</span>
                    </li>
                    <li>
                      <span className="service">Linate Airport Transfer</span>
                      <div className="dots"></div>
                      <span className="price">€80</span>
                    </li>
                    <li>
                      <span className="service">Hourly Rate (Min 3h)</span>
                      <div className="dots"></div>
                      <span className="price">€70 / hr</span>
                    </li>
                    <li>
                      <span className="service">Daily Disposition (8h)</span>
                      <div className="dots"></div>
                      <span className="price">€450</span>
                    </li>
                  </ul>
                  
                  <button className="btn btn-primary pill pricing-btn" onClick={() => navigate('/booking')}>Book Classe V</button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Booking CTA Section */}
        <section id="booking-cta" className="cta-full-section">
          <div className="cta-bg-overlay">
            <img src="/images/classe_v.png" alt="Mercedes Interior" className="cta-bg-img" />
            <div className="cta-gradient"></div>
          </div>
          <div className="section-content cta-layout" ref={(el) => (sectionsRef.current[3] = el)}>
            <div className="cta-content">
              <span className="section-label">Ready for Excellence?</span>
              <h2>Experience the Pinnacle<br />of Private Travel</h2>
              <p>Unlock our interactive booking dashboard to calculate your route and secure your Mercedes-Benz chauffeur in seconds.</p>
              
              <button 
                className="btn btn-primary pill cta-btn" 
                onClick={() => navigate('/booking')}
                onMouseEnter={() => setCursorType('hover')} 
                onMouseLeave={() => setCursorType('default')}
              >
                Open Booking Dashboard <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Blog & Newsletter Section */}
        <section id="blog" className="blog-section-compact">
          <div className="section-content" ref={(el) => (sectionsRef.current[4] = el)}>
            <div className="blog-header-inline">
              <div>
                <span className="section-label">Journal</span>
                <h2>Latest Insights</h2>
              </div>
              
              <div className="cta-newsletter-inline">
                <span className="newsletter-title">Subscribe for privileges:</span>
                <div className="newsletter-form-inline">
                  <input type="email" placeholder="Enter your email" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')} />
                  <button className="btn-submit" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>Submit</button>
                </div>
              </div>
            </div>
            
            <div className="blog-slider-premium" onMouseEnter={() => setCursorType('drag')} onMouseLeave={() => setCursorType('default')}>
              <div className="blog-slider-track">
                {[
                  { date: '20 AUG 2023', title: 'The Evolution of Chauffeur Excellence', img: '/images/classe_e.png' },
                  { date: '20 OCT 2023', title: 'Milan: The Global Hub of High-End Events', img: '/images/classe_v.png' },
                  { date: '19 OCT 2023', title: 'Why the V-Class is the Ultimate VIP Minivan', img: '/images/classe_e.png' },
                  { date: '10 NOV 2023', title: 'Navigating Fashion Week in Style', img: '/images/classe_v.png' }
                ].map((post, idx) => (
                  <div 
                    className="blog-card-inline" 
                    key={idx} 
                    style={{ transitionDelay: `${idx * 150}ms` }}
                    onMouseEnter={() => setCursorType('view')} 
                    onMouseLeave={() => setCursorType('drag')}
                  >
                    <div className="blog-img-wrapper">
                      <img src={post.img} alt={post.title} />
                      <div className="blog-arrow">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                    <div className="blog-meta">
                      <span className="date">{post.date}</span>
                      <h4>{post.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <section id="contacts">
          <div className="section-content contacts-layout" ref={(el) => (sectionsRef.current[5] = el)}>
            <div className="contacts-left">
              <span className="section-label">Get in Touch</span>
              <h2>At Your Service</h2>
              <p className="subtitle">Our team is available 24/7 for immediate assistance and bespoke travel arrangements.</p>
              
              <div className="contact-info-grid">
                <div className="contact-item" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
                  <div className="icon-box"><Phone size={24} /></div>
                  <div className="text-box">
                    <span>Direct Line</span>
                    <p>+39 349 240 6924</p>
                  </div>
                </div>
                <div className="contact-item" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
                  <div className="icon-box"><Mail size={24} /></div>
                  <div className="text-box">
                    <span>Email Concierge</span>
                    <p>amorinigiuseppe@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
                  <div className="icon-box"><MapPin size={24} /></div>
                  <div className="text-box">
                    <span>Main Office</span>
                    <p>Via Callicratide 36, Roisan, Aosta</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contacts-right">
              <div className="map-placeholder glass">
                <div className="map-overlay">
                  <div className="location-marker">
                    <div className="ping"></div>
                    <div className="dot"></div>
                  </div>
                  <span className="location-name">Milano Exclusive Car HQ</span>
                </div>
                <div className="map-texture"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (Parallax Reveal Effect via CSS) */}
      <footer className="parallax-footer">
        <div className="footer-top">
          <div className="footer-info">
            <div className="logo-wrap" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
              <img src="https://lirp.cdn-website.com/63b9c161/dms3rep/multi/opt/Unknown-1-1920w.png" alt="Logo" className="logo-img-footer" />
            </div>
            <p className="address">Via Callicratide 36, Roisan, Aosta(AO), 11100<br />Tel: +39 0321 0575190</p>
            <div className="social-links-minimal">
              <a href="#" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}><Youtube size={18} /></a>
              <a href="#" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}><Instagram size={18} /></a>
              <a href="#" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Discover</h5>
            <a href="#about" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>About Us</a>
            <a href="#vehicles" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>Exclusive Fleet</a>
            <a href="#" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>Pricing</a>
            <a href="#" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>Services</a>
          </div>
          
          <div className="footer-col">
            <h5>Information</h5>
            <a href="#" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>Privacy Policy</a>
            <a href="#" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>Cookie Policy</a>
            <a href="#" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>Legal Terms</a>
          </div>

          <div className="footer-col">
            <h5>Concierge</h5>
            <p>Mon - Sun / 24H</p>
            <p className="text-white">+39 349 240 6924</p>
            <p className="text-white">amorinigiuseppe@gmail.com</p>
          </div>
        </div>

        <div className="footer-bottom-minimal">
          <span>&copy; 2026 Milano Exclusive Car. All rights reserved.</span>
          <span>Designed for Excellence</span>
        </div>
      </footer>
    </>
  );
}

const Instagram = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Youtube = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const Menu = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const X = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default HomePage;
