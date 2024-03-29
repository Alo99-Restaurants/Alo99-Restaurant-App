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
  while (currentTime.getHours() < closeTime.getHours()) {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    times.push(
      `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`
    );
    currentTime.setMinutes(currentTime.getMinutes() + interval); // Increment by interval minutes
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

export const convertPrice = (price) => {
  if (!price) return '0 vnd'
  return price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    .concat(' vnd');
};

export const convertDateTime = (time, day) => {
  // Extract hours and minutes from the time string
  const hour = parseInt(time.substring(0, 2));
  const minute = parseInt(time.substring(3, 5));
  // Create a Date object from the provided day
  const date = new Date(day);
  // Set the hours and minutes for the Date object
  date.setUTCHours(hour);
  date.setUTCMinutes(minute);
  // Format the date and time as "yyyy-mm-ddTHH:MM:SS"
  return date.toISOString().slice(0, 19);
};

export const extractTime = (dateTimeString) => {
    // Create a new Date object from the provided date and time string
    var dateTime = new Date(dateTimeString);
    
    // Get the hours and minutes from the Date object
    var hours = dateTime.getHours();
    var minutes = dateTime.getMinutes();

    // Ensure that hours and minutes are always displayed as two digits
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;

    // Concatenate hours and minutes to form the time string
    var timeString = hours + ":" + minutes;
    
    return timeString;
}

export const buildQueryString = (params) => {
    let queryString = "?";
    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            value.forEach(item => {
                queryString += `${key}=${item}&`;
            });
        } else {
            queryString += `${key}=${value}&`;
        }
    }
    return queryString.slice(0, -1); // Remove the last '&' character
}

export const convertDateString = (dateString) => {
  const dateObj = new Date(dateString);

  // Get date in text format (e.g., "25 Feb 2024")
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);

  // Get time (e.g., "06:00")
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;

  return [formattedDate, time];
}