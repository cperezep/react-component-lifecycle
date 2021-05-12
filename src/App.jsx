// Look at the diagram
// https://github.com/donavon/hook-flow
import { useState, useEffect } from "react";

function Child() {
  console.log("%c    Child: render start", "color: MediumSpringGreen");

  const [count, setCount] = useState(() => {
    console.log("%c    Child: useState callback", "color: tomato");
    return 0;
  });

  useEffect(() => {
    console.log("%c    Child: useEffect no deps", "color: LightCoral");
    return () => {
      console.log(
        "%c    Child: useEffect no deps cleanup",
        "color: LightCoral"
      );
    };
  });

  useEffect(() => {
    console.log("%c    Child: useEffect empty deps", "color: MediumTurquoise");
    return () => {
      console.log(
        "%c    Child: useEffect empty deps cleanup",
        "color: MediumTurquoise"
      );
    };
  }, []);

  useEffect(() => {
    console.log("%c    Child: useEffect with dep", "color: HotPink");
    return () => {
      console.log("%c    Child: useEffect with dep cleanup", "color: HotPink");
    };
  }, [count]);

  const element = (
    <button onClick={() => setCount((previousCount) => previousCount + 1)}>
      {count}
    </button>
  );

  console.log("%c    Child: render end", "color: MediumSpringGreen");

  return element;
}

function App() {
  // 1. That's the first thing that happens when we call ReactDom.render our app. It calls our app Function Component
  console.log("%cApp: render start", "color: MediumSpringGreen");

  const [showChild, setShowChild] = useState(() => {
    // 2. The next thing that happens is we call React.useState and immediately React is going to call this function to retrieve the initial state for our show child state
    // Note: When re-render the component React has already retrieved the initial state value for our show child state, and it doesn't need to retrieve that value again
    // Any time you use a function call back for use state, that function is only going to be called when this component is initially rendered for the rest of the lifetime of that component.
    console.log("%cApp: useState callback", "color: tomato");
    return false;
  });

  // 4. Then, asynchronously later, it's going to call our useEffect callbacks, one at a time in the order in which they were called.
  useEffect(() => {
    // 4.1 App useEffect to no deps is the first one that appears.
    console.log("%cApp: useEffect no deps", "color: LightCoral");
    return () => {
      console.log("%cApp: useEffect no deps cleanup", "color: LightCoral");
    };
  });

  useEffect(() => {
    // 4.2 Next, we get our useEffects empty deps. We have an empty list of dependencies there and then useEffect with dep.
    console.log("%cApp: useEffect empty deps", "color: MediumTurquoise");
    return () => {
      console.log(
        "%cApp: useEffect empty deps cleanup",
        "color: MediumTurquoise"
      );
    };
  }, []);

  useEffect(() => {
    // 4.3 Next, we get our useEffects with dep
    console.log("%cApp: useEffect with dep", "color: HotPink");
    return () => {
      console.log("%cApp: useEffect with dep cleanup", "color: HotPink");
    };
  }, [showChild]);

  const element = (
    <>
      <h3>Open console!!</h3>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={(e) => setShowChild(e.target.checked)}
        />{" "}
        show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 30,
          width: 30,
          border: "solid",
        }}
      >
        {/* When toggle showChild and the Child component is in the DOM, then to remove the child from the page, React unmount the component and call ALL of the cleanups for ALL of the useEffects that that child had going. Because we're unmounting this component */}
        {showChild ? <Child /> : null}
      </div>
    </>
  );

  // 3. Create this element and then we get a log to the console for app render end. Once that happens, React actually is updating the DOM (useEffect)
  // You'll notice that we get to this line of code before we start rendering the child (<Child />).
  // The important thing to remember here is that just because you create a React element, doesn't mean that React element's function is going to get called, because you're not calling the function, React is.
  console.log("%cApp: render end", "color: MediumSpringGreen");

  return element;
}

export default App;
