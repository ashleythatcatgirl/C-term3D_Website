
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Toaster } from "./components/ui/sonner.jsx";

import Home from './pages/Home.jsx';
import Cterm from './pages/Cterm.jsx';
import Library from './pages/Library.jsx';
import Info from './pages/Info.jsx';

export default function App() {
	return (
		<>
		<Router>
            		<Routes>
                		<Route exact path="/" element={<Home/>}/>
		                <Route path="/cterm" element={<Cterm/>}/>
		                <Route path="/library" element={<Library/>}/>
		                <Route path="/info" element={<Info/>}/>
            		</Routes>
            		<Toaster />
	       	</Router>
		</>
	);
}
