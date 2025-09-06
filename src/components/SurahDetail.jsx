import { useState } from "react";

export default function SurahDetail({ surah, loading }) {
  const [fontSize, setFontSize] = useState("medium");
  const [search, setSearch] = useState("");

  if (loading) {
    return <div className="text-gray-500 text-center mt-20 inter-font">Memuat...</div>;
  }
  if (!surah) {
    return <div className="text-gray-500 text-center mt-20 inter-font">Pilih surat untuk ditampilkan</div>;
  }

  const fontSizes = {
    small: "text-2xl",
    medium: "text-3xl",
    large: "text-4xl",
  };

  const filteredAyat = surah.ayat.filter(
    (ayat) =>
      ayat.nomorAyat.toString().includes(search) ||
      ayat.teksArab.includes(search) ||
      ayat.teksLatin.toLowerCase().includes(search.toLowerCase()) ||
      ayat.teksIndonesia.toLowerCase().includes(search.toLowerCase())
  );

  // Fungsi untuk menandai (highlight) teks yang cocok dengan pencarian
  function highlight(text, query) {
    if (!query) return text;
    // Escape regex karakter khusus
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, "gi");
    return text.replace(regex, (match) => `<mark class="bg-yellow-200">${match}</mark>`);
  }

  return (
    <div>
      <div className="flex items-center mb-4 gap-2">
        <span className="text-m text-gray-600 dark:text-gray-500 inter-font">Ukuran huruf Arab:</span>
        <select
          className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-600 dark:text-white focus:outline-none inter-font"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          <option value="small">Kecil</option>
          <option value="medium">Sedang</option>
          <option value="large">Besar</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="w-100 px-3 py-2 rounded border border-gray-300 focus:outline-none inter-font"
          placeholder="Cari ayat (Nomor, Arab, Latin, atau terjemahan)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="text-2xl font-bold mb-2 inter-font">{surah.namaLatin} ({surah.arti})</div>
      <div
        className="mb-4 text-gray-600 text-s inter-font"
        dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
      />
      {surah.audioFull && (
        <div className="mb-6 flex flex-col gap-2">
          <span className="font-semibold inter-font">Audio Surah:</span>
          <AudioDropdown audioFull={surah.audioFull} />
        </div>
      )}
      <div className="space-y-6">
        {filteredAyat.length === 0 ? (
          <div className="font-bold rounded p-6 text-red-500 border text-gray-500 text-center inter-font">Ayat tidak ditemukan.</div>
        ) : (
          filteredAyat.map((ayat) => (
            <div key={ayat.nomorAyat} className="border-b border-gray-400 pb-4">
              <div className="flex justify-between items-center mb-1">
                <span
                  className="text-sm inter-font"
                  dangerouslySetInnerHTML={{
                    __html: highlight(`Ayat ${ayat.nomorAyat}`, search),
                  }}
                />
              </div>
              <div
                className={`text-right ${fontSizes[fontSize]} arabic-font leading-relaxed`}
                dangerouslySetInnerHTML={{
                  __html: highlight(ayat.teksArab, search),
                }}
              />
              <div
                className="italic text-gray-600 text-l mt-2 inter-font"
                dangerouslySetInnerHTML={{
                  __html: highlight(ayat.teksLatin, search),
                }}
              />
              <div
                className="text-base mt-1 inter-font"
                dangerouslySetInnerHTML={{
                  __html: `<b>Artinya :</b> ${highlight(ayat.teksIndonesia, search)}`,
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Tambahkan komponen AudioDropdown di bawah komponen utama
function AudioDropdown({ audioFull }) {
  // Mapping kode ke nama murotal
  const murotalNames = {
    "01": "Abdullah Al-Juhany",
    "02": "Abdul-Muhsin Al-Qasim",
    "03": "Abdurrahman as-Sudais",
    "04": "Ibrahim Al-Dossari",
    "05": "Misyari Rasyid Al-Afasi",
  };

  const [selected, setSelected] = useState(Object.keys(audioFull)[0]);

  return (
    <div>
      <select
        className="mb-2 px-3 py-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white inter-font"
        value={selected}
        onChange={e => setSelected(e.target.value)}
      >
        {Object.entries(audioFull).map(([key]) => (
          <option key={key} value={key}>
            {murotalNames[key] || `Murottal ${key}`}
          </option>
        ))}
      </select>
      <audio key={selected} controls className="w-full">
        <source src={audioFull[selected]} type="audio/mpeg" />
        Browser Anda tidak mendukung audio.
      </audio>
      <div className="text-sm text-gray-500 mt-1 inter-font">
        {murotalNames[selected] || `Murottal ${selected}`}
      </div>
    </div>
  );
}
