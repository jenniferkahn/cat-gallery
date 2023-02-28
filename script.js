const api_key =
  "live_5P0mPUMV4pdr8rIzSdqnMDNtCvF5FYXq3YWdVFtzim6xTA0ig5QCGb9FaBNGVJ1X";

let currentPage = 1;
const imagesPerPage = 20;
const totalImages = 100;

function displayImages(imagesData) {
  let grid = document.getElementById("grid");
  grid.innerHTML = "";
  imagesData.map(function (imageData) {
    let image = document.createElement("img");
    //use the url from the image object
    image.src = `${imageData.url}`;

    let gridCell = document.createElement("div");
    gridCell.classList.add("col");
    gridCell.classList.add("col-lg");
    gridCell.appendChild(image);

    grid.appendChild(gridCell);
  });
}

function displayPagination(totalPages) {
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    let link = document.createElement("a");
    link.href = "#";
    link.textContent = i;
    if (i === currentPage) {
      link.classList.add("active");
    }
    link.addEventListener("click", function (event) {
      event.preventDefault();
      currentPage = i;
      fetchImages();
    });
    pagination.appendChild(link);
  }
}

function fetchImages() {
  const start = (currentPage - 1) * imagesPerPage;
  const url = `https://api.thecatapi.com/v1/images/search?limit=${imagesPerPage}&page=${currentPage}`;

  fetch(url, { headers: { "x-api-key": api_key } })
    .then((response) => response.json())
    .then((data) => {
      displayImages(data);
      const totalPages = Math.ceil(totalImages / imagesPerPage);
      displayPagination(totalPages);
    })
    .catch((error) => console.log(error));
}

fetchImages();