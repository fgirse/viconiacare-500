import { Mail, MapPin, Phone, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="kontakt" className="section-padding section-alt mb-32">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">Kontakt</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground">
            Sprechen Sie uns an
          </h2>
          <p className="text-muted-foreground text-lg">
            Wir beraten Sie gerne – persönlich, telefonisch oder per E-Mail.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div id="email" className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground mb-1">E-Mail</h3>
                <a href="mailto:info@pflegehaus-hamburg.de" className="text-primary hover:underline">
                  info@pflegehaus-hamburg.de
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground mb-1">Telefon</h3>
                <a href="tel:+4940123456" className="text-primary hover:underline">
                  040 – 123 456
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground mb-1">Adresse</h3>
                <p className="text-muted-foreground">Musterstraße 42, 20095 Hamburg</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground mb-1">Bürozeiten</h3>
                <p className="text-muted-foreground">Mo – Fr: 08:00 – 17:00 Uhr</p>
                <p className="text-sm text-muted-foreground">Pflege: 24/7 erreichbar</p>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div id="maps" className="rounded-xl overflow-hidden border border-border shadow-sm min-h-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75856.72886378916!2d9.93615!3d53.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b161837e1813b9%3A0x4263df27bd63aa0!2sHamburg!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps – PflegeHaus Hamburg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
