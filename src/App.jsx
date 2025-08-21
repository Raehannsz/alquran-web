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

  return (
    <div className={`${darkMode ? "dark bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 min-h-screen">
        {/* Mobile: hanya tampilkan list atau detail */}
        {isMobile ? (
          showDetailMobile ? (
            <div className="col-span-1">
              <button
                className="mb-4 px-4 py-2 rounded inter-font bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                onClick={() => setShowDetailMobile(false)}
              >
                &larr; Kembali
              </button>
              <SurahDetail surah={selectedSurah} loading={loadingSurah} />
            </div>
          ) : (
            <div className="col-span-1">
              <SurahList surahs={filteredSurahs} onSelect={loadSurah} />
            </div>
          )
        ) : (
          // Desktop
          <>
            <div className="h-full overflow-y-auto border-r pr-4">
              <SurahList surahs={filteredSurahs} onSelect={loadSurah} />
            </div>
            <div className="md:col-span-2 h-full overflow-y-auto p-4">
              <SurahDetail surah={selectedSurah} loading={loadingSurah} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}