import DBQueryContext from "@/contexts/DBQuery";
import usePilot from "@/hooks/usePilot";
import { useContext, useEffect, useState } from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button } from "@mui/material";
import RubberButton from "@/components/buttons/rubberButton/RubberButton";

export default function VersionControl() {
   const [expanded, setExpanded] = useState(false);
   const [versions, setVersions] = useState([]);
   const { doc } = useContext(DBQueryContext);
   const { getPilotVersions, newVersion, switchVersion } = usePilot();
   const currentVersion = versions.find(item => item.version === doc?.version);

   useEffect(() => {
      if (!doc?._id) return;

      getPilotVersions(doc._id).then(setVersions).catch(console.error);
   }, [doc?._id]);
   
   const handleVersionSelect = async (version) => {
      if (!doc?._id) return;

      try {
         await switchVersion(doc._id, version);
         window.location.reload(); // Reload the page to reflect the version change
      } catch (error) {
         console.error(error);
      }
   }

   const handleCreateVersion = async () => {
      if (!doc?._id) return;

      try {
         await newVersion(doc._id);
         window.location.reload(); // Reload the page to reflect the version change
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <div className="version-control" onMouseLeave={() => setExpanded(false)}>
         <RubberButton className="version-control-header" fullWidth onClick={() => setExpanded(!expanded)}>
            <div className="version-title">
               <label>Pilot Version</label>
               <span>{currentVersion?.versionName}</span>
            </div>

            {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
         </RubberButton>

         {expanded && (
            <div className="version-control-body">
               <div className="version-list">
                  {versions.map((item) => (
                     <Button
                        fullWidth
                        key={item._id}
                        color="tertiary"
                        onClick={() => handleVersionSelect(item.version)}
                        disabled={item.version === currentVersion?.version}
                        className={`version-item ${item.version === currentVersion?.version ? 'active' : ''}`}
                     >
                        <div className="version-info">
                           <span className="version-name">{item.versionName}</span>
                           {item.description && <p className="version-description">{item.description}</p>}
                        </div>
                     </Button>
                  ))}
               </div>

               <div className="version-control-footer">
                  <RubberButton 
                     color="success"
                     onClick={handleCreateVersion}
                     fullWidth
                  >Create Version</RubberButton>
               </div>
            </div>
         )}
      </div>
   );
}
