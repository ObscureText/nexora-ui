import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Landing from "./pages/Landing";

import ProtectedRoute from "./components/ProtectedRoute";
import IndividualDashboard from "./pages/IndividualDashboard";
import EstablishmentDashboard from "./pages/EstablishmentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/individual/dashboard"
                    element={
                        <ProtectedRoute allowedRole="INDIVIDUAL">
                            <IndividualDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/establishment/dashboard"
                    element={
                        <ProtectedRoute allowedRole="ESTABLISHMENT_OWNER">
                            <EstablishmentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute allowedRole="SERVICE_PROVIDER_ADMIN">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
