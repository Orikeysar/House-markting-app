import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./Pages/Explore";
import ForgotPassword from "./Pages/ForgotPassword";
import Offers from "./Pages/Offers";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PraivteRoute from "./Components/PraivteRoute";
import Category from "./Pages/Category";
import CreateListing from "./Pages/CreateListing";
import Listing from "./Pages/Listing";
import Contact from "./Pages/Contact";
import EditListing from "./Pages/EditListing";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />        
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/offers" element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
{/* //to render component inside of component and route you need to route inside route */}
          <Route path='/profile' element={<PraivteRoute/>}>
          <Route path="/profile" element={<Profile />} />
          </Route>
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/create-listing" element={<CreateListing />} />
         <Route path="/edit-listing/:listingId" element={<EditListing />} />
         <Route path="category/:categoryName/:listingId" element={<Listing />} />
         <Route path="contact/:landlordId" element={<Contact />} />
        </Routes>
        <Navbar/>
      </Router>
      <ToastContainer position="top-center"/>
    </>
  );
}

export default App;
