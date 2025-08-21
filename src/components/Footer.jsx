export default function Footer() {
  return (
    <footer className="flex items-center justify-center p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
      <p className="text-sm text-gray-600 dark:text-gray-400 inter-font">
        &copy; {new Date().getFullYear()} Qur'an App. All rights reserved. Powered By{' '}
        <a href="https://www.equran.id" target="_blank" rel="noopener noreferrer" className="underline">
          equran.id.
        </a>
      </p>
    </footer>
  );
}