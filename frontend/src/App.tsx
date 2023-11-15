import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HomePage } from './components/HomePage/HomePage';
import { Household } from './components/Household/Household';
import { Bathroom } from './components/Bathroom/Bathroom';
import { ViewReport } from './components/ViewReport/ViewReport';
import{BrowserRouter,Routes, Route} from 'react-router-dom';
import { Appliance } from './components/Appliance/Appliance';
import { FinalPage } from './components/FinalPage/FinalPage';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/Household' element={<Household />} />
    <Route path='/Bathroom' element={<Bathroom />} />
    <Route path='/Appliance' element={<Appliance/>} />
    <Route path='/ViewReport' element={<ViewReport />} />
    <Route path='/FinalPage' element={<FinalPage />} />

   </Routes>
   
   
   </BrowserRouter>
    
    
    );
}

export default App;

