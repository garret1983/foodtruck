$(document).ready(function() {
  $(document).on("click", ".foodtruck-array", function() {
    var latLong = {
      lat: parseFloat($(this).attr("data-latitude")),
      lng: parseFloat($(this).attr("data-longitude"))
    };
    database.ref().set(latLong);

    console.log(latLong);

    addMarkerAndZoom(latLong, 16);

    function initMap() {
      var markers = [];
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 38.899265, lng: -77.1546525 }
      });

      map.addListener("click", function(e) {
        //Remove previous marker and add new one
        // removeMarker(null, markers)
        var latitude = e.latLng.lat();
        var longitude = e.latLng.lng();
        console.log("Latitude: " + latitude + " Longitude: " + longitude);
        var marker = addMarker(map, { lat: latitude, lng: longitude });
        markers.push(marker);
      });

      function removeMarker(map, markers) {
        for (var i = 0; i < markers.length; i++) {
          makers[i].setMap(map);
        }
      }
      function addMarker(map, center) {
        var marker = new google.maps.Marker({
          position: center,
          map: map
        });
      }
    }

    function addMarkerAndZoom(center, zoom) {
      map.setCenter(center);
      map.setZoom(zoom);
    }
  });

  function addMarker(center) {
    marker = new google.maps.Marker({
      position: center,
      map: map
    });
  }

  function truckSearch() {
    $("#run-search").on("click", function(event) {
      event.preventDefault();

      // Captures the users input for zipcode and raduis search.
      // var userZipcodeInput = $("#zipcode-input").val();
      // .trim();
      // var userRadiusInput = $("#radius-input").val();
      // .trim();

      // removed user enter zip/radius

      // var isValid = validateZipCode(userZipcodeInput);

      // console.log("User entered zipcode: " + userZipcodeInput);
      // console.log("User entered radius: " + userRadiusInput);

      //   food truck api access
      // https://my.api.mockaroo.com/locations.json?key=a45f1200

      // var truckApiKey = "a45f1200";

      var truckQueryURL =
        "https://my.api.mockaroo.com/locations.json?key=a45f1200" +
        // userZipcodeInput +
        // "&radius=" +
        // userRadiusInput +
        // "&page=0&api_key=" +
        // truckQueryURL;

        // clear out table for new results
        $("#event-table > tbody").empty();

      $.ajax({
        url: truckQueryURL,
        method: "GET"
      }).then(function(response) {
        var results = response.Trucks; //Creates a new object.
        // console.log(results.length);
        console.log(results);

        for (var i = 0; i < results.length; i++) {
          var latitude = results[i].Venue.Latitude;
          var longitude = results[i].Venue.Longitude;

          addMarker({ lat: latitude, lng: longitude });
          map.setCenter({ lat: latitude, lng: longitude });

          var foodTruckLocation = moment(truckLocation).format("lat,long");

          for (var i = 0; i < results.length; i++) {
            var foodTruck = results[i].Food[0].Truck;
            var address = results[i].Address;
            var phoneNumber = results[i].Phone.Number;
            var openHours = results[i].Opoen.Hours;
            var latitude = results[i].Venue.Latitude;
            var longitude = results[i].Venue.Longitude;

            addMarker({ lat: latitude, lng: longitude });
            map.setCenter({ lat: latitude, lng: longitude });

            var prettyEventDate = moment(eventDate).format("MMMM DD, YYYY");
            // console.log(prettyEventDate);
            // console.log(moment);
            // console.log(eventDate);

            var foodTruckRow = $("<tr/>");
            foodTruckRow.addClass("truck-data");
            foodTruckRow.attr("data-latitude", results[i].Truck.Latitude);
            foodTruckRow.attr("data-longitude", results[i].Truck.Longitude);

            foodTruckRow.append(
              "<td>" +
                address +
                "</td><td>" +
                city +
                "</td><td>" +
                state +
                "</td><td>" +
                postal_code +
                "</td><td>" +
                lattitude +
                "</td><td>" +
                longitude +
                "</td><td>" +
                monday_open +
                "</td><td>" +
                tuesday_open +
                "</td><td>" +
                wednesday_open +
                "</td><td>" +
                thursday_open +
                "</td><td>" +
                friday_open +
                "</td><td>" +
                saturday_open +
                "</td><td>" +
                sunday_open +
                "</td>"
            );

            $("#event-table > tbody").append(venueRow);
            //console.log(venueRow);
          }
        }
      });
    });
  }
  truckSearch();

  function validateZipCode(elementValue) {
    var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
    return zipCodePattern.test(elementValue);
  }
  // NO CODE BELOW THIS LINE
});
