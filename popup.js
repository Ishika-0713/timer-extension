// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.countdown) {
      // Update the timer display in your popup UI
      const countdownElement = document.getElementById("countdown");
      countdownElement.innerHTML = message.countdown;
    }
  });
  
  function playSound() {
    console.log("Playing sound...");
    var audio = new Audio("ZURQ2FE-notification.mp3");
    audio.addEventListener("error", function (e) {
      console.error("Error playing audio:", e);
    });
    audio.play();
  }
  
  startButton.addEventListener("click", function () {
      // Get the timer duration from user input (you can use a form input)
      const hours = parseInt(document.getElementById("hoursInput").value) || 0;
      const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
      const seconds = parseInt(document.getElementById("secondsInput").value) || 0;

      const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
      if (!isNaN(totalTimeInSeconds) && totalTimeInSeconds > 0) {
          // Set a unique alarm name based on the timer (e.g., "timerAlarm1")
          const alarmName = "timerAlarm1";

          // Send a message to the background script to set the alarm
          chrome.runtime.sendMessage({ setAlarm: true, alarmName, totalTimeInSeconds }, function (response) {
              if (response && response.success) {
                  alert("Timer alarm set successfully.");
              } else {
                  alert("Failed to set timer alarm.");
              }
          });
          
          playSound();
      } else {
          alert("Please enter a valid timer duration.");
      }
  });
});
