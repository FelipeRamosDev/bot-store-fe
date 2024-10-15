import { darkTheme } from '@/style/darkTheme';

const defaultChartOptions = {
   autoSize: true,
   timeScale: {
      fixLeftEdge: true,
      tickMarkFormatter: (time) => {
         const timeString = new Date(time).toDateString();
         const [ week, month, day ] = timeString.split(' ');

         return `${day} ${month}`;
      }
   },
   localization: {
      timeFormatter: (time) => {
         return new Date(time).toLocaleString()
      }
   },
   layout: {
      textColor: darkTheme.palette.text.darken,
      background: {
         type: 'solid',
         color: 'transparent'
      }
   },
   grid: {
      vertLines: {
         style: 3,
         color: darkTheme.palette.grey.softMark
      },
      horzLines: {
         color: darkTheme.palette.grey.softMark
      }
   }
};

export default defaultChartOptions;
