module.exports = {
  presets: [
    // runtime: 'automatic' -> Apply new jsx transform
    // Runtime automatic with React 17+ allows not importing React in files only using JSX (no state or React methods)
    // read more: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
