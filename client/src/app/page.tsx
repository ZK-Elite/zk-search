import SearchBox from "../components/searchbox";
import Image from "next/image";
import logoImg from "../../public/logo.svg";

export default function Home() {
  return (
    <>
      <main
        className="w-screen h-screen relative flex items-center bg-[#00111A] dark:bg-[#CBF8FF] justify-center"
        style={{
          backgroundImage: "url('images/bg/bg-block.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute -translate-y-[8.5vh] flex flex-col justify-center items-center">
          <div className="p-3 mb-8 dark:backdrop-blur-2xl dark:rounded-xl dark:bg-[#FFFFFF66] w-44 aspect-[12/9] flex justify-center items-center">
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
    </>
  );
}
