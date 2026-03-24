 const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function initDropdowns(prefix, setDefault = false) {
    const yearSelect = document.getElementById(`${prefix}-year`);
    const monthSelect = document.getElementById(`${prefix}-month`);
    const daySelect = document.getElementById(`${prefix}-day`);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed
    const currentDay = now.getDate();

    for (let i = currentYear + 10; i >= 1920; i--) {
        yearSelect.options.add(new Option(i, i));
    }

    months.forEach((month, index) => {
        monthSelect.options.add(new Option(month, index));
    });

    function updateDays(isInitial = false) {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        const selectedDay = daySelect.value;

        daySelect.innerHTML = '<option value="">Day</option>';

        if (!isNaN(year) && !isNaN(month)) {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            for (let i = 1; i <= daysInMonth; i++) {
                daySelect.options.add(new Option(i, i));
            }

            if (isInitial && setDefault) {
                daySelect.value = currentDay;
            } else if (selectedDay <= daysInMonth) {
                daySelect.value = selectedDay;
            }
        }
        calculateAge();
    }

    if (setDefault) {
        yearSelect.value = currentYear;
        monthSelect.value = currentMonth;
    }

    yearSelect.addEventListener('change', () => updateDays(false));
    monthSelect.addEventListener('change', () => updateDays(false));
    daySelect.addEventListener('change', calculateAge);

    updateDays(true); 
}

function calculateAge() {
    const resDiv = document.getElementById('result');
    
    const bYear = parseInt(document.getElementById('dob-year').value);
    const bMonth = parseInt(document.getElementById('dob-month').value);
    const bDay = parseInt(document.getElementById('dob-day').value);

    const aYear = parseInt(document.getElementById('aad-year').value);
    const aMonth = parseInt(document.getElementById('aad-month').value);
    const aDay = parseInt(document.getElementById('aad-day').value);

    if ([bYear, bMonth, bDay, aYear, aMonth, aDay].some(val => isNaN(val))) {
        resDiv.innerText = "Select Date of Birth to calculate";
        return;
    }

    const birthDate = new Date(bYear, bMonth, bDay);
    const targetDate = new Date(aYear, aMonth, aDay);

    if (targetDate < birthDate) {
        resDiv.innerText = "Date of Birth must be on or before Age at Date!";
        return;
    }

    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let monthsDiff = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
        monthsDiff--;
        const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (monthsDiff < 0) {
        years--;
        monthsDiff += 12;
    }

    resDiv.innerText = `Age: ${years} years, ${monthsDiff} months, and ${days} days`;
}

initDropdowns('dob', false); 
initDropdowns('aad', true);  