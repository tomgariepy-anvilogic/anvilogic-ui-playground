export default function Loading() {
  return (
    <div className="skeleton-page">
      <div className="skeleton skeleton--h40 skeleton--w300 skeleton--mb-lg" />
      <div className="skeleton-grid">
        <div className="skeleton skeleton--h200" />
        <div className="skeleton skeleton--h200" />
        <div className="skeleton skeleton--h200" />
      </div>
    </div>
  );
}
