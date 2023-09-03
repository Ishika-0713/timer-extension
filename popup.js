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
  
  let time = 0; // Total time in seconds
  let countdownInterval;
  
  // Function to start the countdown
  function startCountdown(totalTimeInSeconds) {
      time = totalTimeInSeconds;
      countdownInterval = setInterval(updateCountdown, 1000);
  }
  
  function updateCountdown() {
    if(time===0)playSound(); //figure out how to do it correctly
    if (time === -1) {
        clearInterval(countdownInterval); // Stop the countdown when time reaches zero
         // Play a sound or trigger some action when the timer ends
        console.log("Time's up!");
        return;
    }
  
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
  
    // Format hours, minutes, and seconds with leading zeros if needed
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  
    // Update the countdown display (you can replace 'countdown' with your HTML element's ID)
    document.getElementById("countdown").innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  
    // Decrease the time by 1 second
    time--;
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
                  console.log("Timer alarm set successfully.");
              } else {
                  console.log("Failed to set timer alarm.");
              }
          });
          startCountdown(totalTimeInSeconds);
         
      } else {
          alert("Please enter a valid timer duration.");
      }
  });
});
