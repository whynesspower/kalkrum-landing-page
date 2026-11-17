import Link from "next/link";
import { IMAGE_CREDIT_LINE } from "@/content/images";
import { nav, site } from "@/content/site";
import { Mark } from "./Mark";

export function Footer() {
  return (
    <footer className="footer cine">
      <div className="container">
        <div className="grid footer-top">
          <div className="footer-brand">
            <Mark title={`${site.name} mark`} />
            <p>{site.tagline}</p>
          </div>
          <div className="footer-col">
            <span className="label">Site</span>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span className="label">
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="label">A product of {site.legalName}</span>
        </div>
        <p className="label footer-credit">{IMAGE_CREDIT_LINE}</p>
      </div>
    </footer>
  );
}
