import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import { Tooltip } from '@components/Charts/utils/tooltip'
import { ResponsivePie } from '@nivo/pie'
import { GraphPieType } from '@type/lib/nivo'

interface ResponsivePieCustomProps {
  data: GraphPieType[]
  _containerProps?: BoxProps
}

export default function ResponsivePieCustom({ data, _containerProps }: ResponsivePieCustomProps) {
  const textColor = useColorModeValue('#252525', '#fff')
  const tooltipTextColor = useColorModeValue('#fff', '#252525')

  return (
    <Box w="500px" h="350px" {..._containerProps}>
      <ResponsivePie
        data={data}
        margin={{ right: 170, left: 32 }}
        startAngle={16}
        sortByValue={true}
        innerRadius={0.55}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'category10' }}
        borderWidth={1}
        borderColor={{ theme: 'background' }}
        enableArcLinkLabels={false}
        theme={{
          textColor,
          tooltip: {
            container: {
              color: tooltipTextColor,
              fontWeight: 'normal'
            }
          }
        }}
        tooltip={({ datum: { data, color } }) => (
          <Tooltip.Container>
            <Tooltip.Bullet customColor={color} />
            <span>
              {data.id}: <strong>{data.value}</strong>
            </span>
          </Tooltip.Container>
        )}
        legends={[
          {
            anchor: 'top-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 100,
            itemsSpacing: 12,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </Box>
  )
}
