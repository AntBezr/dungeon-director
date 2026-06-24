import { Navigate, Route, Routes } from 'react-router-dom';

import { CampaignWorkspacePage } from '@pages/campaign-workspace';
import { HomePage } from '@pages/home';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/campaign-workspace" element={<CampaignWorkspacePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
