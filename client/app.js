function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (let i in uiBathrooms) {
    if (uiBathrooms[i].checked) return parseInt(i) + 1;
  }
  return -1;
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (let i in uiBHK) {
    if (uiBHK[i].checked) return parseInt(i) + 1;
  }
  return -1;
}

function onClickedEstimatePrice() {
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bath = getBathValue();
  var location = document.getElementById("uiLocations");
  var priceField = document.getElementById("price-text");
  var resultCard = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price"; // Adjust if needed

  $.post(url, {
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bath,
    location: location.value
  }, function(data, status) {
    priceField.innerText = data.estimated_price + " Lakh";
    resultCard.classList.remove("hidden");
  });
}

function onPageLoad() {
  var url = "http://127.0.0.1:5000/get_location_names";
  $.get(url, function(data, status) {
    if (data) {
      var locations = data.locations;
       uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty();
      $('#uiLocations').append(new Option("Select Location", ""));
      for (let i in locations) {
        const opt = new Option(locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
