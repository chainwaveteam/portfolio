/** @jsx jsx */
import { jsx } from 'theme-ui'
import loadable from '@loadable/component'
import { useState } from 'react'

import Container from '../../../components/Container'
import Fade from '../../../components/Fade'
import Button from '../../../components/Button'
import { Props, ProjectState } from './types'
import ProjectSlider from './ProjectSlider'

const OthersProjects = loadable(() => import('./OthersProjects'))

export default function PortfolioSection({ nodes }: Props) {
  const [displayAll, setDisplayAll] = useState(false)

  // Filter featured projects VS others into two arrays
  const initialState: ProjectState = { featured: [], others: [] }
  const { featured, others } = nodes.reduce(
    (prev, curr) =>
      curr.data?.isfeatured === 'yes'
        ? { ...prev, featured: [...prev.featured, curr] }
        : { ...prev, others: [...prev.others, curr] },
    initialState
  )

  return (
    <Container id="portfolio" section>
      <Fade>
        <ProjectSlider nodes={featured} />

        {displayAll && <OthersProjects nodes={others} />}

        {displayAll || (
          <Button
            sx={{ mt: 4, mx: 'auto', display: 'block' }}
            onClick={() => setDisplayAll(true)}
          >
            Tout afficher
          </Button>
        )}
      </Fade>
    </Container>
  )
}