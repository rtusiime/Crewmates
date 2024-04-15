import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Layout from './routes/Layout';
import About from './routes/About'; // Make sure this path is correct
import NotFound from './routes/NotFound'; // Assuming you have a NotFound Component
import './index.css';
import DetailView from './routes/DetailView';
import Chart from 'chart.js/auto';
import centerTextPlugin from './plugins/centerTextPlugin'; // Import the custom plugin
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

// If you're also using the datalabels plugin, ensure it is registered as well
Chart.register(centerTextPlugin); // Register the plugin here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="edit/:name" element={<EditPost />} />
          <Route path="pokemon/:name" element={<DetailView />} />
          <Route path="/create" element={<CreatePost />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);