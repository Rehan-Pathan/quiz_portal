$(document).ready(function () {

  /* ---------- AUTH ---------- */

  $("#goSignup").click(() => {
    $("#loginBox").addClass("d-none");
    $("#signupBox").removeClass("d-none");
  });

  $("#goLogin").click(() => {
    $("#signupBox").addClass("d-none");
    $("#loginBox").removeClass("d-none");
  });

  $("#signupBtn").click(() => {
    const u = $("#signupUser").val();
    const p = $("#signupPass").val();

    if (!u || !p) return alert("All fields required");

    localStorage.setItem("user", u);
    localStorage.setItem("pass", p);

    alert("Signup successful");
    $("#signupBox").addClass("d-none");
    $("#loginBox").removeClass("d-none");
  });

  $("#loginBtn").click(() => {
    if (
      $("#loginUser").val() === localStorage.getItem("user") &&
      $("#loginPass").val() === localStorage.getItem("pass")
    ) {
      $("#loginBox").addClass("d-none");
      $("#quizBox").removeClass("d-none");
      loadQuestion();
    } else {
      alert("Invalid credentials");
    }
  });

  /* ---------- QUIZ ---------- */

  const questions = [
    { q: "JavaScript is a ___ language.", o: ["Markup", "Programming", "Styling"], a: 1 },
    { q: "Symbol for comments?", o: ["#", "//", "<!-- -->"], a: 1 },
    { q: "jQuery is a ___ library.", o: ["CSS", "PHP", "JavaScript"], a: 2 },
    { q: "Select by ID?", o: ["$('id')", "$('.id')", "$('#id')"], a: 2 },
    { q: "Runs after load?", o: ["click()", "ready()", "hover()"], a: 1 }
  ];

  let index = 0, score = 0, time = 10, timer;

  function loadQuestion() {
    clearInterval(timer);
    time = 60;

    $("#timer").text("Time: " + time);
    $("#progress").text(`Q ${index + 1} / ${questions.length}`);

    let q = questions[index];
    let html = `<h5 class="mb-3">${q.q}</h5>`;

    q.o.forEach((opt, i) => {
      html += `
        <label class="option d-block">
          <input type="radio" name="opt" value="${i}" class="me-2">
          ${opt}
        </label>`;
    });

    $("#questionBox").html(html);
    startTimer();
  }

  function startTimer() {
    timer = setInterval(() => {
      time--;
      $("#timer").text("Time: " + time);
      if (time === 0) nextQuestion();
    }, 1000);
  }

  function nextQuestion() {
    clearInterval(timer);

    let selected = $("input[name='opt']:checked").val();
    if (selected == questions[index].a) score++;

    index++;
    index < questions.length ? loadQuestion() : showResult();
  }

  function showResult() {
    $("#quizBox").html(`
      <h3 class="text-center">Quiz Completed</h3>
      <p class="text-center fw-bold">Score: ${score} / ${questions.length}</p>
    `);
  }

  $("#nextBtn").click(nextQuestion);

});
