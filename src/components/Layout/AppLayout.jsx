import { Outlet } from "react-router-dom";
import { Headers } from "../UI/Headers";
import { Footer } from "../UI/Footer";
import { ScrollToTop } from "../UI/scrollToTop";

export const AppLayout = () => {
  return (
    <>
      <Headers />

      <ScrollToTop/>

      <Outlet />

      <Footer />
    </>
  );
};