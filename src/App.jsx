
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Cterm from '../src/Cterm.jsx';
import Info from '../src/Info.jsx';

export default function App() {
	return (
		<Router>
            		<Routes>
                		<Route exact path="/" element={<Cterm/>}/>
		                <Route path="/info" element={<Info/>}/>
            		</Routes>
	        </Router>
	);
}
