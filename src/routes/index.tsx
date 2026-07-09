import { createFileRoute } from "@tanstack/react-router";
import SolarLanding from "@/components/SolarLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SolarGDL — Paneles Solares en Guadalajara" },
      {
        name: "description",
        content:
          "Instalación de paneles solares, calentadores y baterías de respaldo en Guadalajara, Zapopan, Tlaquepaque y Tonalá. Cotización gratis.",
      },
      { property: "og:title", content: "SolarGDL — Paneles Solares en Guadalajara" },
      {
        property: "og:description",
        content:
          "Ahorra desde el día 1 con energía solar. Sistemas residenciales y comerciales con 5 años de garantía.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <SolarLanding />;
}
