document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('searchBar').addEventListener('input', myFunction);
  document.getElementById('submitButton').addEventListener('click', enterFunction);
});

function myFunction() {
  // document.getElementById("searchBar").value = "The search has changed!";
  var str = document.getElementById("searchBar").value;
  var arr = str.split(" ");
  var str1 = arr[0].toLowerCase();
  //YOUTUBE
  if(str1 == "youtube") {
    document.getElementById("helpText").innerHTML = "Searching on YouTube!";
    document.getElementById("webName").action = "https://www.youtube.com/results";
    document.getElementById("searchBar").name = "search_query";
  }
  //GOOGLE
  else if(str1 == "google") {
    document.getElementById("helpText").innerHTML = "Searching on Google!";
    document.getElementById("webName").action = "https://www.google.com/search";
    document.getElementById("siteURL").name = "q";
  }
  //BING
  else if(str1 == "bing") {
    document.getElementById("helpText").innerHTML = "Searching on Bing!";
    document.getElementById("webName").action = "https://www.bing.com/search";
    document.getElementById("siteURL").name = "q";
  }
  else if(str1 == "ddg") {
    document.getElementById("helpText").innerHTML = "Searching on Duck Duck Go!";
    document.getElementById("webName").action = "https://www.duckduckgo.com/";
    document.getElementById("siteURL").name = "q";
  }
  else if(str1 == "reddit") {
    document.getElementById("helpText").innerHTML = "Searching on Reddit!";
    document.getElementById("webName").action = "https://www.reddit.com/search";
    document.getElementById("siteURL").name = "q";
  }
  //DEFAULTS THE SEARCH TO GOOGLE
  else {
    document.getElementById("helpText").innerHTML = "Search something!";
    document.getElementById("webName").action = "https://www.google.com/search";
    document.getElementById("searchBar").name = "q";
  }
}

// Format for adding a website to search on:
// Add an else if statement and include:
//   document.getElementById("helpText").innerHTML = "Searching on " + <name of website>;
//   document.getElementById("webName").action = <url for the website up to the "?">;
//   document.getElementById("searchBar").name = <url after the "?" and before "=">;

function enterFunction () {
  var str = document.getElementById("searchBar").value;
  var arr = str.split(" ");
  var str1 = arr[0];
  var str2 = arr[1];
  if(str2 != null) {
    document.getElementById("searchBar").value = str2;
  }
  else {
    document.getElementById("searchBar").value = str1;
  }
}
