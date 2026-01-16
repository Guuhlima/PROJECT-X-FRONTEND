import CardNav from "@/components/CardNav";
import { Profile } from "../components/Profile";
import logo from '../../../public/Trackify_logo.png';
import { items } from "@/app/shared/data/Items"; 

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
    </div>
  );
}
