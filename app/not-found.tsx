import Link from "next/link";

export default function NotFound() {
  return (
    <section className="nf container">
      <div>
        <h1 className="h1">This page does not exist.</h1>
        <p className="lead">We checked every candidate. Unlike CW(120, 36), it is not there.</p>
        <Link href="/" className="btn">
          Back to the start
        </Link>
      </div>
    </section>
  );
}
