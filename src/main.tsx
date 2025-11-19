import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppContainer from './components/Containers/AppContainerComponent'
import Container from './components/Containers/ContainerComponent'
import CardContainer from './components/Containers/CardContainer'
import ColorSwatch from './components/Elements/ColorSwatchComponent'
import GridContainer from './components/Containers/GridContainerComponent'
import Blank from './components/Elements/BlankComponent'
import WallpapersExplorer from './components/Elements/WallpapersExplorerComponent'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContainer>
      <Container className="flex flex-col gap-4 h-screen my-8" style={{ maxWidth: '1160px' }}>
        <h1 style={{ fontWeight: 'bold' }}>Library</h1>
        <GridContainer columns={2} gap="2rem">
          <CardContainer className="flex flex-col gap-4" title="Colors">
            <ColorSwatch color="rgba(60, 160, 80)" />
            <ColorSwatch color="rgba(160, 40, 70)" />
            <ColorSwatch color="#202020" />
            <ColorSwatch color="rgba(80, 100, 190)" />
            <ColorSwatch color="#e0e0e0" />
            <ColorSwatch color="rgba(80, 190, 100)" />
          </CardContainer>
          <Blank />
        </GridContainer>
        <CardContainer className="flex flex-col gap-4" title="Wallpapers">
          <WallpapersExplorer />
        </CardContainer>
      </Container>
    </AppContainer>
  </StrictMode>
)
