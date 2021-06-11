const url = {
  problems: "https://codeforces.com/api/problemset.problems",
};
document.getElementById("userinput").style.visibility = "hidden";
let probs,
  check = false;
let container = document.getElementById("problems");
function getProblem() {
  fetch(`${url.problems}`)
    .then((problems) => problems.json())
    .then(displayProblems);
}
function displayProblems(problems) {
  probs = problems;
  document.getElementById("status").innerHTML =
    `<span>Status: <i class="bi bi-check-lg" width= "32" height= "32"></i> </span>Problem Set Loaded. Now You Can Search`;
  check = true;
  document.getElementById("userinput").style.visibility = "visible";
}

setTimeout(getProblem, 3000);
function searchProblem() {
  if (check == true) {
    let toSearch = document.getElementById("userinput").value;

    let arr = probs.result.problems.filter((item) =>
      item.name.toUpperCase().includes(`${toSearch.toUpperCase()}`)
    );
    let links = arr.map((x) => ({
      name: x.name,
      link: `https://codeforces.com/contest/${x.contestId}/problem/${x.index}`,
    }));
    if (toSearch != "") {
      container.innerHTML = "";
      for (let i of links) {
        let anchors = document.createElement("a");
        anchors.href = i.link;
        anchors.innerText = `${i.name}  `;
        // anchors.style.margin = "10px 8px";
      
        anchors.target = "_blank";
        container.appendChild(anchors);
      }
    } else {
      container.innerHTML = "";
    }
  } else {
    alert("Please Wait! Problems Set Not Loaded");
  }
}

let input = document.getElementById("userinput");
input.addEventListener("keyup", function () {
  searchProblem();
});
