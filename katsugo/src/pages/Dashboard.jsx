// /katsugo/src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("hero");
  const [content, setContent] = useState({
    hero: {
      badge: "Self-Ordering Kantin Amikom",
      title: "Laper, Tapi Antre Panjang di Kantin?",
      subtitle:
        "Jam istirahat singkat, tapi habis buat berdiri dan nunggu pesanan.",
      description:
        "KatsuGo memungkinkan kamu pesan langsung dari meja lewat QR code. Tanpa antre. Tanpa salah catat.",
      buttonText: "Pesan dari Meja Sekarang",
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

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Load saved content from localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem("landingContent");
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const handleContentChange = (section, field, value) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setContent((prev) => {
      const updatedItems = [...prev[section].items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          items: updatedItems,
        },
      };
    });
  };

  const handleBenefitItemChange = (section, type, index, value) => {
    setContent((prev) => {
      const updatedItems = [...prev[section][`${type}Items`]];
      updatedItems[index] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [`${type}Items`]: updatedItems,
        },
      };
    });
  };

  const handleStepChange = (index, field, value) => {
    setContent((prev) => {
      const updatedSteps = [...prev.howItWorks.steps];
      updatedSteps[index] = { ...updatedSteps[index], [field]: value };
      return {
        ...prev,
        howItWorks: {
          ...prev.howItWorks,
          steps: updatedSteps,
        },
      };
    });
  };

  const handleAddStep = () => {
    setContent((prev) => ({
      ...prev,
      howItWorks: {
        ...prev.howItWorks,
        steps: [
          ...prev.howItWorks.steps,
          {
            number: prev.howItWorks.steps.length + 1,
            icon: "🆕",
            title: "Step Baru",
            description: "Deskripsi step",
          },
        ],
      },
    }));
  };

  const handleRemoveStep = (index) => {
    if (content.howItWorks.steps.length <= 1) return;
    setContent((prev) => ({
      ...prev,
      howItWorks: {
        ...prev.howItWorks,
        steps: prev.howItWorks.steps.filter((_, i) => i !== index),
      },
    }));
  };

  const handleAddHabit = () => {
    setContent((prev) => ({
      ...prev,
      oldHabits: {
        ...prev.oldHabits,
        items: [
          ...prev.oldHabits.items,
          { icon: "🆕", title: "Judul Baru", description: "Deskripsi baru" },
        ],
      },
    }));
  };

  const handleRemoveHabit = (index) => {
    if (content.oldHabits.items.length <= 1) return;
    setContent((prev) => ({
      ...prev,
      oldHabits: {
        ...prev.oldHabits,
        items: prev.oldHabits.items.filter((_, i) => i !== index),
      },
    }));
  };

  const handleAddBenefitItem = (type) => {
    setContent((prev) => ({
      ...prev,
      benefits: {
        ...prev.benefits,
        [`${type}Items`]: [...prev.benefits[`${type}Items`], "Item baru"],
      },
    }));
  };

  const handleRemoveBenefitItem = (type, index) => {
    if (content.benefits[`${type}Items`].length <= 1) return;
    setContent((prev) => ({
      ...prev,
      benefits: {
        ...prev.benefits,
        [`${type}Items`]: prev.benefits[`${type}Items`].filter(
          (_, i) => i !== index,
        ),
      },
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem("landingContent", JSON.stringify(content));
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus("✅ Konten berhasil disimpan!");
      setTimeout(() => setSaveStatus(""), 3000);
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin mereset ke default?")) {
      localStorage.removeItem("landingContent");
      window.location.reload();
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📝 Dashboard Konten Landing Page</h1>
        <div className="dashboard-actions">
          <button className="btn btn-outline" onClick={handleReset}>
            🔄 Reset ke Default
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "⏳ Menyimpan..." : "💾 Simpan Konten"}
          </button>
          {saveStatus && <span className="save-status">{saveStatus}</span>}
        </div>
      </div>

      <div className="dashboard-tabs">
        {[
          { id: "hero", label: "🏠 Hero" },
          { id: "oldHabits", label: "😓 Masalah" },
          { id: "howItWorks", label: "📱 Cara Kerja" },
          { id: "benefits", label: "✨ Keuntungan" },
          { id: "cta", label: "🎯 CTA" },
          { id: "footer", label: "📄 Footer" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {/* Hero Section */}
        {activeTab === "hero" && (
          <div className="edit-section">
            <h2>🏠 Edit Hero Section</h2>
            <div className="form-group">
              <label>Badge</label>
              <input
                type="text"
                value={content.hero.badge}
                onChange={(e) =>
                  handleContentChange("hero", "badge", e.target.value)
                }
                placeholder="Self-Ordering Kantin Amikom"
              />
            </div>
            <div className="form-group">
              <label>Judul Utama</label>
              <textarea
                value={content.hero.title}
                onChange={(e) =>
                  handleContentChange("hero", "title", e.target.value)
                }
                placeholder="Laper, Tapi Antre Panjang di Kantin?"
                rows={2}
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={content.hero.subtitle}
                onChange={(e) =>
                  handleContentChange("hero", "subtitle", e.target.value)
                }
                placeholder="Jam istirahat singkat, tapi habis buat berdiri dan nunggu pesanan."
              />
            </div>
            <div className="form-group">
              <label>Deskripsi</label>
              <textarea
                value={content.hero.description}
                onChange={(e) =>
                  handleContentChange("hero", "description", e.target.value)
                }
                placeholder="KatsuGo memungkinkan kamu pesan langsung dari meja lewat QR code."
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Tombol Utama</label>
              <input
                type="text"
                value={content.hero.buttonText}
                onChange={(e) =>
                  handleContentChange("hero", "buttonText", e.target.value)
                }
                placeholder="Pesan dari Meja Sekarang"
              />
            </div>
          </div>
        )}

        {/* Old Habits Section */}
        {activeTab === "oldHabits" && (
          <div className="edit-section">
            <h2>😓 Edit Masalah Lama</h2>
            <div className="form-group">
              <label>Label</label>
              <input
                type="text"
                value={content.oldHabits.label}
                onChange={(e) =>
                  handleContentChange("oldHabits", "label", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Judul</label>
              <input
                type="text"
                value={content.oldHabits.title}
                onChange={(e) =>
                  handleContentChange("oldHabits", "title", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={content.oldHabits.subtitle}
                onChange={(e) =>
                  handleContentChange("oldHabits", "subtitle", e.target.value)
                }
              />
            </div>

            <h3>Item Masalah</h3>
            {content.oldHabits.items.map((item, index) => (
              <div key={index} className="card-item">
                <div className="form-group">
                  <label>Icon</label>
                  <input
                    type="text"
                    value={item.icon}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "oldHabits",
                        index,
                        "icon",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Judul</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "oldHabits",
                        index,
                        "title",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Deskripsi</label>
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "oldHabits",
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                    rows={2}
                  />
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveHabit(index)}
                >
                  ❌ Hapus
                </button>
              </div>
            ))}
            <button className="btn btn-outline btn-sm" onClick={handleAddHabit}>
              ➕ Tambah Item
            </button>
          </div>
        )}

        {/* How It Works Section */}
        {activeTab === "howItWorks" && (
          <div className="edit-section">
            <h2>📱 Edit Cara Kerja</h2>
            <div className="form-group">
              <label>Label</label>
              <input
                type="text"
                value={content.howItWorks.label}
                onChange={(e) =>
                  handleContentChange("howItWorks", "label", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Judul</label>
              <input
                type="text"
                value={content.howItWorks.title}
                onChange={(e) =>
                  handleContentChange("howItWorks", "title", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={content.howItWorks.subtitle}
                onChange={(e) =>
                  handleContentChange("howItWorks", "subtitle", e.target.value)
                }
              />
            </div>

            <h3>Langkah-langkah</h3>
            {content.howItWorks.steps.map((step, index) => (
              <div key={index} className="card-item">
                <div className="form-group">
                  <label>Nomor</label>
                  <input
                    type="number"
                    value={step.number}
                    onChange={(e) =>
                      handleStepChange(
                        index,
                        "number",
                        parseInt(e.target.value),
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Icon</label>
                  <input
                    type="text"
                    value={step.icon}
                    onChange={(e) =>
                      handleStepChange(index, "icon", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Judul</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) =>
                      handleStepChange(index, "title", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Deskripsi</label>
                  <textarea
                    value={step.description}
                    onChange={(e) =>
                      handleStepChange(index, "description", e.target.value)
                    }
                    rows={2}
                  />
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveStep(index)}
                >
                  ❌ Hapus
                </button>
              </div>
            ))}
            <button className="btn btn-outline btn-sm" onClick={handleAddStep}>
              ➕ Tambah Langkah
            </button>
          </div>
        )}

        {/* Benefits Section */}
        {activeTab === "benefits" && (
          <div className="edit-section">
            <h2>✨ Edit Keuntungan</h2>
            <div className="form-group">
              <label>Label</label>
              <input
                type="text"
                value={content.benefits.label}
                onChange={(e) =>
                  handleContentChange("benefits", "label", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Judul</label>
              <input
                type="text"
                value={content.benefits.title}
                onChange={(e) =>
                  handleContentChange("benefits", "title", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={content.benefits.subtitle}
                onChange={(e) =>
                  handleContentChange("benefits", "subtitle", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Judul Pembeli</label>
              <input
                type="text"
                value={content.benefits.buyerTitle}
                onChange={(e) =>
                  handleContentChange("benefits", "buyerTitle", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Judul Penjual</label>
              <input
                type="text"
                value={content.benefits.sellerTitle}
                onChange={(e) =>
                  handleContentChange("benefits", "sellerTitle", e.target.value)
                }
              />
            </div>

            <h3>Keuntungan Pembeli</h3>
            {content.benefits.buyerItems.map((item, index) => (
              <div key={index} className="inline-item">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleBenefitItemChange(
                      "benefits",
                      "buyer",
                      index,
                      e.target.value,
                    )
                  }
                />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveBenefitItem("buyer", index)}
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline btn-sm"
              onClick={() => handleAddBenefitItem("buyer")}
            >
              ➕ Tambah
            </button>

            <h3>Keuntungan Penjual</h3>
            {content.benefits.sellerItems.map((item, index) => (
              <div key={index} className="inline-item">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleBenefitItemChange(
                      "benefits",
                      "seller",
                      index,
                      e.target.value,
                    )
                  }
                />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveBenefitItem("seller", index)}
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline btn-sm"
              onClick={() => handleAddBenefitItem("seller")}
            >
              ➕ Tambah
            </button>
          </div>
        )}

        {/* CTA Section */}
        {activeTab === "cta" && (
          <div className="edit-section">
            <h2>🎯 Edit CTA Banner</h2>
            <div className="form-group">
              <label>Judul</label>
              <input
                type="text"
                value={content.cta.title}
                onChange={(e) =>
                  handleContentChange("cta", "title", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={content.cta.subtitle}
                onChange={(e) =>
                  handleContentChange("cta", "subtitle", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Tombol</label>
              <input
                type="text"
                value={content.cta.buttonText}
                onChange={(e) =>
                  handleContentChange("cta", "buttonText", e.target.value)
                }
              />
            </div>
          </div>
        )}

        {/* Footer Section */}
        {activeTab === "footer" && (
          <div className="edit-section">
            <h2>📄 Edit Footer</h2>
            <div className="form-group">
              <label>Logo</label>
              <input
                type="text"
                value={content.footer.logo}
                onChange={(e) =>
                  handleContentChange("footer", "logo", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Copyright</label>
              <input
                type="text"
                value={content.footer.copyright}
                onChange={(e) =>
                  handleContentChange("footer", "copyright", e.target.value)
                }
              />
            </div>
            <h3>Links</h3>
            {content.footer.links.map((link, index) => (
              <div key={index} className="inline-item">
                <input
                  type="text"
                  value={link}
                  onChange={(e) => {
                    const updatedLinks = [...content.footer.links];
                    updatedLinks[index] = e.target.value;
                    setContent((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        links: updatedLinks,
                      },
                    }));
                  }}
                />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (content.footer.links.length <= 1) return;
                    const updatedLinks = content.footer.links.filter(
                      (_, i) => i !== index,
                    );
                    setContent((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        links: updatedLinks,
                      },
                    }));
                  }}
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                setContent((prev) => ({
                  ...prev,
                  footer: {
                    ...prev.footer,
                    links: [...prev.footer.links, "Link Baru"],
                  },
                }));
              }}
            >
              ➕ Tambah Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
