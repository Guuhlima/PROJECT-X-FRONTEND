import CardNav from "@/app/shared/components/CardNav";
import { Profile } from "../../shared/components/Profile";
import logo from '../../../public/Trackify_logo.png';
import { items } from "@/app/shared/data/Items";
import { CardTrack } from "./components/CardTrack";

export default function Page() {

  return (
    <div className="fixed inset-0">
      <Profile
        name="Gustavo Lima"
        className="mt-3.5 w-12 h-12"
      />
      <CardNav
        logo={logo}
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <CardTrack />
    </div>
  );
}
