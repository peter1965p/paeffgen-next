export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-center border-t border-gray-200 bg-background p-4 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
  &copy; 1995 - {new Date().getFullYear()} Paeffgen 
  <span className="text-blue-700 mx-1.5">IT</span> 
  All Rights reserved.
</footer>
  );
}