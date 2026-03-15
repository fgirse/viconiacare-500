import { getPayload } from "payload";
import config from "@payload-config";
import type { TeamMember } from "./Gallery27Carousel";
import { Gallery27Client } from "./Gallery27Client";

const QUALIFICATION_LABELS: Record<string, string> = {
  management: "Geschäftsführung",
  pdl: "Pflegedienstleitung",
  administration: "Verwaltung",
  companion: "Alltagsbegleiter",
  assistant: "Pflegeassistent",
  auxiliary: "Pflegehilfskraft",
  geriatric_trainee: "Altenpflegeauszubildende/r",
  geriatric_assistant: "Altenpflegehelfer/in",
  geriatric: "Altenpfleger/in",
  rn: "Examinierte Pflegefachkraft",
  domestic: "Hauswirtschaftskraft",
  wound_manager: "Wundmanager",
};

interface Gallery27Props {
  className?: string;
}

export async function Gallery27({ className }: Gallery27Props) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "employees",
    where: {
      and: [
        { showInTeam: { equals: true } },
        { isActive: { equals: true } },
      ],
    },
    depth: 1,
  });

  const members: TeamMember[] = docs.map((emp) => {
    const photo = emp.photo as { url?: string | null } | null | undefined;
    return {
      src: photo && typeof photo === "object" ? (photo.url ?? null) : null,
      title: `${emp.firstName ?? ""} ${emp.lastName ?? ""}`.trim(),
      designation: QUALIFICATION_LABELS[emp.qualification ?? ""] ?? (emp.qualification ?? ""),
    };
  });

  return <Gallery27Client members={members} className={className} />;
}
