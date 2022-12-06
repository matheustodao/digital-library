/* eslint-disable react/prop-types */
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import { Tooltip } from '@components/Charts/utils/tooltip'
import { ResponsiveLine } from '@nivo/line'
import { GraphLineType } from '@type/lib/nivo'

interface ResponsiveLineCustomProps {
  data: GraphLineType[]
  _containerProps?: BoxProps
}

export default function ResponsiveLineCustom({ data, _containerProps }: ResponsiveLineCustomProps) {
  const textColor = useColorModeValue('#252525', '#fff')
  const tooltipTextColor = useColorModeValue('#fff', '#252525')

  return (
    <Box w="full" h="540px" {..._containerProps}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        enableGridX={false}
        enableGridY={false}
        lineWidth={3}
        enablePoints={false}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-14}
        enableArea={true}
        areaBlendMode="color-dodge"
        areaOpacity={0.1}
        useMesh={true}
        enableCrosshair
        colors={{ scheme: 'category10' }}
        tooltip={({ point: { data, borderColor } }) => (
          <Tooltip.Container>
            <Tooltip.Bullet customColor={borderColor} />
            <span>
              {data.xFormatted}: <strong>{data.yFormatted}</strong>
            </span>
          </Tooltip.Container>
        )}
        theme={{
          textColor,
          tooltip: {
            container: {
              color: tooltipTextColor,
              fontWeight: 'normal'
            }
          }
        }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 94,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </Box>
  )
}
