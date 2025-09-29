import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import LoginPage from './pages/login';
import ClientGalleryView from './pages/client-gallery-view';
import PrivacyAndSettings from './pages/privacy-and-settings';
import ShareAndPublish from './pages/share-and-publish';
import Register from './pages/register';
import CollectionManagement from './pages/collection-management';
import PhotoUpload from './pages/photo-upload';
import ClientManagement from './pages/client-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/client-gallery-view" element={<ClientGalleryView />} />
        <Route path="/privacy-and-settings" element={<PrivacyAndSettings />} />
        <Route path="/share-and-publish" element={<ShareAndPublish />} />
        <Route path="/register" element={<Register />} />
        <Route path="/collection-management" element={<CollectionManagement />} />
        <Route path="/photo-upload" element={<PhotoUpload />} />
        <Route path="/client-management" element={<ClientManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
