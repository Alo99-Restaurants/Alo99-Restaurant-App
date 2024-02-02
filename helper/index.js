export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export const generateTimeSlots = (openHours, closeHours, interval = 30) => {
  const times = [];
  let [openHour, openMinute] = openHours.split(':').map(Number);
  let [closeHour, closeMinute] = closeHours.split(':').map(Number);

  // Round the opening time to the next interval if necessary
  if (openMinute % interval !== 0) {
    openMinute += interval - (openMinute % interval);
    if (openMinute >= 60) {
      openHour += 1;
      openMinute -= 60;
    }
  }

  // Initialize the first time slot
  const currentTime = new Date();
  currentTime.setHours(openHour, openMinute, 0);

  const closeTime = new Date();
  closeTime.setHours(closeHour, closeMinute, 0);

  // Generate time slots
  while (currentTime < closeTime) {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    times.push(
      `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`
    );
    currentTime.setMinutes(currentTime.getMinutes() + interval); // Increment by interval minutes

    // Check if the next time slot equals the close time, break the loop to ensure closeHours is not included
    if (currentTime >= closeTime) {
      break;
    }
  }

  return times;
};

export const formatTime = (time) =>
  // Split the time string by colon, pad each unit (hours and minutes) with leading zeros if necessary, and join them back with a colon.
  // For example, if time = "9:5", it will be formatted as "09:05".
  time
    .split(':')
    .map((unit) => unit.padStart(2, '0'))
    .join(':');
