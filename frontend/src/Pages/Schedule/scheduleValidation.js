function scheduleValidation(formData, serverErrors) {
  let errors = {};

  // Validate date
const selectedDate = new Date(formData.schedule_date);
const currentDate = new Date();
if (formData.schedule_date.trim() === "") {
  errors.schedule_date = "তারিখ প্রদান করুন";
} else if (
  selectedDate.getFullYear() !== currentDate.getFullYear() ||
  selectedDate.getMonth() !== currentDate.getMonth() ||
  selectedDate.getDate() !== currentDate.getDate()
) {
  console.log(currentDate);
  errors.schedule_date = "আজকের তারিখ নির্বাচন করুন";
} else {
  errors.schedule_date = "";
}


  if (formData.schedule_round === "") {
    errors.schedule_round = "রাউন্ড নম্বর নির্বাচন করুন";
  } else if (!/^\d+$/.test(formData.schedule_round)) {
    errors.schedule_round = "রাউন্ড নম্বর সংখ্যায় হতে হবে";
  } else {
    errors.schedule_round = "";
  }


  const currentTime = new Date();
  const selectedTime = new Date(currentDate.toDateString() + ' ' + formData.schedule_time);
  if (formData.schedule_time === "") {
    errors.schedule_time = "প্রস্থান সময় নির্বাচন করুন";
  }  
 else if (selectedTime < currentTime) {
    errors.schedule_time = "প্রস্থান সময় সঠিক নয়";
  } else {
    errors.schedule_time = "";
  }

  if (formData.schedule_autorickshaw === "") {
    errors.schedule_autorickshaw = "অটোরিকশা নাম্বার নির্বাচন করুন";
  } else {
    errors.schedule_autorickshaw = "";
  }
  if (formData.schedule_place === "") {
    errors.schedule_place = "গন্তব্য নির্বাচন করুন";
  } else {
    errors.schedule_place = "";
  }
  
  if (formData.autorickshaw_number === "") {
    errors.autorickshaw_number = "অটোরিকশা নির্বাচন করুন";
  } else {
    errors.autorickshaw_number = "";
  }
  return errors;
}

export default scheduleValidation;