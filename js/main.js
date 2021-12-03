document.querySelector("input[type=file]")
    .addEventListener('change', (e) => e.target.files[0].text()
        .then(text => run(text.split(/\r?\n/))));

function run(input) {
    document.getElementById("result1").innerText = solution1(input);
    document.getElementById("result2").innerText = solution2(input);
}

