export default function CounterLoading() {
  return (
    <div>
      <div className="skeleton skeleton--h36 skeleton--w220 skeleton--mb-lg" />
      <div className="counter skeleton-center">
        <div className="skeleton-flex--center skeleton--mb-md">
          <div className="skeleton skeleton--h48 skeleton--w150" />
        </div>
        <div className="counter__buttons skeleton-flex--center skeleton-flex--wrap">
          <div className="skeleton skeleton--h44 skeleton--w120" />
          <div className="skeleton skeleton--h44 skeleton--w120" />
          <div className="skeleton skeleton--h44 skeleton--w120" />
        </div>
      </div>
    </div>
  );
}
