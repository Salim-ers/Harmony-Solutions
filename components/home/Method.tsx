import { processSteps } from "@/data/offers";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RouteSteps } from "./RouteSteps";

export function Method() {
  return (
    <section id="methode" aria-labelledby="methode-title" className="bg-mist py-24 lg:py-36">
      <div className="container-x">
        <SectionHeader
          label="Méthode"
          titleId="methode-title"
          title="Du premier échange à la mise en ligne."
          intro="Un interlocuteur unique, des étapes claires et votre validation avant chaque passage à la suivante."
        />
        <div className="mt-16 lg:mt-24">
          <RouteSteps
            columns={5}
            steps={processSteps.map((step, i) => ({
              title: step.title,
              text: step.text,
              stateLabel: `Étape ${String(i + 1).padStart(2, "0")}`,
              emphasis: i === 0 ? "current" : "done",
            }))}
          />
        </div>
      </div>
    </section>
  );
}
