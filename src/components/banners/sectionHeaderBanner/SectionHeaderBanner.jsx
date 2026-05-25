import RoundIconButton from "@/components/buttons/roundButton/RoundIconButton";
import LogoIconDark from "@/components/common/logo/LogoIconDark";
import TexturePaperEllipses from "@/components/common/texturePaperEllipses/TexturePaperEllipses";
import { parseClassName } from "@/helpers/parser";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

const BUTTON_LABEL = 'Click to Start';

export default function SectionHeaderBanner({
   className,
   type,
   description,
   noAnimation,
   title,
   buttonLabel = BUTTON_LABEL,
   imageSize = 170,
   CustomImage = LogoIconDark,
   useRoundButton,
   onButtonClick = () => {},
   ...props
}) {
   return (
      <TexturePaperEllipses
         className={parseClassName(className, [ 'create-first-pilot', type ])}
         padding="s"
         noAnimation={noAnimation}
         {...props}
      >
         {title && <h4 className="banner-title">{title}</h4>}
         {description && <p className="banner-descr">{description}</p>}

         {!useRoundButton && <Button
            className="create-button"
            variant="contained"
            color="rubber"
            onClick={onButtonClick}
         >{buttonLabel}</Button>}

         {useRoundButton && <RoundIconButton
            Icon={Add}
            color="rubber"
            variant="contained"
            onClick={onButtonClick}
         />}

         <CustomImage className="icon" fontSize={imageSize} />
      </TexturePaperEllipses>
   );
}
