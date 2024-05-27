import SearchBox from "../components/searchbox";
import Image from "next/image";
import logoImg from "../../public/logo.svg";

export default function Home() {
  return (
    <>
      <main
        className="relative flex justify-center items-center bg-[#00111A] dark:bg-[#CBF8FF] w-screen h-screen"
        style={{
          backgroundImage: "url('images/bg/bg-block.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute flex flex-col justify-center items-center -translate-y-[38%]">
          <div className="flex justify-center items-center dark:bg-[#FFFFFF66] dark:backdrop-blur-2xl mb-8 p-3 dark:rounded-xl w-44 aspect-[12/9]">
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
