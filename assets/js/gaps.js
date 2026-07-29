const searchInput = document.querySelector("[data-gap-search]");
const filterRoot = document.querySelector("[data-gap-filters]");
const cards = [...document.querySelectorAll("[data-gap-card]")];
const count = document.querySelector("[data-gap-count]");

let activeType = "all";

const types = [
  ["all", "All"],
  ["validity", "Validity"],
  ["mechanism", "Mechanism"],
  ["generalization", "Generalization"],
  ["system", "System"],
  ["data", "Data"],
];

const render = () => {
  const query = (searchInput?.value || "").trim().toLocaleLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const typeMatch = activeType === "all" || card.dataset.gapType === activeType;
    const textMatch = !query || card.textContent.toLocaleLowerCase().includes(query);
    const show = typeMatch && textMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });

  if (count) count.textContent = `${visible} gaps`;
};

if (filterRoot) {
  filterRoot.innerHTML = types
    .map(
      ([value, label]) =>
        `<button class="filter-button${value === activeType ? " active" : ""}" type="button" data-gap-filter="${value}">${label}</button>`,
    )
    .join("");

  filterRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gap-filter]");
    if (!button) return;
    activeType = button.dataset.gapFilter;
    filterRoot.querySelectorAll("[data-gap-filter]").forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
}

searchInput?.addEventListener("input", render);
render();
