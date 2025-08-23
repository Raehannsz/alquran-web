import { useEffect, useState } from "react";
import SurahList from "./components/SurahList";
import SurahDetail from "./components/SurahDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadSurah = (nomor) => {
    setLoadingSurah(true);
    fetch(`https://equran.id/api/v2/surat/${nomor}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedSurah(data.data);
        setLoadingSurah(false);
        if (isMobile) setShowDetailMobile(true);
      });
  };

  const filteredSurahs = surahs.filter((surah) =>
    surah.namaLatin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scroll ke atas jika ada surah yang dibuka
  useEffect(() => {
    if (selectedSurah) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedSurah]);

  return (
    <div className={`${darkMode ? "dark bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 min-h-screen">
        {isMobile ? (
          showDetailMobile ? (
            <div className="col-span-1 relative h-[100vh] overflow-y-auto">
              <button
                className="fixed bottom-4 left-4 z-50 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
                style={{ fontSize: "1.5rem" }}
                onClick={() => setShowDetailMobile(false)}
                aria-label="Kembali"
              >
                &larr;
              </button>
              <SurahDetail surah={selectedSurah} loading={loadingSurah} />
            </div>
          ) : (
            <div className="col-span-1 h-[100vh] overflow-y-auto">
              <SurahList surahs={filteredSurahs} onSelect={loadSurah} />
            </div>
          )
        ) : (
          // Desktop
          <>
            <div className="h-[100vh] overflow-y-auto border-r pr-4">
              <SurahList surahs={filteredSurahs} onSelect={loadSurah} />
            </div>
            <div className="md:col-span-2 h-[100vh] overflow-y-auto p-4">
              <SurahDetail surah={selectedSurah} loading={loadingSurah} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
