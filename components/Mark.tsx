/** The KalKram mark. The artwork is a transparent PNG, so it sits on the dark canvas without a box. */
export function Mark({
  className = "mark",
  title,
  large,
}: {
  className?: string;
  title?: string;
  /** Use the larger file. The default is the small one made for the nav bar. */
  large?: boolean;
}) {
  const px = large ? 192 : 64;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/static/brand/kalkram-mark-${px}.png`}
      width={px}
      height={px}
      className={className}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      decoding="async"
    />
  );
}
