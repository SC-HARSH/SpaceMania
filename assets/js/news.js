var i = 1;
getText(
  "https://api.nasa.gov/planetary/apod?api_key=Oah9M4RdxcWcBcVnHY2qECVtyWRIf7YQYUeqX9e7"
);
while (i <= 60) {
  let d = new Date();
  d.setDate(d.getDate() - i);
  let APiToSend =
    "https://api.nasa.gov/planetary/apod?api_key=Oah9M4RdxcWcBcVnHY2qECVtyWRIf7YQYUeqX9e7&date=" +
    d.getFullYear().toString() +
    "-" +
    d.getMonth().toString() +
    "-" +
    d.getDate().toString();
  getText(APiToSend);
  i++;
}

async function getText(file) {
  let resultRaw = await fetch(file);
  if ((resultRaw.status = 200)) {
    console.log(resultRaw.status);
    let resultFinal = await resultRaw.json();
    if (resultFinal.copyright != undefined) {
      console.log(resultFinal.copyright);
      var whattoadd =
        '<div  id="' +
        resultFinal.date +
        "-div" +
        '" class="col-lg-4 col-md-6 col-sm-12"><div class="card mb-5 shadow-sm"><img src="' +
        resultFinal.url +
        '" class="img-fluid" /><div class="card-body"><div class="card-title"><h2>' +
        resultFinal.copyright +
        '</h2></div><div class="card-text"><h4>' +
        resultFinal.date +
        '</h4></div><a id="' +
        resultFinal.date +
        '" onClick="navigatePage(this.id);" class="btn btn-outline-primary rounded-0 float-end">Read More</a ></div></div></div>';
      document.getElementById("output").innerHTML += whattoadd;
    }
  }
}
function navigatePage(id) {
  console.log(id);

  let APiToSend =
    "https://api.nasa.gov/planetary/apod?api_key=Oah9M4RdxcWcBcVnHY2qECVtyWRIf7YQYUeqX9e7&date=" +
    id;
  openModal();
  async function openModal() {
    let resultRaw = await fetch(APiToSend);
    let resultFinal = await resultRaw.json();
    if ((resultRaw.status = 200)) {
      document.getElementById("modalHeading").innerHTML = resultFinal.copyright;
      document.getElementById("modalImg").src = resultFinal.url;
      document.getElementById("modalData").innerHTML =
        "Date-" + resultFinal.date + "<br>";
      document.getElementById("modalData").innerHTML += resultFinal.explanation;
      document.getElementById("openModal").click();
    }
  }
}
