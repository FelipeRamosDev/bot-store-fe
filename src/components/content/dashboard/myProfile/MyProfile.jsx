'use client';

import MyProfileTopPage from "./MyProfileTopPage";
import MyProfileInfos from "./MyProfileInfos";

export default function MyProfile() {
   return (
      <div className="my-profile">
         <MyProfileTopPage />
         <MyProfileInfos />
      </div>
   );
}
