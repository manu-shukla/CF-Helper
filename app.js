const url = {
  problems: "https://codeforces.com/api/problemset.problems",
};
let probs,
  check = false;
function getProblem() {
  fetch(`${url.problems}`)
    .then((problems) => problems.json())
    .then(displayProblems);
}
function displayProblems(problems) {
  console.log(problems);
  probs = problems;
  document.getElementById("status").innerText =
    "Problem Set Loaded. Now You Can Search";
  check = true;
}

getProblem();
function searchProblem() {
  if (check == true) {
    let toSearch = document.getElementById("userinput").value;
    console.log(toSearch);
    if (toSearch == "") {
      alert("Enter a Problem");
    } else {
      let arr = probs.result.problems.filter((item) =>
        item.name.toUpperCase().includes(`${toSearch.toUpperCase()}`)
      );
      console.log(arr);
      let links = arr.map((x) => ({
        name: x.name,
        link: `https://codeforces.com/contest/${x.contestId}/problem/${x.index}`,
      }));
      let container = document.getElementById("problems");
      container.innerHTML = "";
      for (let i of links) {
        let anchors = document.createElement("a");
        anchors.href = i.link;
        anchors.innerText = `${i.name}  `;
        anchors.style.margin = "10px 8px";
        container.appendChild(anchors);
      }
    }
  } else {
    alert("Please Wait! Problems Set Not Loaded");
  }
}
