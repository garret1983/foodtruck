const container = document.createElement("div");
container.setAttribute("class", "container");

app.appendChild(logo);
app.appendChild(container);

var request = new HttpRequest();
request.open(
  "GET",
  "https://my.api.mockaroo.com/locations.json?key=a45f1200",
  true
);
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 3 && request.status < 5) {
    data.forEach(movie => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = foodTruck;

      const p = document.createElement("p");
      foodTruck.description = foodTruck.description.substring(0, 300);
      p.textContent = `${foodTruck.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement("error");
    errorMessage.textContent = `error, try again`;
    app.appendChild(errorMessage);
  }
};

request.send();
