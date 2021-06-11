const url = {
  problems: "https://codeforces.com/api/problemset.problems",
};
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
    "<span>Status: </span>Problem Set Loaded. Now You Can Search";
  check = true;
}

getProblem();
function searchProblem() {
  if (check == true) {
    let toSearch = document.getElementById("userinput").value;

    let arr = probs.result.problems.filter((item) =>
      item.name.toUpperCase().includes(`${toSearch.toUpperCase()}`)
    );
    console.log(arr);
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
        anchors.style.margin = "10px 8px";
        container.appendChild(anchors);
      }
    }
    else{
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
