/* ELEMENTS */

const display =
    document.getElementById("display");

const historyList =
    document.getElementById("historyList");

const toggle =
    document.getElementById("themeToggle");

/* LOAD DATA */

loadHistory();
loadTheme();

/* APPEND */

function appendValue(value) {
    display.value += value;
}

/* CLEAR */

function clearDisplay() {
    display.value = "";
}

/* DELETE */

function deleteLast() {
    display.value =
        display.value.slice(0, -1);
}

/* CALCULATE */

function calculate() {

    try {

        let expression =
            display.value;

        if (expression === "")
            return;

        let result =
            eval(expression);

        display.value = result;

        saveHistory(
            expression + " = " + result
        );

    }

    catch {

        display.value = "Error";

    }

}

/* SAVE HISTORY */

function saveHistory(item) {

    let history =
        JSON.parse(
            localStorage.getItem(
                "history"
            )
        ) || [];

    history.unshift(item);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    renderHistory();

}

/* LOAD HISTORY */

function loadHistory() {
    renderHistory();
}

/* RENDER HISTORY */

function renderHistory() {

    let history =
        JSON.parse(
            localStorage.getItem(
                "history"
            )
        ) || [];

    historyList.innerHTML = "";

    history.forEach(item => {

        let li =
            document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });

}

/* CLEAR HISTORY */

function clearHistory() {

    localStorage.removeItem(
        "history"
    );

    renderHistory();

}

/* THEME TOGGLE */

toggle.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "light-mode"
        );

        let theme =
            document.body.classList.contains(
                "light-mode"
            )
                ? "light"
                : "dark";

        localStorage.setItem(
            "theme",
            theme
        );

    }
);

/* LOAD THEME */

function loadTheme() {

    let theme =
        localStorage.getItem(
            "theme"
        );

    if (theme === "light") {

        document.body.classList.add(
            "light-mode"
        );

    }

}