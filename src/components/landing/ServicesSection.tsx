import {
  Heart,
  Stethoscope,
  Home,
  Users,
  Brain,
  HandHeart,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Grundpflege",
    desc: "Körperpflege, Ernährung und Mobilität – wir unterstützen bei den täglichen Grundbedürfnissen.",
  },
  {
    icon: Stethoscope,
    title: "Behandlungspflege",
    desc: "Medizinische Versorgung nach ärztlicher Verordnung: Wundversorgung, Injektionen und mehr.",
  },
  {
    icon: Home,
    title: "Hauswirtschaft",
    desc: "Einkaufen, Kochen, Reinigung – wir sorgen für ein gepflegtes Zuhause.",
  },
  {
    icon: Users,
    title: "Begleitung",
    desc: "Arztbesuche, Spaziergänge und soziale Teilhabe für mehr Lebensqualität.",
  },
  {
    icon: Brain,
    title: "Demenzbetreuung",
    desc: "Einfühlsame Betreuung für Menschen mit Demenz – mit Geduld und Verständnis.",
  },
  {
    icon: HandHeart,
    title: "Palliativpflege",
    desc: "Würdevolle Begleitung in der letzten Lebensphase für Betroffene und Angehörige.",
  },
  {
    icon: ShieldCheck,
    title: "Verhinderungspflege",
    desc: "Vertretung pflegender Angehöriger bei Urlaub, Krankheit oder sonstiger Verhinderung.",
  },
];

const ServicesSection = () => {
  return (
    <section id="leistungen" className="section-padding section-alt mb-24">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">Unsere Leistungen</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground">
            Umfassende Pflege & Betreuung
          </h2>
          <p className="text-muted-foreground text-lg">
            Individuell auf Ihre Bedürfnisse abgestimmt – von der Grundpflege bis zur palliativen Versorgung.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
