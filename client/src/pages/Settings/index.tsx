import { Outlet } from 'react-router-dom'
import { Grid, GridItem } from '@chakra-ui/react'
import SettingNavigation from '@components/Settings/Nav'

export default function SettingsPage() {
  return (
    <Grid templateColumns="171px 1fr" templateRows="repeat(2, 1fr)" h="min-content" columnGap="52px">
      <GridItem
        colStart={1}
        colEnd={1}
        rowEnd={0}
        rowStart={1}
        position="relative"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <SettingNavigation />
      </GridItem>
      <GridItem colStart={2} colEnd={2}>
        <Outlet />
      </GridItem>
    </Grid>
  )
}
