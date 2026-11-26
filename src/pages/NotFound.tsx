import { Link } from 'react-router-dom';
import { Header, HEADER_PAD } from '../components/layout/Header';
import { Seo } from '../components/layout/Seo';

export default function NotFound() {
  return (
    <>
      <Seo path="/404" title="Page not found" noindex />
      <Header tone="plum" />
      <main id="main" className={`on-plum min-h-screen px-gutter pb-24 ${HEADER_PAD}`}>
        <p className="font-italic-serif m-0 mt-11 text-[clamp(100px,14vw,200px)] leading-[0.85] text-bubblegum">404</p>
        <h1 className="font-heavy mt-6 text-[clamp(36px,4.2vw,62px)] leading-[1.08]">This page doesn’t exist.</h1>
        <Link to="/" className="lnk text-[18px] font-medium">
          Back to the home page
        </Link>
      </main>
    </>
  );
}
