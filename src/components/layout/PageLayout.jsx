import Navbar from "../navigation/Navbar";
import Footer from "./Footer";
import MainContent from "./MainContent";
import ScrollProgress from "./ScrollProgress";

export default function PageLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col selection:bg-accent/30 selection:text-white">
      <ScrollProgress />
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  );
}
