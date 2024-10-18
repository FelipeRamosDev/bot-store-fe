import LogoIconDark from "@/components/common/logo/LogoIconDark";
import TexturePaperEllipses from "@/components/common/texturePaperEllipses/TexturePaperEllipses";
import { parseClassName } from "@/helpers/parser";
import { Button } from "@mui/material";

const BUTTON_LABEL = 'Click to Start';

export default function SectionHeaderBanner({
   className,
   description,
   noAnimation,
   title,
   buttonLabel = BUTTON_LABEL,
   imageSize = 170,
   CustomImage = LogoIconDark,
   onButtonClick = () => {},
   ...props
}) {
   return (
      <TexturePaperEllipses
         className={parseClassName(className, [ 'create-first-pilot' ])}
         padding="s"
         noAnimation={noAnimation}
         {...props}
      >
         {title && <h4 className="banner-title">{title}</h4>}
         {description && <p className="banner-descr">{description}</p>}

         <Button
            className="create-button"
            variant="contained"
            color="rubber"
            onClick={onButtonClick}
         >{buttonLabel}</Button>

         <CustomImage className="icon" fontSize={imageSize} />
      </TexturePaperEllipses>
   );
}
