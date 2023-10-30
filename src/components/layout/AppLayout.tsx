import HeaderApp from "~/components/layout/header/Header";
import Navigation from "~/components/layout/navigation/Navigation";
export default function AppLayout({ children }: any) {
  return (
    <>
      <div className="h-screen">
        <HeaderApp />
        <div className="min-h-custom flex">
          <div>
            <Navigation />
          </div>
          <div className="bg-primary-01 pl-[30px] 2xl:pl-[96px] 2xl:pr-[88px] pr-[30px] py-[24px] w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
