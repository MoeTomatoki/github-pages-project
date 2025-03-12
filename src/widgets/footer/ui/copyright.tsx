export function CopyRight() {
  const currentYear = new Date().getFullYear();
  return (
    <span className="underline hover:cursor-pointer">© {currentYear}</span>
  );
}
