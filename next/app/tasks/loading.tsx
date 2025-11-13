import "./page.css";

export default function TasksLoading() {
  return (
    <div className="tasks-page">
      <div className="tasks-page__sidebar">
        <div className="tasks-page__sidebar-header">
          <div className="skeleton skeleton--h32 skeleton--w150 skeleton--mb-sm" />
          <div className="skeleton skeleton--h20 skeleton--w100" />
        </div>
        <ul className="tasks-page__list">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="tasks-page__list-item-wrapper">
              <div className="skeleton-item">
                <div className="skeleton skeleton--h20 skeleton--w-full" />
              </div>
            </li>
          ))}
        </ul>
        <div className="tasks-page__add-list">
          <div className="skeleton skeleton--h38 skeleton--flex-1 skeleton--mr-sm" />
          <div className="skeleton skeleton--h38 skeleton--w50" />
        </div>
      </div>

      <div className="tasks-page__content">
        <div className="skeleton-container">
          <div className="skeleton skeleton--h32 skeleton--w200 skeleton--mb-lg" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-item-wrapper">
              <div className="skeleton skeleton--h60 skeleton--w-full" />
            </div>
          ))}
          <div className="skeleton-flex skeleton--mt-md">
            <div className="skeleton skeleton--h40 skeleton--flex-1" />
            <div className="skeleton skeleton--h40 skeleton--w60" />
          </div>
        </div>
      </div>
    </div>
  );
}
