const STARSHIP_API_URL = "https://swapi.py4e.com/api/starships/";

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const createSpaceshipComponent = (ship) => {
  const card = document.createElement("div");
  card.className = "card h-100 shadow-sm";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const titleRow = document.createElement("div");
  titleRow.className = "d-flex justify-content-between";

  const name = document.createElement("h5");
  name.className = "card-title fw-bold";
  name.textContent = ship.name;

  const cost = document.createElement("h5");
  cost.className = "fw-bold";
  cost.textContent =
    ship.cost_in_credits !== "unknown"
      ? `${Number(ship.cost_in_credits).toLocaleString()} credits`
      : "n/a credits";

  titleRow.appendChild(name);
  titleRow.appendChild(cost);

  const manufacturer = document.createElement("p");
  manufacturer.className = "card-text mb-4";
  manufacturer.textContent = `Manufactured by ${ship.manufacturer}`;

  // NOTE: Removed 'border-top' from this row
  const statRow = document.createElement("div");
  statRow.className = "row pt-3 text-center";

  const speedDiv = document.createElement("div");
  speedDiv.className = "col";
  speedDiv.innerHTML = `
    <div class="fw-bold">${
      ship.max_atmosphering_speed !== "unknown"
        ? ship.max_atmosphering_speed
        : "n/a"
    }</div>
    <div class="text-muted small">Max atmosphering speed</div>
  `;

  const cargoDiv = document.createElement("div");
  cargoDiv.className = "col border-start";
  cargoDiv.innerHTML = `
    <div class="fw-bold">${
      ship.cargo_capacity !== "unknown"
        ? Number(ship.cargo_capacity).toLocaleString()
        : "n/a"
    }</div>
    <div class="text-muted small">Cargo capacity</div>
  `;

  statRow.appendChild(speedDiv);
  statRow.appendChild(cargoDiv);

  cardBody.appendChild(titleRow);
  cardBody.appendChild(manufacturer);
  cardBody.appendChild(statRow);
  card.appendChild(cardBody);

  return card;
};

const createNavbar = () => {
  const header = document.querySelector("header");
  header.innerHTML = `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Homework #3</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-3">
            <li class="nav-item">
              <a class="nav-link" href="#welcome">Welcome</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#starships">Starships</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#form">Form</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
};

const createWelcomeSection = () => {
  const welcomeSection = document.getElementById("welcome");

  const container = document.createElement("div");
  container.className = "container py-4 bio-card";

  const row = document.createElement("div");
  row.className = "row align-items-center";

  const imgCol = document.createElement("div");
  imgCol.className = "col-md-4 text-center";

  const img = document.createElement("img");
  img.src = "../images/jarren.jpg";
  img.alt =
    "Jarren Calizo smiling in a red plaid shirt with a Canon camera strap around his neck";
  img.className = "img-fluid rounded shadow";

  imgCol.appendChild(img);

  const textCol = document.createElement("div");
  textCol.className = "col-md-8";

  const bio = document.createElement("p");
  bio.innerHTML =
    "<strong>Hi, I'm Jarren!</strong> I'm a graduate student at Portland State studying cybersecurity and web development. I enjoy lifting, building cool tech, and mentoring others in coding.";

  textCol.appendChild(bio);

  row.appendChild(imgCol);
  row.appendChild(textCol);
  container.appendChild(row);
  welcomeSection.appendChild(container);
};

const renderStarships = async () => {
  const starshipsSection = document.getElementById("starships");
  const ships = await fetchData(STARSHIP_API_URL);

  const container = document.createElement("div");
  container.className = "container py-4";

  const row = document.createElement("div");
  row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4";

  ships.forEach((ship) => {
    const col = document.createElement("div");
    col.className = "col";
    col.appendChild(createSpaceshipComponent(ship));
    row.appendChild(col);
  });

  container.appendChild(row);
  starshipsSection.appendChild(container);
};

const handleFormSubmit = () => {
  const form = document.getElementById("userForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const favoriteShip = document.getElementById("favoriteShip").value.trim();

    if (!name || !email) {
      alert("Please fill out both name and email.");
      return;
    }

    console.group("🚀 Form Submission");
    console.log("Full Name:", name);
    console.log("Email Address:", email);
    console.log("Favorite Starship:", favoriteShip || "n/a");
    console.groupEnd();

    form.reset();
  });
};

createNavbar();
createWelcomeSection();
renderStarships();
handleFormSubmit();
