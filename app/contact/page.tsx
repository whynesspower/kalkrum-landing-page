import { JsonLd } from "@/components/JsonLd";
import { PhotoBackdrop } from "@/components/Photo";
import { founders, site } from "@/content/site";
import { breadcrumbLd, ORG_ID, pageMeta } from "@/lib/seo";

const description =
  "Bring the toughest technical problem your company is facing, our system will take a shot at it. Contact KalKram through its founder on LinkedIn.";

export const metadata = pageMeta({ title: "Contact", description, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Contact", path: "/contact" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${site.url}/contact`,
          name: `Contact ${site.name}`,
          about: { "@id": ORG_ID },
        }}
      />

      <div className="photo-head cine" data-nav-dark>
        <PhotoBackdrop image="stephansQuintet" position="50% 35%" priority />
      <header className="page-head container">
        <h1 className="h1 rise">Write to us.</h1>
        <p className="lead rise" style={{ "--d": "0.1s" } as React.CSSProperties}>
          Bring the toughest technical problem your company is facing, our system will take a shot at it. Message Yashraj
          Shukla on LinkedIn.
        </p>
      </header>
      </div>

      <section
        className="container founder-links"
        style={{ paddingBottom: "var(--section)" }}
        aria-label="Founder on LinkedIn"
      >
        {founders.map((f) => (
          <a className="founder-link" key={f.name} href={f.linkedin} rel="noopener" target="_blank">
            <span className="name">
              {f.name}
              <svg className="arrow" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2 8 8 2M3 2h5v5" />
              </svg>
            </span>
            <span className="label">{f.role}</span>
          </a>
        ))}
      </section>
    </>
  );
}
