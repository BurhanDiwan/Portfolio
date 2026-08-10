export default function MainContent({ children }) {
  return (
    <main className="relative z-10 flex-grow pt-24 md:pt-28">
      {children}
    </main>
  );
}
