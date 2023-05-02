document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("dateInput");
  const countButton = document.getElementById("countButton");
  const result = document.getElementById("result");

  // Load the stored date, if any
  chrome.storage.sync.get("date", function (data) {
    if (data.date) {
      dateInput.value = data.date;
      updateResult();
    }
  });

  // Listen for button click and update the result
  countButton.addEventListener("click", updateResult);

  function updateResult() {
    const date = new Date(dateInput.value);
    const today = new Date();
    const timeDiff = Math.abs(today.getTime() - date.getTime());
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;

    result.innerText = `It has been ${dayDiff} days.`;

    // Save the date in storage
    chrome.storage.sync.set({ date: dateInput.value });
  }
});
