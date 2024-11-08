'use client';
import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { darkTheme } from '@/style/darkTheme';
import { parseClassName } from '@/helpers/parser';
import defaultChartOptions from '../defaultChartOptions';
import ContentHeader from '@/components/headers/contentHeader/ContentHeader';
import Card from '@/components/common/card/Card';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import HelpTooltip from '@/components/tooltips/helpTooltip/HelpTooltip';
import { Button, ButtonGroup } from '@mui/material';

export default function CutLineChartBase({
   className,
   headerTitle,
   HeaderToolbar,
   tooltipHeader,
   TooltipContent,
   chartOptions,
   cutValue = 0,
   dataSet = [],
   switcherSet = []
}) {
   const [ switcher, setSwitcher ] = useState('$');
   const chartSpot = useRef();
   const chart = useRef();
   const cutLineChart = useRef();
   const dupCheck = {};

   const topLineColor = darkTheme.palette.success.main;
   const topFillColor1 = topLineColor + '47';
   const topFillColor2 = topLineColor + '0d';
   const bottomLineColor =  darkTheme.palette.error.main;
   const bottomFillColor1 = bottomLineColor + '0d';
   const bottomFillColor2 = bottomLineColor + '47';

   className = parseClassName(className, [ 'cutline-chart-base' ]);
   chartOptions = { ...defaultChartOptions, ...chartOptions };

   const switcherData = switcherSet.find(item => item.value === switcher);
   if (switcherData?.data) {
      dataSet = switcherData?.data;
   }

   dataSet = dataSet.map(data => {
      if (dupCheck[data.time]) return;
      dupCheck[data.time] = true;

      data.time = new Date(data.time).getTime();
      if (!data.value) {
         data.value = 0;
      }

      return data;
   }).filter(item => item);

   const isSelected = (value) => {
      if (switcher === value) {
         return 'selected';
      } else {
         return '';
      }
   }

   const handleSwitcher = (value) => {
      setSwitcher(value);
   }

   useEffect(() => {
      if (!chart.current && chartSpot.current) {
         chart.current = createChart(chartSpot.current, chartOptions);

         cutLineChart.current = chart.current.addBaselineSeries({
            baseValue: { type: 'price', price: cutValue },
            topLineColor,
            topFillColor1,
            topFillColor2,
            bottomLineColor,
            bottomFillColor1,
            bottomFillColor2
         });

         cutLineChart.current.setData(dataSet);
         chart.current.timeScale().fitContent();
      } else if (chartSpot.current && cutLineChart.current && chart.current) {
         cutLineChart.current.setData(dataSet);
         chart.current.timeScale().fitContent();
      }
   }, [ chartOptions, cutValue, topLineColor, topFillColor1, topFillColor2, bottomLineColor, bottomFillColor1, bottomFillColor2, dataSet ]);

   return (
      <Card className={className} padding="s" elevation={35}>
         {headerTitle && <ContentHeader Toolbar={HeaderToolbar}>
            <SsidChartIcon />
            <h3 className="header-title">{headerTitle}</h3>

            <>
               {(TooltipContent || tooltipHeader) && (
                  <HelpTooltip headerTitle={tooltipHeader} iconSize="medium" style={{ marginRight: 'auto' }}>
                     {TooltipContent && <TooltipContent />}
                  </HelpTooltip>
               )}

               {switcherSet.length > 0 && (
                  <ButtonGroup className="switcher" variant="contained" color="rubber">
                     {switcherSet.map((button, i) => (
                        <Button
                           key={button.value + i}
                           className={isSelected(button.value)}
                           onClick={() => handleSwitcher(button.value)}
                        >
                           {button.label}
                        </Button>
                     ))}
                  </ButtonGroup>
               )}
            </>
         </ContentHeader>}

         <div ref={chartSpot} className="chart-spot"></div>
      </Card>
   );
}

