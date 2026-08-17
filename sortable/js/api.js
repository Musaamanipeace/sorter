const API_URL = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';

/**
 * Fetches all superhero records from the API endpoint
 */
export async function fetchSuperheroes() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    return normalizeData(rawData);
  } catch (error) {
    console.error('Failed to fetch superhero data:', error);
    return [];
  }
}

/**
 * Ensures required property structures exist on every hero record
 */
function normalizeData(heroes) {
  if (!Array.isArray(heroes)) return [];

  return heroes.map((hero) => ({
    id: hero.id,
    name: hero.name || 'Unknown',
    images: hero.images || {},
    powerstats: {
      intelligence: hero.powerstats?.intelligence ?? 0,
      strength: hero.powerstats?.strength ?? 0,
      speed: hero.powerstats?.speed ?? 0,
      durability: hero.powerstats?.durability ?? 0,
      power: hero.powerstats?.power ?? 0,
      combat: hero.powerstats?.combat ?? 0,
    },
    appearance: {
      gender: hero.appearance?.gender || '-',
      race: hero.appearance?.race || '-',
      height: hero.appearance?.height || ['-', '0 cm'],
      weight: hero.appearance?.weight || ['-', '0 kg'],
      eyeColor: hero.appearance?.eyeColor || '-',
      hairColor: hero.appearance?.hairColor || '-',
    },
    biography: {
      fullName: hero.biography?.fullName || 'N/A',
      alterEgos: hero.biography?.alterEgos || 'No alter egos',
      aliases: hero.biography?.aliases || [],
      placeOfBirth: hero.biography?.placeOfBirth || '-',
      firstAppearance: hero.biography?.firstAppearance || '-',
      publisher: hero.biography?.publisher || 'Unknown',
      alignment: hero.biography?.alignment || 'neutral',
    },
    work: {
      occupation: hero.work?.occupation || '-',
      base: hero.work?.base || '-',
    },
    connections: {
      groupAffiliation: hero.connections?.groupAffiliation || '-',
      relatives: hero.connections?.relatives || '-',
    },
  }));
}