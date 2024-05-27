import SearchBox from "../components/searchbox";
import Image from "next/image";
import logoImg from "../../public/logo.svg";

export default function Home() {
  return (
    <>
      <div
        className="flex items-center bg-[#00111A] dark:bg-[#CBF8FF] justify-center"
        style={{
          backgroundImage: "url(images/bg/bg-dark.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <main className="flex flex-col items-center 2xl:pt-[20rem] xl:pt-[17.2rem] lg:pt-[17.2rem] md:pt-[17.2rem] pt-[17.2rem]  h-screen">
          <div className="flex flex-col items-center w-full">
            <div className="dark:bg-[#FFFFFF66] p-3 mb-8 dark:backdrop-blur-[35px] dark:rounded-[14px] dark:border-2 dark:border-[#38E5FF]">
              <Image
                className="m-auto object-cover"
                width="75"
                height="25"
                src={logoImg}
                alt="logo"
                priority
              />
            </div>
            <SearchBox />
          </div>
        </main>
      </div>
    </>
  );
}
