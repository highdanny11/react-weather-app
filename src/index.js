import React from 'react';
import { createRoot } from 'react-dom/client'
import 'normalize.css'
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<React.StrictMode>
  <App />
</React.StrictMode>)
serviceWorkerRegistration.register();
// root.render(<App />)
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
