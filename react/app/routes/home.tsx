import type { Route } from "./+types/home";
import { Form } from "../form/form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (

    <>

      <div className="w-screen bg-mainColor">

        <p> salut</p>
      </div>
      <div className="flex items-center justify-center w-screen bg-orange-200">
        <Form />
      </div>
    
    </>
    
      
    )

    ;
}
