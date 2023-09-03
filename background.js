// background.js

// Handle the alarm when it triggers
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "timerAlarm1") {
    // playSound();
      // Handle the alarm here, e.g., play a sound or show a notification
      // You can put the logic for the timer's end action here
      // For example, playing a sound or displaying a notification
      console.log("Timer alarm triggered.");
      playSound(); // Play a sound when the timer ends
  }
});

//just added
chrome.runtime.sendMessage({ countdown: "00:00:00" });

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.setAlarm) {
      // Set the alarm using the provided alarmName and totalTimeInSeconds
      chrome.alarms.create(request.alarmName, {
          delayInMinutes: request.totalTimeInSeconds / 60,
      });

      // Respond with success
      sendResponse({ success: true });
  }
});

// Example function for playing a sound (replace with your own logic)
// function playSound() {
//   // Your sound playing logic goes here
//   console.log("Playing sound...");
//   var audio = new window.Audio("ZURQ2FE-notification.mp3");
//   audio.play();
// }
