document.addEventListener('DOMContentLoaded', function() {
    /**
     * Append an asterisk to the required label
     */
    document.querySelectorAll("label.required").forEach((label) => {
        const supElement = document.createElement("sup");
        supElement.className = "ms-0-15r text-danger";
        supElement.textContent = "*";

        label.appendChild(supElement);
    });

    /**
     * Append an optional text to the label
     */
    document.querySelectorAll("label.optional").forEach((label) => {
        const supElement = document.createElement("span");
        supElement.className = "ms-2 text-muted";
        supElement.textContent = "(Opsional)";

        label.appendChild(supElement);
    });
});