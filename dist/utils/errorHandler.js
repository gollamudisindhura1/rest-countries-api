import { $ } from "./dom.js";
export function showError(message, title = "Error") {
    $.grid.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="alert alert-danger shadow">
        <h4>${title}</h4>
        <p>${message}</p>
        <button class="btn btn-outline-danger" onclick="location.reload()">Try Again</button>
      </div>
    </div>
  `;
}
