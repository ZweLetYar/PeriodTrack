import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "../pages/UserIntroduction/LogIn";
import Register from "../pages/UserIntroduction/Register";
import Naming from "../pages/UserIntroduction/Naming";
import Layout from "../Layout/Layout";
import PeriodLength from "../pages/UserIntroduction/PeriodLength";
import CircleLength from "../pages/UserIntroduction/CircleLength";

import RegularOrNot from "../pages/UserIntroduction/RegularOrNot";
import Discomfort from "../pages/UserIntroduction/Discomfort";
import LastPeriodDate from "../pages/UserIntroduction/LastPeriodDate";
import ReproductiveDisorder from "../pages/UserIntroduction/ReproductiveDisorder";
import AboutSleep from "../pages/UserIntroduction/AboutSleep";
import Home from "../pages/MainApp/Home";
import { AuthContext } from "../Context/AuthContext";
import LogPeriodForm from "../pages/MainApp/LogPeriodForm";
import Symptoms from "../pages/MainApp/Symptoms";
import LogSymptoms from "../pages/MainApp/LogSymptoms";
import PeriodCalendar from "../pages/MainApp/PeriodCalender";
import BlogDetail from "../pages/MainApp/BlogDetail";
import DailyNotes from "../pages/MainApp/DailyNotes";
import BlogList from "../Components/BlogList";

export default function AppRoutes() {
  let { user } = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={!!user ? <Home /> : <LogIn />} />
        <Route
          path="/bloglist/:id"
          element={!!user ? <BlogDetail /> : <LogIn />}
        />
        <Route path="/bloglist" element={!!user ? <BlogList /> : <LogIn />} />
        <Route
          path="/dailynotes"
          element={!!user ? <DailyNotes /> : <LogIn />}
        />
        <Route
          path="/periodcalender"
          element={!!user ? <PeriodCalendar /> : <LogIn />}
        />
        <Route
          path="/logsymptoms"
          element={!!user ? <LogSymptoms /> : <LogIn />}
        />
        <Route path="/symptoms" element={!!user ? <Symptoms /> : <LogIn />} />
        <Route
          path="/logperiodform"
          element={!!user ? <LogPeriodForm /> : <LogIn />}
        />
        <Route path="/login" element={!user ? <LogIn /> : <Home />} />
        <Route path="/register" element={!user ? <Register /> : <Home />} />
        <Route path="/naming" element={<Naming />} />
        <Route path="/periodlength" element={<PeriodLength />} />
        <Route path="/circlelength" element={<CircleLength />} />
        <Route path="/regularornot" element={<RegularOrNot />} />
        <Route path="/discomfort" element={<Discomfort />} />
        <Route path="/lastperioddate" element={<LastPeriodDate />} />
        <Route
          path="/reproductivedisorder"
          element={<ReproductiveDisorder />}
        />
        <Route path="/aboutsleep" element={<AboutSleep />} />

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
