export default function Header({ darkMode, toggleDarkMode, searchQuery, setSearchQuery }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900 gap-4 md:gap-2">
      <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight">
        Qur&apos;an App
      </h1>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto inter-font">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari surah..."
          className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white w-full sm:w-64"
        />
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-md dark:text-gray-200 hover:bg-gray-300 w-full sm:w-auto"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </header>
  );
}
