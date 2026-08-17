import { store } from '../state.js';
import { parseString } from '../utils/parsers.js';

/**
 * Render the detailed overlay modal for the selected superhero
 */
export function renderDetailModal(containerElement) {
  if (!containerElement) return;

  const { selectedHero } = store.state;

  // If no hero is selected, hide the modal completely
  if (!selectedHero) {
    containerElement.innerHTML = '';
    containerElement.classList.remove('active');
    return;
  }

  const hero = selectedHero;
  const heightStr = Array.isArray(hero.appearance?.height) ? hero.appearance.height[1] : '-';
  const weightStr = Array.isArray(hero.appearance?.weight) ? hero.appearance.weight[1] : '-';
  const aliasesStr = Array.isArray(hero.biography?.aliases) && hero.biography.aliases.length > 0
    ? hero.biography.aliases.join(', ')
    : 'None';

  containerElement.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-card">
      <button class="modal-close-btn" id="modal-close">&times;</button>
      
      <div class="modal-header">
        <img src="${hero.images?.md || hero.images?.sm || ''}" alt="${hero.name}" class="modal-hero-img" />
        <div>
          <h2>${parseString(hero.name)}</h2>
          <p class="real-name"><em>${parseString(hero.biography?.fullName)}</em></p>
          <span class="badge ${hero.biography?.alignment}">${parseString(hero.biography?.alignment)}</span>
        </div>
      </div>

      <div class="modal-body">
        <section class="modal-section">
          <h3>Power Stats</h3>
          <ul class="stats-grid">
            <li><strong>Intelligence:</strong> ${hero.powerstats?.intelligence ?? 0}</li>
            <li><strong>Strength:</strong> ${hero.powerstats?.strength ?? 0}</li>
            <li><strong>Speed:</strong> ${hero.powerstats?.speed ?? 0}</li>
            <li><strong>Durability:</strong> ${hero.powerstats?.durability ?? 0}</li>
            <li><strong>Power:</strong> ${hero.powerstats?.power ?? 0}</li>
            <li><strong>Combat:</strong> ${hero.powerstats?.combat ?? 0}</li>
          </ul>
        </section>

        <section class="modal-section">
          <h3>Appearance & Bio</h3>
          <p><strong>Gender:</strong> ${parseString(hero.appearance?.gender)}</p>
          <p><strong>Race:</strong> ${parseString(hero.appearance?.race)}</p>
          <p><strong>Height:</strong> ${heightStr}</p>
          <p><strong>Weight:</strong> ${weightStr}</p>
          <p><strong>Publisher:</strong> ${parseString(hero.biography?.publisher)}</p>
          <p><strong>First Appearance:</strong> ${parseString(hero.biography?.firstAppearance)}</p>
          <p><strong>Aliases:</strong> ${aliasesStr}</p>
        </section>

        <section class="modal-section">
          <h3>Work & Connections</h3>
          <p><strong>Occupation:</strong> ${parseString(hero.work?.occupation)}</p>
          <p><strong>Base:</strong> ${parseString(hero.work?.base)}</p>
          <p><strong>Group Affiliations:</strong> ${parseString(hero.connections?.groupAffiliation)}</p>
        </section>
      </div>
    </div>
  `;

  containerElement.classList.add('active');

  // --- Event Listeners ---

  const closeBtn = containerElement.querySelector('#modal-close');
  const backdrop = containerElement.querySelector('.modal-backdrop');

  const closeModal = () => {
    store.setState({ selectedHero: null });
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
}