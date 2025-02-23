import React from "react";
import { Routes, Route } from "react-router-dom";
import Naming from "../pages/Naming";
import Layout from "../Layout/Layout";
import PeriodLength from "../pages/PeriodLength";
import CircleLength from "../pages/CircleLength";

// import About from "../pages/About";
// import Blogs from "../pages/Blogs";
// import BlogsDetails from "../pages/BlogsDetails";
// import Layout from "../Components/Layout/Layout.jsx";
// import NotFound from "../pages/NotFound.jsx";

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Naming />} />
        <Route path="/periodlength" element={<PeriodLength />} />
        <Route path="/circlelength" element={<CircleLength />} />
        {/*<Route path="/Search" element={<Search />} />
        <Route path="/books/:id" element={<BookDetails />} /> */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogsDetails />} />
        <Route path="*" element={<NotFound />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Layout>
  );
}
