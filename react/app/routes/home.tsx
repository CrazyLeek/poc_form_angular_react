import type { Route } from "./+types/home";
import { Form } from "../form/form";
import tapotonsLogo from "../../public/tapotons-logo.svg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <header className="w-screen bg-mainColor sticky top-0">
        <div className="flex items-center ml-[25%]">
          <img
            src={tapotonsLogo}
            alt="Logo de Tapotons"
            className="w-25 invert"
          />
          <p className="invert font-bold text-4xl">Tapotons</p>
        </div>
      </header>
      <div className="flex pl-[25%] w-screen bg-bgColor">
        <Form />
      </div>
    </>
  );
}
