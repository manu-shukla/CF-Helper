const url = {
  problems: "https://codeforces.com/api/problemset.problems",
  userinfo: "https://codeforces.com/api/user.info?handles=",
  status: "https://codeforces.com/api/contest.status?contestId=",
  link: "https://codeforces.com/contest/",
};

let probs,
  check = false,
  selectedProblems,
  CF_handle,
  score = 0;
let buttons = document.getElementById("buttons");
let handleinput = document.getElementById("handle");
handleinput.style.visibility = "hidden";
buttons.style.visibility = "hidden";
function getProblem() {
  fetch(`${url.problems}`)
    .then((problems) => problems.json())
    .then(storeProblems);
}
function storeProblems(problems) {
  probs = problems;
  document.getElementById(
    "status"
  ).innerHTML = `<span>Status: <i class="bi bi-check-lg" style="color:greenyellow;" width= "32" height= "32"></i> </span>Problem Set Loaded. You may Proceed`;
  check = true;
  handleinput.style.visibility = "visible";
}

setTimeout(getProblem, 3000);

const handle = document.querySelector("#handle");
handle.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getHandleInfo(handle.value);
    // console.log(serachbox.value);
  }
}
function getHandleInfo(query) {
  console.log(`${url.userinfo}${handle.value}`);
  fetch(`${url.userinfo}${handle.value}`)
    .then((userInfo) => userInfo.json())
    .then(validateUser);
}

function validateUser(userInfo) {
  console.log(userInfo);
  if (userInfo.status == "FAILED") {
    alert("User Not Found! Kindly Re-Check");
  } else {
    CF_handle = userInfo.result[0].handle;
    buttons.style.visibility = "visible";
    handleinput.style.visibility = "hidden";
    document.getElementById("yourhandle").innerText = `${CF_handle}`;
    collectProblems(userInfo.result[0].rating);
  }
}

function collectProblems(rating) {
  console.log(rating);
  console.log(probs);
  let tempSelected = probs.result.problems.filter(
    (x) => x.rating >= rating - 50 && x.rating <= rating + 300
  );
  if (tempSelected.length == 0) {
    alert("No Problem Found!");
  } else {
    selectedProblems = tempSelected;
    displaySelectedProblems();
  }
}
let container = document.getElementById("problems");
let current;
function displaySelectedProblems() {
  container.innerHTML = "";
  let idx = Math.floor(Math.random() * (selectedProblems.length + 1));

  //   console.log(selectedProblems[idx]);
  let displaying = selectedProblems[idx];
  current = displaying;
  console.log(displaying);

  let anchors = document.createElement("a");
  anchors.href = `${url.link}${displaying.contestId}/problem/${displaying.index}`;
  anchors.innerText = `${displaying.name}  `;
  anchors.target = "_blank";
  container.appendChild(anchors);
}

function checkSolved() {
  fetch(`${url.status}${current.contestId}&handle=${CF_handle}`)
    .then((submission) => submission.json())
    .then(function (submission) {
      console.log(submission);
      let check = submission.result.filter(
        (submit) =>
          submit.problem.name == current.name && submit.verdict == "OK"
      );
      console.log(check);
      if (check.length > 0) {
        alert("You have solved the problem");
        displaySelectedProblems();
        ++score;
      } else {
        alert("Didn't Solved");
      }
    });
}

function goodbye() {
  container.innerHTML = "";
  alert(`Great! You are improving. Your Score: ${score}`);
  handleinput.style.visibility = "visible";
  buttons.style.visibility = "hidden";
  document.getElementById("yourhandle").innerText = null;
  handle.value = null;
  return;
}
