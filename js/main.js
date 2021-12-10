
const daySelector = document.getElementById("daySelect");
const runButton = document.getElementById("runBtn");
const reloadButton = document.getElementById("reloadBtn");
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
    if (data) run(parseInt(daySelector.value)-1);
});

reloadButton.addEventListener('click', () => {
    clearSolutions();
    loadSolutions();
});

function run(day) {
    document.getElementById("result1").innerText = solutions[day].one(data);
    document.getElementById("result2").innerText = solutions[day].two(data);
}

function clearSolutions() {
    selection = daySelector.value - 1;
    daySelector.innerHTML = "";
    solutions.length = 0;
}

async function loadSolutions() {
    const max = 25;
    let i = 1;
    while (i < max) {
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
        i++;
    }
}
loadSolutions();