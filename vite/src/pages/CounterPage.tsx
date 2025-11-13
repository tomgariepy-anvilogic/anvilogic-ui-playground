import { useCounterStore } from "../store/useCounterStore";
import Button from "../components/common/Button";

const CounterPage = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div>
      <h2>Counter Example</h2>
      <div className="counter">
        <p>Count: {count}</p>
        <div className="counter__buttons">
          <Button onClick={increment}>Increment</Button>
          <Button variant="secondary" onClick={decrement}>
            Decrement
          </Button>
          <Button variant="danger" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CounterPage;
