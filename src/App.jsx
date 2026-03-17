import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'
import LoginPage from './pages/LoginPage'
import AdminUsers from './pages/AdminUsers'
import PatientDashboard from './pages/PatientDashboard'
import BookAppointment from './pages/BookAppointment'
import AppointmentDetail from './pages/AppointmentDetail'
import MyAppointments from './pages/MyAppointments'
import MyPrescriptions from './pages/MyPrescriptions'
import MyReports from './pages/MyReports'
import ReceptionistQueue from './pages/ReceptionistQueue'
import AddPrescription from './pages/AddPrescription'
import DoctorQueue from './pages/DoctorQueue'
import AddReport from './pages/AddReport'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* all */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/login" />} />


            {/* admin */}
            <Route path="admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminUsers />
              </ProtectedRoute>
            } />


            {/* patient */}
            <Route path="patient" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } />
            <Route path="patient/book" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <BookAppointment />
              </ProtectedRoute>
            } />
            <Route path="patient/appointments" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <MyAppointments />
              </ProtectedRoute>
            } />
            <Route path="patient/appointments/:id" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <AppointmentDetail />
              </ProtectedRoute>
            } />
            <Route path="patient/prescriptions" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <MyPrescriptions />
              </ProtectedRoute>
            } />
            <Route path="patient/reports" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <MyReports />
              </ProtectedRoute>
            } />


            {/* receptionist */}
            <Route path="receptionist" element={
              <ProtectedRoute allowedRoles={['receptionist']}>
                <ReceptionistQueue />
              </ProtectedRoute>
            } />


            {/* doctor */}
            <Route path="doctor" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorQueue />
              </ProtectedRoute>
            } />
            <Route path="doctor/add-prescription" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <AddPrescription />
              </ProtectedRoute>
            } />
            <Route path="doctor/add-report" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <AddReport />
              </ProtectedRoute>
            } />
          </Route>


          {/* others */}
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App