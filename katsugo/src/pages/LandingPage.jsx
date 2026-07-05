import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  // State untuk konten dari dashboard
  const [content, setContent] = useState({
    hero: {
      badge: "Self-Ordering Kantin Amikom",
      title: "Laper, Tapi Antre Panjang di Kantin?",
      subtitle:
        "Jam istirahat singkat, tapi habis buat berdiri dan nunggu pesanan.",
      description:
        "KatsuGo memungkinkan kamu pesan langsung dari meja lewat QR code. Tanpa antre. Tanpa salah catat.",
      buttonText: "Pesan Sekarang",
    },
    oldHabits: {
      label: "😓 Masalah Lama",
      title: "Kebiasaan Lama yang Melelahkan",
      subtitle:
        "Sudah saatnya tinggalkan cara lama yang bikin capek dan buang waktu.",
      items: [
        {
          icon: "⏰",
          title: "Waktu Istirahat kebuang buat Antre",
          description:
            "Jam istirahat yang seharusnya untuk refreshing malah habis berdiri di antrean panjang.",
        },
        {
          icon: "😰",
          title: "Pesanan bisa salah atau kelupaan",
          description:
            "Kasir yang sibuk sering salah catat pesanan, dan pesananmu bisa kelupaan.",
        },
        {
          icon: "😫",
          title: "Penjual stres, pembeli emosi",
          description:
            "Kasir kewalahan, pembeli semakin frustrasi menunggu. Semua sama-sama capek.",
        },
      ],
    },
    howItWorks: {
      label: "📱 Cara Kerja",
      title: "Pesan Katsu Tanpa Ribet",
      subtitle:
        "Hanya 3 langkah mudah untuk menikmati makanan favoritmu tanpa antre.",
      steps: [
        {
          number: 1,
          icon: "📱",
          title: "Scan QR di Meja",
          description:
            "Scan QR code yang ada di meja kamu menggunakan smartphone.",
        },
        {
          number: 2,
          icon: "🛒",
          title: "Pilih Menu & Bayar",
          description:
            "Pilih menu favoritmu dan lakukan pembayaran langsung dari HP.",
        },
        {
          number: 3,
          icon: "🍳",
          title: "Duduk Manis, Pesanan Diproses",
          description:
            "Pesanan langsung masuk ke dapur secara digital. Tinggal tunggu panggilan!",
        },
      ],
    },
    benefits: {
      label: "✨ Keuntungan",
      title: "Lebih Baik untuk Semua",
      subtitle: "KatsuGo memberikan manfaat bagi pembeli dan penjual.",
      buyerTitle: "Untuk Pembeli",
      buyerItems: [
        "Tidak perlu antre panjang lagi",
        "Pesanan lebih akurat, sesuai keinginan",
        "Tahu status pesanan secara real-time",
      ],
      sellerTitle: "Untuk Penjual",
      sellerItems: [
        "Tidak salah catat pesanan",
        "Urutan pesanan jelas dan teratur",
        "Lebih cepat melayani pelanggan",
      ],
    },
    cta: {
      title: "KatsuGo",
      subtitle: "Pesan dari meja, nikmati tanpa lama!",
      buttonText: "Coba Sekarang",
    },
    footer: {
      logo: "KatsuGo",
      links: ["Kontak", "Tentang", "Demo"],
      copyright:
        "© 2024 KatsuGo. All rights reserved. — Self Ordering Kantin Amikom",
    },
  });

  // Load content dari localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem("landingContent");
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent(parsed);
      } catch (e) {
        console.error("Error parsing saved content:", e);
      }
    }
  }, []);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  // Save dark mode preference and apply class
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    document
      .querySelectorAll(".animate-on-scroll")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    showToast(darkMode ? "Mode terang diaktifkan" : "Mode gelap diaktifkan");
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  // Fungsi untuk navigasi ke dashboard
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <a href="#" className="navbar-logo">
            <div className="logo-icon">🍱</div>
            Katsu<span>Go</span>
          </a>
          <ul className="navbar-links">
            <li>
              <a
                href="#cara-kerja"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("cara-kerja");
                }}
              >
                Cara Kerja
              </a>
            </li>
            <li>
              <a
                href="#untuk-penjual"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("untuk-penjual");
                }}
              >
                Untuk Penjual
              </a>
            </li>
            <li>
              <button
                className="btn btn-outline btn-sm dark-mode-toggle"
                onClick={toggleDarkMode}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </li>
            <li>
              <button
                className="btn btn-primary btn-sm"
                onClick={goToDashboard}
              >
                Kelola Konten
              </button>
            </li>
          </ul>
          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu open">
            <a
              href="#cara-kerja"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("cara-kerja");
              }}
            >
              Cara Kerja
            </a>
            <a
              href="#untuk-penjual"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("untuk-penjual");
              }}
            >
              Untuk Penjual
            </a>
            <button
              className="btn btn-outline btn-sm"
              onClick={toggleDarkMode}
              style={{ width: "100%", marginTop: "10px" }}
            >
              {darkMode ? "☀️ Mode Terang" : "🌙 Mode Gelap"}
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={goToDashboard}
              style={{ width: "100%", marginTop: "10px" }}
            >
              📝 Kelola Konten
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section - Menggunakan konten dari dashboard */}
      <section className="hero" id="hero">
        <div className="particles">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
                animationDelay: `${i}s`,
              }}
            />
          ))}
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">{content.hero.badge}</div>
            <h1>
              {content.hero.title.split("Antre Panjang")[0]}
              <span className="highlight">Antre Panjang</span>
              {content.hero.title.split("Antre Panjang")[1] || ""}
            </h1>
            <p>{content.hero.subtitle}</p>
            <p className="hero-subtitle">{content.hero.description}</p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary btn-lg"
                onClick={goToDashboard}
              >
                {content.hero.buttonText}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={() => scrollToSection("cara-kerja")}
              >
                Lihat Cara Kerjanya
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M10 8l6 4-6 4V8z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-phone">
                <div className="phone-screen">
                  <div className="qr-display">
                    <div className="qr-logo">
                      Katsu<span style={{ color: "var(--orange)" }}>Go</span>
                    </div>
                    <div className="qr-code-placeholder">
                      <svg viewBox="0 0 100 100" fill="none">
                        <rect
                          x="5"
                          y="5"
                          width="25"
                          height="25"
                          rx="3"
                          fill="#1A1D2E"
                        />
                        <rect
                          x="8"
                          y="8"
                          width="19"
                          height="19"
                          rx="2"
                          fill="white"
                        />
                        <rect
                          x="11"
                          y="11"
                          width="13"
                          height="13"
                          rx="1"
                          fill="#1A1D2E"
                        />
                        <rect
                          x="70"
                          y="5"
                          width="25"
                          height="25"
                          rx="3"
                          fill="#1A1D2E"
                        />
                        <rect
                          x="73"
                          y="8"
                          width="19"
                          height="19"
                          rx="2"
                          fill="white"
                        />
                        <rect
                          x="76"
                          y="11"
                          width="13"
                          height="13"
                          rx="1"
                          fill="#1A1D2E"
                        />
                        <rect
                          x="5"
                          y="70"
                          width="25"
                          height="25"
                          rx="3"
                          fill="#1A1D2E"
                        />
                        <rect
                          x="8"
                          y="73"
                          width="19"
                          height="19"
                          rx="2"
                          fill="white"
                        />
                        <rect
                          x="11"
                          y="76"
                          width="13"
                          height="13"
                          rx="1"
                          fill="#1A1D2E"
                        />
                      </svg>
                    </div>
                    <div className="qr-text">
                      SCAN UNTUK
                      <br />
                      PESAN DI SINI
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-qr-stand">
                <div className="stand-label">A-12</div>
                <div className="mini-qr">
                  <svg viewBox="0 0 100 100" width="80" height="80" fill="none">
                    <rect
                      x="5"
                      y="5"
                      width="25"
                      height="25"
                      rx="3"
                      fill="#1A1D2E"
                    />
                    <rect
                      x="70"
                      y="5"
                      width="25"
                      height="25"
                      rx="3"
                      fill="#1A1D2E"
                    />
                    <rect
                      x="5"
                      y="70"
                      width="25"
                      height="25"
                      rx="3"
                      fill="#1A1D2E"
                    />
                  </svg>
                </div>
                <div className="stand-info">
                  <strong>KatsuGo</strong>Pesan dari meja,
                  <br />
                  nikmati tanpa lama!
                </div>
              </div>
              <div className="floating-badge badge-1">
                <div className="badge-icon">✅</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                    Tanpa Antre!
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--gray-500)" }}>
                    Hemat 30 menit
                  </div>
                </div>
              </div>
              <div className="floating-badge badge-2">
                <div className="badge-icon">⚡</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                    Pesanan Akurat
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--gray-500)" }}>
                    0% kesalahan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Old Habits - Menggunakan konten dari dashboard */}
      <section className="old-habits">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">{content.oldHabits.label}</div>
            <h2 className="section-title">{content.oldHabits.title}</h2>
            <p className="section-subtitle">{content.oldHabits.subtitle}</p>
          </div>
          <div className="habits-grid">
            {content.oldHabits.items.map((habit, idx) => (
              <div
                key={idx}
                className={`habit-card animate-on-scroll delay-${idx + 1}`}
              >
                <div className="habit-icon">{habit.icon}</div>
                <h3>{habit.title}</h3>
                <p>{habit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Menggunakan konten dari dashboard */}
      <section className="how-it-works" id="cara-kerja">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">{content.howItWorks.label}</div>
            <h2 className="section-title">{content.howItWorks.title}</h2>
            <p className="section-subtitle">{content.howItWorks.subtitle}</p>
          </div>
          <div className="steps-container">
            {content.howItWorks.steps.map((step, idx) => (
              <div
                key={idx}
                className={`step-card animate-on-scroll delay-${idx + 1}`}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-illustration">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Menggunakan konten dari dashboard */}
      <section className="benefits" id="untuk-penjual">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">{content.benefits.label}</div>
            <h2 className="section-title">{content.benefits.title}</h2>
            <p className="section-subtitle">{content.benefits.subtitle}</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-column animate-on-scroll delay-1">
              <h3>
                <span className="icon buyer">🙋</span>
                {content.benefits.buyerTitle}
              </h3>
              <ul className="benefit-list">
                {content.benefits.buyerItems.map((item, idx) => (
                  <li key={idx}>
                    <span className="check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="illustration">🙆‍♂️</div>
            </div>
            <div className="benefit-column animate-on-scroll delay-2">
              <h3>
                <span className="icon seller">👨‍🍳</span>
                {content.benefits.sellerTitle}
              </h3>
              <ul className="benefit-list">
                {content.benefits.sellerItems.map((item, idx) => (
                  <li key={idx}>
                    <span className="check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="illustration">👨‍🍳</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner - Menggunakan konten dari dashboard */}
      <section className="cta-banner">
        <div className="cta-sparkles">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="sparkle"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>
        <div className="container animate-on-scroll">
          <h2>{content.cta.title}</h2>
          <p>{content.cta.subtitle}</p>
          <button className="btn btn-white btn-lg" onClick={goToDashboard}>
            {content.cta.buttonText}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer - Menggunakan konten dari dashboard */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              {content.footer.logo.split("Go")[0]}
              <span>Go</span>
            </div>
            <ul className="footer-links">
              {content.footer.links.map((link, idx) => (
                <li key={idx}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
            <div className="footer-social">
              <a href="#">📷</a>
              <a href="#">💬</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{content.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <div className={`toast ${toast.show ? "show" : ""}`}>
        <div className="toast-icon">✓</div>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

export default LandingPage;
