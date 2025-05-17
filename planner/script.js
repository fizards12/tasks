const daysWithDefualtMessage = {
  Friday: "It's Friday, have a blessed day!",
  Saturday: "Weekend vibes! Start your week fresh.",
  Sunday: "Weekend vibes! Start your week fresh.",
};

function selectMessageLogic(day = "", logicNum) {
  // Required Logic
  if (logicNum == 0) {
    switch (day.toLowerCase()) {
      case "friday":
        return "It's Friday, have a blessed day!";
      case "saturday":
        return "Weekend vibes! Start your week fresh.";
      case "sunday":
        return "Weekend vibes! Start your week fresh.";
      case "monday":
        return "Monday: Let's kick off the week strong!";
      case "tuesday":
        return "Tuesday: Let's kick off the week strong!";
      case "wednesday":
        return "Wednesday: Let's kick off the week strong!";
      case "thrusday":
        return "Thrusday: Let's kick off the week strong!";
    }
    // Better Logic
  } else {
    if (daysWithDefualtMessage[day]) {
      return daysWithDefualtMessage[day];
    } else {
      return day + ": Let's kick off the week strong!";
    }
  }
}

function submitHandler(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  const day = data.day;
  const message = document.querySelector(".message");
  if (!day) {
    message.textContent = "Please select a day";
    message.classList.add("message-error");
    return;
  }
  message.textContent = selectMessageLogic(day);
  message.classList.remove("message-error");
  message.classList.add("message-success");
}
