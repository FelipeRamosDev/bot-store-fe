import RubberButton from "@/components/buttons/rubberButton/RubberButton";
import Card from "@/components/common/card/Card";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function PageNavigationFooter({ previousPage, nextPage }) {
   return (
      <Card className="page-navigation-footer container" padding="l">
         {previousPage && (
            <RubberButton className="previous-page-button" startIcon={<ArrowBack />} href={previousPage.link} isLink>
               {previousPage.label}
            </RubberButton>
         )}

         {nextPage && (
            <RubberButton className="next-page-button" endIcon={<ArrowForward />} href={nextPage.link} isLink>
               {nextPage.label}
            </RubberButton>
         )}
      </Card>
   );
}
