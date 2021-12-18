
const daySelector = document.getElementById("daySelect");
const runButton = document.getElementById("runBtn");
const reloadButton = document.getElementById("reloadBtn");
const testInput = document.getElementById("testData");
const testButton = document.getElementById("runTest");

const testExpect = [document.getElementById("testExpect1"),document.getElementById("testExpect2")];
const testMatch = [document.getElementById("testMatch1"),document.getElementById("testMatch2")];

const solutions = [];
let selection = 0;
let data = null;

document.querySelector("input[type=file]")
    .addEventListener('change', (e) => e.target.files[0].text()
        .then(text => data = text.split(/\r?\n/)));

daySelector.addEventListener('change', () => {
    selection = daySelector.value - 1;
});

runButton.addEventListener('click', () => {
    if (data) run(parseInt(daySelector.value)-1, data);
});

testButton.addEventListener('click', () => {
    if (testInput.value) run(parseInt(daySelector.value-1), testInput.value.split(/\r?\n/));
    testMatch[0].innerText = "No Match";
    testMatch[1].innerText = "No Match";
    if (testExpect[0].value === document.getElementById("result1").innerText) testMatch[0].innerText = "Match";
    if (testExpect[1].value === document.getElementById("result2").innerText) testMatch[1].innerText = "Match";
});

reloadButton.addEventListener('click', () => {
    clearSolutions();
    loadSolutions();
});

function run(day, dataInput) {
    document.getElementById("result1").innerText = '';
    document.getElementById("result2").innerText = '';
    document.getElementById("result1").innerText = solutions[day].one(dataInput);
    document.getElementById("result2").innerText = solutions[day].two(dataInput);
}

function clearSolutions() {
    selection = daySelector.value - 1;
    daySelector.innerHTML = "";
    solutions.length = 0;
}

async function loadSolutions() {
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    const max = (m===12&&y===2021)?(Math.min(25,d)):25;

    for (let i = 1; i <= max; i++) {
        try {
            // Scripts are cached so the random url param is needed to force reloading
            const module = await import(`./solutions/day${i}.mjs?rand=${Math.random()}`);
            // Create the solution object and added it to the list
            solutions.push(new module.Solutions());
            // Add the script to the selector
            let option = document.createElement("option");
            option.value = i;
            option.text = `day ${i}`;
            if (daySelector.options.length === selection) option.selected = true;
            daySelector.appendChild(option);
        } catch (err) {
            // No more scripts to load or script parse error
            console.log(err);
            break;
        }
    }
}
loadSolutions();