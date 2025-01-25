
import {Carousel} from "@/components/mainSection/carousel";
import {OrderBox} from "@/components/mainSection/orderBox";
import {SuperBoxes} from "@/components/mainSection/superBoxes/superBoxes";
import {News} from "@/components/mainSection/newsSection/news";


export default function Home() {
  return (
      <div className={"w-full flex flex-col"}>
          <div className={"md:min-w-[700px] h-[480px] flex flex-col relative"} id="main-content">
              <Carousel/>
              <OrderBox/>
          </div>
          <div className={"mt-4 md:mx-32 lg:mx-24"}>
              <SuperBoxes/>
          </div>
          <div className={"mt-4 md:mx-24 lg:mx-20"}>
              <News/>
          </div>
      </div>
  );
}
