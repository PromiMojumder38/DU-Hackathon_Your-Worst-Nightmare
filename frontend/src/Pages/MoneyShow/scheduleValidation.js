function moneyValidation(formData, serverErrors) {
  let errors = {};

  // Validate date
const selectedDate = new Date(formData.money_date);
const currentDate = new Date();
if (formData.money_date.trim() === "") {
  errors.money_date = "তারিখ প্রদান করুন";
} else if (
  selectedDate.getFullYear() !== currentDate.getFullYear() ||
  selectedDate.getMonth() !== currentDate.getMonth() ||
  selectedDate.getDate() !== currentDate.getDate()
) {
  console.log(currentDate);
  errors.money_date = "আজকের তারিখ নির্বাচন করুন";
} else {
  errors.money_date = "";
}


  if (formData.money_round.trim() === "") {
    errors.money_round = "রাউন্ড নম্বর নির্বাচন করুন";
  } else if (!/^\d+$/.test(formData.money_round)) {
    errors.money_round = "রাউন্ড নম্বর সংখ্যায় হতে হবে";
  } else {
    errors.money_round = "";
  }

  if (formData.money_serial.trim() === "") {
    errors.money_serial = "সিরিয়াল নম্বর নির্বাচন করুন";
  } else if (!/^\d+$/.test(formData.money_serial)) {
    errors.money_serial = "সিরিয়াল নম্বর সংখ্যায় হতে হবে";
  } else {
    errors.money_serial = "";
  }

  const currentTime = new Date();
  const selectedTime = new Date(currentDate.toDateString() + ' ' + formData.money_time);
  if (formData.money_time.trim() === "") {
    errors.money_time = "প্রস্থান সময় নির্বাচন করুন";
  }  
 else if (selectedTime <= currentTime) {
    errors.money_time = "প্রস্থান সময় সঠিক নয়";
  } else {
    errors.money_time = "";
  }

  if (formData.money_autorickshaw.trim() === "") {
    errors.money_autorickshaw = "অটোরিকশা নাম্বার নির্বাচন করুন";
  } else {
    errors.money_autorickshaw = "";
  }

  return errors;
}

export default moneyValidation;