import { Navigate, Route, Routes } from 'react-router-dom';

import { CampaignWorkspacePage } from '@pages/campaign-workspace';
import { GameMasterScreenPage } from '@pages/game-master-screen';
import { HomePage } from '@pages/home';
import { SceneEditorPage } from '@pages/scene-editor';

export function AppRouter() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/campaign-workspace/:gameUuid" element={<CampaignWorkspacePage />} />
      <Route path="/game-master-screen/:gameUuid" element={<GameMasterScreenPage />} />
      <Route path="/scene-editor/:gameUuid" element={<SceneEditorPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
