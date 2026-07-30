export const cardTypeES: Record<string, string> = {
  "Effect Monster": "Monstruo de Efecto",
  "Normal Monster": "Monstruo Normal",
  "Fusion Monster": "Monstruo de Fusión",
  "Synchro Monster": "Monstruo Síncrono",
  "XYZ Monster": "Monstruo Xyz",
  "Link Monster": "Monstruo Link",
  "Ritual Monster": "Monstruo Ritual",
  "Pendulum Effect Monster": "Monstruo Péndulo de Efecto",
  "Pendulum Normal Monster": "Monstruo Péndulo Normal",
  "Normal Tuner Monster": "Monstruo Sintonizador Normal",
  "Tuner Monster": "Monstruo Sintonizador",
  "Flip Effect Monster": "Monstruo de Efecto Flip",
  "Union Effect Monster": "Monstruo de Efecto Unión",
  "Spirit Monster": "Monstruo Espíritu",
  "Toon Monster": "Monstruo Toon",
  "Gemini Monster": "Monstruo Géminis",
  "Spell Card": "Carta de Magia",
  "Trap Card": "Carta de Trampa",
};

export function translateCardType(type: string): string {
  return cardTypeES[type] ?? type;
}

// Color de acento inspirado en el color real del marco de cada tipo de carta.
export function accentForCardType(type: string): string {
  if (type.includes("Spell")) return "#3ddc84";
  if (type.includes("Trap")) return "#ff4fa3";
  return "#ff8b3d"; // monstruos
}

export const spellTrapRaceES: Record<string, string> = {
  Normal: "Normal",
  Continuous: "Continua",
  Equip: "Equipo",
  "Quick-Play": "Juego Rápido",
  Field: "Campo",
  Ritual: "Ritual",
  Counter: "Contraataque",
};

export function translateRace(race: string): string {
  return spellTrapRaceES[race] ?? race;
}