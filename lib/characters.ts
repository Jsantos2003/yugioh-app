export interface Character {
  slug: string;         
  name: string;        
  series: string;
  role: string;
}

export const characters: Character[] = [
  
  { slug: "Yami Yugi", name: "Yugi Muto", series: "Duel Monsters", role: "Protagonista" },
  { slug: "Seto Kaiba", name: "Seto Kaiba", series: "Duel Monsters", role: "Rival" },
  { slug: "Joey Wheeler", name: "Joey Wheeler", series: "Duel Monsters", role: "Secundario" },
  { slug: "Mai Valentine", name: "Mai Valentine", series: "Duel Monsters", role: "Duelista" },
  { slug: "Tea Gardner", name: "Téa Gardner", series: "Duel Monsters", role: "Secundaria" },
  { slug: "Tristan Taylor", name: "Tristan Taylor", series: "Duel Monsters", role: "Secundario" },
  { slug: "Maximillion Pegasus", name: "Maximillion Pegasus", series: "Duel Monsters", role: "Villano" },
  { slug: "Marik Ishtar", name: "Marik Ishtar", series: "Duel Monsters", role: "Villano" },
  { slug: "Ishizu Ishtar", name: "Ishizu Ishtar", series: "Duel Monsters", role: "Duelista" },
  { slug: "Bakura Ryou", name: "Ryo Bakura", series: "Duel Monsters", role: "Secundario" },
  { slug: "Yami Bakura", name: "Yami Bakura", series: "Duel Monsters", role: "Villano" },
  { slug: "Rex Raptor", name: "Rex Raptor", series: "Duel Monsters", role: "Relleno" },
  { slug: "Weevil Underwood", name: "Weevil Underwood", series: "Duel Monsters", role: "Relleno" },
  { slug: "Mako Tsunami", name: "Mako Tsunami", series: "Duel Monsters", role: "Relleno" },
  { slug: "Odion", name: "Odion", series: "Duel Monsters", role: "Secundario" },

 
  { slug: "Jaden Yuki", name: "Jaden Yuki", series: "GX", role: "Protagonista" },
  { slug: "Alexis Rhodes", name: "Alexis Rhodes", series: "GX", role: "Duelista" },
  { slug: "Chazz Princeton", name: "Chazz Princeton", series: "GX", role: "Rival" },
  { slug: "Zane Truesdale", name: "Zane Truesdale", series: "GX", role: "Rival" },
  { slug: "Syrus Truesdale", name: "Syrus Truesdale", series: "GX", role: "Secundario" },
  { slug: "Bastion Misawa", name: "Bastion Misawa", series: "GX", role: "Secundario" },
  { slug: "Jesse Anderson", name: "Jesse Anderson", series: "GX", role: "Duelista" },
  { slug: "Aster Phoenix", name: "Aster Phoenix", series: "GX", role: "Rival" },
  { slug: "Blair Flannigan", name: "Blair Flannigan", series: "GX", role: "Relleno" },
  { slug: "Camula", name: "Camula", series: "GX", role: "Villana" },

  
  { slug: "Yusei Fudo", name: "Yusei Fudo", series: "5D's", role: "Protagonista" },
  { slug: "Jack Atlas", name: "Jack Atlas", series: "5D's", role: "Rival" },
  { slug: "Crow Hogan", name: "Crow Hogan", series: "5D's", role: "Secundario" },
  { slug: "Akiza Izinski", name: "Akiza Izinski", series: "5D's", role: "Duelista" },
  { slug: "Leo (5D's)", name: "Leo", series: "5D's", role: "Secundario" },
  { slug: "Luna (5D's)", name: "Luna", series: "5D's", role: "Duelista" },
  { slug: "Carly Carmine", name: "Carly Carmine", series: "5D's", role: "Duelista" },
  { slug: "Kalin Kessler", name: "Kalin Kessler", series: "5D's", role: "Villano" },
  { slug: "Rex Goodwin", name: "Rex Goodwin", series: "5D's", role: "Villano" },

  
  { slug: "Yuma Tsukumo", name: "Yuma Tsukumo", series: "ZEXAL", role: "Protagonista" },
  { slug: "Astral", name: "Astral", series: "ZEXAL", role: "Secundario" },
  { slug: "Tori Meadows", name: "Tori Meadows", series: "ZEXAL", role: "Secundaria" },
  { slug: "Reginald Kastle", name: "Shark (Reginald Kastle)", series: "ZEXAL", role: "Rival" },
  { slug: "Rio Kastle", name: "Rio Kastle", series: "ZEXAL", role: "Duelista" },
  { slug: "Cathy Katherine", name: "Cathy Katherine", series: "ZEXAL", role: "Relleno" },
  { slug: "Vector", name: "Vector", series: "ZEXAL", role: "Villano" },
  { slug: "Dr. Faker", name: "Dr. Faker", series: "ZEXAL", role: "Villano" },

  { slug: "Yuya Sakaki", name: "Yuya Sakaki", series: "ARC-V", role: "Protagonista" },
  { slug: "Yuzu Hiragi", name: "Yuzu Hiragi", series: "ARC-V", role: "Duelista" },
  { slug: "Gongenzaka", name: "Gongenzaka", series: "ARC-V", role: "Secundario" },
  { slug: "Shun Kurosaki", name: "Shun Kurosaki", series: "ARC-V", role: "Rival" },
  { slug: "Ruri Kurosaki", name: "Ruri Kurosaki", series: "ARC-V", role: "Duelista" },
  { slug: "Sora Shiunin", name: "Sora Shiun'in", series: "ARC-V", role: "Rival" },
  { slug: "Reiji Akaba", name: "Reiji Akaba", series: "ARC-V", role: "Secundario" },
  { slug: "Serena (Yu-Gi-Oh! ARC-V)", name: "Serena", series: "ARC-V", role: "Duelista" },

  
  { slug: "Yusaku Fujiki", name: "Yusaku Fujiki (Playmaker)", series: "VRAINS", role: "Protagonista" },
  { slug: "Ai (Yu-Gi-Oh! VRAINS)", name: "Ai", series: "VRAINS", role: "Secundario" },
  { slug: "Aoi Zaizen", name: "Aoi Zaizen (Blue Angel)", series: "VRAINS", role: "Duelista" },
  { slug: "Takeru Homura", name: "Takeru Homura (Soulburner)", series: "VRAINS", role: "Rival" },
  { slug: "Ryoken Kogami", name: "Ryoken Kogami (Revolver)", series: "VRAINS", role: "Villano" },
  { slug: "Emma Bessho", name: "Emma Bessho (Ghost Girl)", series: "VRAINS", role: "Duelista" },
];