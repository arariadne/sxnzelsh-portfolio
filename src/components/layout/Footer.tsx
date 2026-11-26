import { site } from '../../data/site';

/** Plum footer bar used on every page. */
export function Footer() {
  return (
    <footer className="on-plum flex flex-wrap justify-between gap-4 px-gutter py-[18px] text-[14px] sm:gap-6 sm:py-5 sm:text-[16px]">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <span>{site.location}</span>
    </footer>
  );
}
