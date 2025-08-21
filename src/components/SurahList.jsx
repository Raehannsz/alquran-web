import { useState } from 'react';

export default function SurahList({ surahs, onSelect }) {
  const [selectedSurah, setSelectedSurah] = useState(null);

  const handleSelect = (nomor) => {
    setSelectedSurah(nomor);
    onSelect(nomor);
  };

  return (
    <div className="space-y-2">
      {surahs.map((surah) => {
        const isSelected = selectedSurah === surah.nomor;
        return (
          <div
            key={surah.nomor}
            className={`cursor-pointer p-4 rounded-lg border transition inter-font ${
              isSelected ? 'bg-blue-200 border-blue-400' : 'hover:bg-blue-200 border-blue-400'}`}
            onClick={() => handleSelect(surah.nomor)}
          >
            <div className="font-bold text-lg">
              {surah.nomor}. {surah.namaLatin} | {surah.arti} ({surah.nama})
            </div>
            <div className="text-sm text-gray-600">
              {surah.jumlahAyat} Ayat |{' '}
              {surah.tempatTurun === 'Mekah' ? 'Makkiyah' : 'Madaniyah'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
