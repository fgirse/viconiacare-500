import { Phone, ClipboardList, HeartHandshake, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: Phone, title: "1. Kontakt aufnehmen", desc: "Rufen Sie uns an oder schreiben Sie uns – wir sind für Sie da." },
  { icon: ClipboardList, title: "2. Beratungsgespräch", desc: "Wir kommen zu Ihnen und besprechen Ihren individuellen Pflegebedarf." },
  { icon: HeartHandshake, title: "3. Pflegeplan erstellen", desc: "Gemeinsam erstellen wir einen maßgeschneiderten Pflegeplan." },
  { icon: CheckCircle2, title: "4. Pflege starten", desc: "Unser qualifiziertes Team beginnt mit der Versorgung bei Ihnen zu Hause." },
];

const HowItWorksSection = () => {
  return (
    <section id="wie-funktionierts" className="section-padding mb-32">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">So einfach geht's</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground">
            Wie funktioniert's?
          </h2>
          <p className="text-muted-foreground text-lg">
            In vier einfachen Schritten zu Ihrer individuellen Pflege.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.title} className="text-center group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
