import type { Route } from "./+types/home";
import { Form } from "../form/form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tapotons - Formulaire" },
    { name: "Playground form", content: "Hello" },
  ];
}

export default function Home() {
  return (
    <>
      <header className=" bg-mainColor sticky top-0">
        <div className="flex items-center ml-[25%]">
          <img
            src="/tapotons-logo.svg"
            alt="Logo de Tapotons"
            className="w-25 invert"
          />
          <p className="invert font-bold text-4xl">Tapotons</p>
        </div>
      </header>
      <div className="flex pl-[25%] bg-bgColor">
        <Form />
      </div>
    </>
  );
}
