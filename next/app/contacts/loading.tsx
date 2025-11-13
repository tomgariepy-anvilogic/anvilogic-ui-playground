export default function ContactsLoading() {
  return (
    <div>
      <div className="skeleton skeleton--h36 skeleton--w180 skeleton--mb-lg" />
      <div className="contacts-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-flex--between skeleton--mb-md">
              <div className="skeleton skeleton--h24 skeleton--w140" />
              <div className="skeleton skeleton--h24 skeleton--w60" />
            </div>
            <div className="skeleton skeleton--h20 skeleton--w180 skeleton--mb-md" />
            <div className="skeleton-flex">
              <div className="skeleton skeleton--h36 skeleton--flex-1" />
              <div className="skeleton skeleton--h36 skeleton--flex-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
