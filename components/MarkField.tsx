/** The KalKram mark at the scale of a page, turning slowly behind the heading. Decoration only. */
export function MarkField() {
  return (
    <div className="mark-field" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/static/brand/kalkram-mark-512.png" alt="" width={512} height={512} decoding="async" />
    </div>
  );
}
