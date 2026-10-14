const results = document.querySelector("#form-results");
const params = new URLSearchParams(window.location.search);

const fields = [
    { label: "Full name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Reason", key: "reason" },
    { label: "Message", key: "message" }
];

fields.forEach(({ label, key }) => {
    const term = document.createElement("dt");
    term.textContent = label;

    const detail = document.createElement("dd");
    detail.textContent = params.get(key) || "Not provided";

    results.append(term, detail);
});