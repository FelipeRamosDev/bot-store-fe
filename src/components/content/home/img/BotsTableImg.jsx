import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import Card from '@/components/common/card/Card';
import Percent from '@/components/displays/percent/Percent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TerminatorIMG from '@/assets/avatar_demo/terminator.webp';
import KaiohIMG from '@/assets/avatar_demo/kaioh.webp';
import BenderIMG from '@/assets/avatar_demo/bender.webp';
import WallEIMG from '@/assets/avatar_demo/wall-e.webp';
import PeterGriffinIMG from '@/assets/avatar_demo/peter_griffin.webp';

const baseParams = {
   align: 'center',
   style: { minWidth: '3rem' }
};

const dummy = [
   { Avatar: TerminatorIMG, name: 'Terminator', score: 2431, avgDailyWins: 56, avgDailyLoses: 12, avgMonthlyWins: 325, avgMonthlyLoses: 140, dailyROI: 3, monthlyROI: 15 },
   { Avatar: KaiohIMG, name: 'Mr. Kaioh', score: 1845, avgDailyWins: 8, avgDailyLoses: 7, avgMonthlyWins: 150, avgMonthlyLoses: 26, dailyROI: -1, monthlyROI: 14 },
   { Avatar: BenderIMG, name: 'Bender', score: 1290, avgDailyWins: 56, avgDailyLoses: 12, avgMonthlyWins: 325, avgMonthlyLoses: 140, dailyROI: 4, monthlyROI: 22 },
   { Avatar: WallEIMG, name: 'Wall', score: 978, avgDailyWins: 56, avgDailyLoses: 12, avgMonthlyWins: 325, avgMonthlyLoses: 140, dailyROI: -0.45, monthlyROI: 12 },
   { Avatar: PeterGriffinIMG, name: 'Peter Grifin', score: 574, avgDailyWins: 56, avgDailyLoses: 12, avgMonthlyWins: 325, avgMonthlyLoses: 140, dailyROI: 3, monthlyROI: 5 },
];

export default function BotsTableImg() {
   return (
      <Card className="table-image" padding="m" elevation={80}>
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell {...baseParams} align="left">Avatar</TableCell>
                  <TableCell {...baseParams} align="left" sx={{ minWidth: '10rem' }}>Name</TableCell>
                  <TableCell {...baseParams}>Score</TableCell>
                  <TableCell {...baseParams} className="hide-mobile">Daily WINS/LOSES</TableCell>
                  <TableCell {...baseParams} className="hide-mobile">Daily ROI</TableCell>
                  <TableCell {...baseParams} className="hide-mobile">Monthly ROI</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {dummy.map((row) => (
                  <TableRow
                     key={row.name}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell>
                        <Avatar>
                           {row.Avatar && (
                              <Image
                                 className="avatar"
                                 src={row.Avatar}
                                 alt={row.name}
                                 height={40}
                                 width={0}
                                 quality={20}
                                 style={{ width: 'auto' }}
                              />
                           )}
                        </Avatar>
                     </TableCell>
                     <TableCell>
                        {row.name}
                     </TableCell>
                     <TableCell className="big-value" {...baseParams}>
                        <span className="profit">{row.score}</span>
                     </TableCell>
                     <TableCell className="big-value hide-mobile" {...baseParams}>
                        <span className="profit">{row.avgDailyWins}</span> / <span className="loss">{row.avgDailyLoses}</span>
                     </TableCell>
                     <TableCell className="big-value hide-mobile" {...baseParams}>
                        <Percent value={row.dailyROI} size="l" />
                     </TableCell>
                     <TableCell className="big-value hide-mobile" {...baseParams}>
                        <Percent value={row.monthlyROI} size="l" />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </Card>
   );
}
