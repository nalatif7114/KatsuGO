import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '' })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode))
    }
  }, [])

  // Save dark mode preference and apply class
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    showToast(darkMode ? 'Mode terang diaktifkan' : 'Mode gelap diaktifkan')
  }

  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="navbar-logo">
            <div className="logo-icon">🍱</div>
            Katsu<span>Go</span>
          </a>
          <ul className="navbar-links">
            <li><a href="#cara-kerja" onClick={(e) => { e.preventDefault(); scrollToSection('cara-kerja') }}>Cara Kerja</a></li>
            <li><a href="#untuk-penjual" onClick={(e) => { e.preventDefault(); scrollToSection('untuk-penjual') }}>Untuk Penjual</a></li>
            <li>
              <button className="btn btn-outline btn-sm dark-mode-toggle" onClick={toggleDarkMode}>
                {darkMode ? '☀️' : '🌙'}
              </button>
            </li>
            <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero') }} className="btn btn-primary btn-sm">Pesan Sekarang</a></li>
          </ul>
          <button className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu open">
            <a href="#cara-kerja" onClick={(e) => { e.preventDefault(); scrollToSection('cara-kerja') }}>Cara Kerja</a>
            <a href="#untuk-penjual" onClick={(e) => { e.preventDefault(); scrollToSection('untuk-penjual') }}>Untuk Penjual</a>
            <button className="btn btn-outline btn-sm" onClick={toggleDarkMode} style={{width: '100%', marginTop: '10px'}}>
              {darkMode ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="particles">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="particle" style={{ top: `${20 + i * 15}%`, left: `${10 + i * 20}%`, animationDelay: `${i}s` }} />
          ))}
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">Self-Ordering Kantin Amikom</div>
            <h1>Laper, Tapi <span className="highlight">Antre Panjang</span> di Kantin?</h1>
            <p>Jam istirahat singkat, tapi habis buat berdiri dan nunggu pesanan.</p>
            <p className="hero-subtitle">KatsuGo memungkinkan kamu pesan langsung dari meja lewat QR code. Tanpa antre. Tanpa salah catat.</p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-lg" onClick={() => alert('Fitur pemesanan akan segera hadir!')}>
                Pesan dari Meja Sekarang
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => scrollToSection('cara-kerja')}>
                Lihat Cara Kerjanya
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z"/></svg>
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-phone">
                <div className="phone-screen">
                  <div className="qr-display">
                    <div className="qr-logo">Katsu<span style={{color: 'var(--orange)'}}>Go</span></div>
                    <div className="qr-code-placeholder">
                      <svg viewBox="0 0 100 100" fill="none">
                        <rect x="5" y="5" width="25" height="25" rx="3" fill="#1A1D2E"/>
                        <rect x="8" y="8" width="19" height="19" rx="2" fill="white"/>
                        <rect x="11" y="11" width="13" height="13" rx="1" fill="#1A1D2E"/>
                        <rect x="70" y="5" width="25" height="25" rx="3" fill="#1A1D2E"/>
                        <rect x="73" y="8" width="19" height="19" rx="2" fill="white"/>
                        <rect x="76" y="11" width="13" height="13" rx="1" fill="#1A1D2E"/>
                        <rect x="5" y="70" width="25" height="25" rx="3" fill="#1A1D2E"/>
                        <rect x="8" y="73" width="19" height="19" rx="2" fill="white"/>
                        <rect x="11" y="76" width="13" height="13" rx="1" fill="#1A1D2E"/>
                      </svg>
                    </div>
                    <div className="qr-text">SCAN UNTUK<br/>PESAN DI SINI</div>
                  </div>
                </div>
              </div>
              <div className="hero-qr-stand">
                <div className="stand-label">A-12</div>
                <div className="mini-qr">
                  <svg viewBox="0 0 100 100" width="80" height="80" fill="none">
                    <rect x="5" y="5" width="25" height="25" rx="3" fill="#1A1D2E"/>
                    <rect x="70" y="5" width="25" height="25" rx="3" fill="#1A1D2E"/>
                    <rect x="5" y="70" width="25" height="25" rx="3" fill="#1A1D2E"/>
                  </svg>
                </div>
                <div className="stand-info"><strong>KatsuGo</strong>Pesan dari meja,<br/>nikmati tanpa lama!</div>
              </div>
              <div className="floating-badge badge-1">
                <div className="badge-icon">✅</div>
                <div><div style={{fontWeight: 700, fontSize: '0.85rem'}}>Tanpa Antre!</div><div style={{fontSize: '0.7rem', color: 'var(--gray-500)'}}>Hemat 30 menit</div></div>
              </div>
              <div className="floating-badge badge-2">
                <div className="badge-icon">⚡</div>
                <div><div style={{fontWeight: 700, fontSize: '0.85rem'}}>Pesanan Akurat</div><div style={{fontSize: '0.7rem', color: 'var(--gray-500)'}}>0% kesalahan</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Old Habits */}
      <section className="old-habits">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">😓 Masalah Lama</div>
            <h2 className="section-title">Kebiasaan Lama yang Melelahkan</h2>
            <p className="section-subtitle">Sudah saatnya tinggalkan cara lama yang bikin capek dan buang waktu.</p>
          </div>
          <div className="habits-grid">
            {[
              { icon: '⏰', title: 'Waktu Istirahat kebuang buat Antre', desc: 'Jam istirahat yang seharusnya untuk refreshing malah habis berdiri di antrean panjang.' },
              { icon: '😰', title: 'Pesanan bisa salah atau kelupaan', desc: 'Kasir yang sibuk sering salah catat pesanan, dan pesananmu bisa kelupaan.' },
              { icon: '😫', title: 'Penjual stres, pembeli emosi', desc: 'Kasir kewalahan, pembeli semakin frustrasi menunggu. Semua sama-sama capek.' }
            ].map((habit, idx) => (
              <div key={idx} className={`habit-card animate-on-scroll delay-${idx + 1}`}>
                <div className="habit-icon">{habit.icon}</div>
                <h3>{habit.title}</h3>
                <p>{habit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="cara-kerja">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">📱 Cara Kerja</div>
            <h2 className="section-title">Pesan Katsu Tanpa Ribet</h2>
            <p className="section-subtitle">Hanya 3 langkah mudah untuk menikmati makanan favoritmu tanpa antre.</p>
          </div>
          <div className="steps-container">
            {[
              { num: 1, icon: '📱', title: 'Scan QR di Meja', desc: 'Scan QR code yang ada di meja kamu menggunakan smartphone.' },
              { num: 2, icon: '🛒', title: 'Pilih Menu & Bayar', desc: 'Pilih menu favoritmu dan lakukan pembayaran langsung dari HP.' },
              { num: 3, icon: '🍳', title: 'Duduk Manis, Pesanan Diproses', desc: 'Pesanan langsung masuk ke dapur secara digital. Tinggal tunggu panggilan!' }
            ].map((step, idx) => (
              <div key={idx} className={`step-card animate-on-scroll delay-${idx + 1}`}>
                <div className="step-number">{step.num}</div>
                <div className="step-illustration">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits" id="untuk-penjual">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">✨ Keuntungan</div>
            <h2 className="section-title">Lebih Baik untuk Semua</h2>
            <p className="section-subtitle">KatsuGo memberikan manfaat bagi pembeli dan penjual.</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-column animate-on-scroll delay-1">
              <h3><span className="icon buyer">🙋</span>Untuk Pembeli</h3>
              <ul className="benefit-list">
                <li><span className="check">✓</span>Tidak perlu antre panjang lagi</li>
                <li><span className="check">✓</span>Pesanan lebih akurat, sesuai keinginan</li>
                <li><span className="check">✓</span>Tahu status pesanan secara real-time</li>
              </ul>
              <div className="illustration">🙆‍♂️</div>
            </div>
            <div className="benefit-column animate-on-scroll delay-2">
              <h3><span className="icon seller">👨‍🍳</span>Untuk Penjual</h3>
              <ul className="benefit-list">
                <li><span className="check">✓</span>Tidak salah catat pesanan</li>
                <li><span className="check">✓</span>Urutan pesanan jelas dan teratur</li>
                <li><span className="check">✓</span>Lebih cepat melayani pelanggan</li>
              </ul>
              <div className="illustration">👨‍🍳</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-sparkles">
          {[...Array(5)].map((_, i) => <div key={i} className="sparkle" style={{ animationDelay: `${i * 0.5}s` }} />)}
        </div>
        <div className="container animate-on-scroll">
          <h2>KatsuGo</h2>
          <p>Pesan dari meja, nikmati tanpa lama!</p>
          <button className="btn btn-white btn-lg" onClick={() => alert('Fitur akan segera hadir!')}>
            Coba Sekarang
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">Katsu<span>Go</span></div>
            <ul className="footer-links">
              <li><a href="#">Kontak</a></li>
              <li><a href="#">Tentang</a></li>
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero') }}>Demo</a></li>
            </ul>
            <div className="footer-social">
              <a href="#">📷</a>
              <a href="#">💬</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 KatsuGo. All rights reserved. — Self Ordering Kantin Amikom</p>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <div className={`toast ${toast.show ? 'show' : ''}`}>
        <div className="toast-icon">✓</div>
        <span>{toast.message}</span>
      </div>
    </div>
  )
}

export default App