const contentNode = document.getElementById('contents');
const consistents = ['Africa','America','Asia','Australia','Europe'];
const message = consistents.map(c => `Hello ${c}!`).join(' ');
const component = <h1>{message}</h1>;
ReactDOM.render(component, contentNode);
