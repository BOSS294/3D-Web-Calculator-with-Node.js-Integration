document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const clickSound = new Audio('/sounds/UI CLICK.mp3'); // Ensure this path matches your sound file location

    let currentValue = '';
    let operator = '';
    let firstValue = '';

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Play the click sound
            clickSound.play();

            const value = button.getAttribute("data-value");

            if (value >= '0' && value <= '9' || value === '.') {
                currentValue += value;
                display.value = currentValue;
            } else if (value === 'C') {
                currentValue = '';
                firstValue = '';
                operator = '';
                display.value = '';
            } else if (value === '=') {
                if (firstValue && operator && currentValue) {
                    try {
                        // Evaluate the expression and display the result
                        const expression = `${firstValue} ${operator} ${currentValue}`;
                        const result = eval(expression);
                        display.value = result;
                        firstValue = result; // Store the result for further operations
                        currentValue = '';   // Reset current value
                    } catch (e) {
                        display.value = 'Error'; // Handle invalid operations
                    }
                }
            } else {
                if (currentValue !== '') {
                    if (firstValue && operator) {
                        // Calculate immediately if there's already an ongoing operation
                        try {
                            const expression = `${firstValue} ${operator} ${currentValue}`;
                            const result = eval(expression);
                            display.value = result;
                            firstValue = result;
                        } catch (e) {
                            display.value = 'Error'; // Handle invalid operations
                        }
                    } else {
                        firstValue = currentValue;
                    }
                    currentValue = '';
                    operator = value;
                }
            }
        });
    });
});
