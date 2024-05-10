import Navigation from "../Navigation/Navigation";
import css from "./Layout.module.css";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback="Please wait loading page...">{children}</Suspense>
    </div>
  );
}
