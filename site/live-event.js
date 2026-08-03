(() => {
  const root = document.querySelector("#liveEventOrder");
  const content = document.querySelector("#liveEventContent");
  const identity = document.querySelector("#liveEventIdentity");
  if (!root || !content) return;
  const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const statuses = ["Not started", "In progress", "Blocked", "Ready for handoff", "Complete"];
  const dateLabel = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Date pending";

  if (location.hostname.endsWith("github.io")) {
    document.querySelectorAll(".teacher-entry").forEach(link => { link.hidden = true; });
    return;
  }

  function taskCard(task, event) {
    const progress = task.progress || { status: "Not started", quantity: 0, usableYield: 0, waste: 0, storage: "", issue: "" };
    const outputRecord = task.outputRecord === true || (task.outputRecord == null && task.type === "production");
    const sectionRecords = Array.isArray(task.assignmentRecords) ? task.assignmentRecords.filter(record => !task.section || record.sectionId === task.section) : [];
    const scheduleText = sectionRecords.length ? sectionRecords.map(record => `${dateLabel(record.workDate)} · ${(record.teamIds || []).join(", ")}`).join(" | ") : (task.workDate ? `${dateLabel(task.workDate)} · ${esc(task.deadline || "time pending")}` : "Teacher will confirm");
    return `<article class="student-live-task" data-task-id="${esc(task.id)}" data-event-id="${esc(event.id)}">
      <header><div><span>${esc(task.station || "Production")} · ${esc(task.team || "Team pending")}</span><h4>${esc(task.name)}</h4></div><strong>${esc(task.deadline || "Event deadline")}</strong></header>
      <p>${esc(task.detail)}</p>
      ${task.equipment?.length ? `<p><strong>Equipment:</strong> ${esc(task.equipment.join(", "))}</p>` : ""}
      ${task.qualityControls?.length ? `<p><strong>Quality controls:</strong> ${esc(task.qualityControls.join(" · "))}</p>` : ""}
      <dl><div><dt>Students</dt><dd>${esc(task.students || "Roster assignment pending")}</dd></div><div><dt>Production schedule</dt><dd>${esc(scheduleText)}</dd></div><div><dt>Handoff</dt><dd>${esc(task.dependency || "No dependency recorded")}</dd></div></dl>
      <div class="student-progress-grid">
        <label>Status<select data-progress="status">${statuses.map(status => `<option ${progress.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
        <label>${outputRecord ? "Finished quantity" : "Batch / quantity completed"}<input data-progress="quantity" type="number" min="0" value="${Number(progress.quantity || 0)}"></label>
        ${outputRecord ? `<label>Service-ready yield<input data-progress="usableYield" type="number" min="0" value="${Number(progress.usableYield || 0)}"></label>` : ""}
        <label>Waste<input data-progress="waste" type="number" min="0" value="${Number(progress.waste || 0)}"></label>
        <label>Storage / handoff<input data-progress="storage" value="${esc(progress.storage)}"></label>
        <label>Problem or help needed<input data-progress="issue" value="${esc(progress.issue)}"></label>
      </div>
      <footer><span class="student-save-status">${progress.updatedAt ? `Last update ${new Date(progress.updatedAt).toLocaleString()}` : "No production update yet"}</span><button class="button primary" data-save-progress type="button">Send update</button></footer>
    </article>`;
  }

  function render(result) {
    root.hidden = false;
    identity.textContent = `${result.user.display_name} · ${result.user.section_id || "No section assigned"}`;
    if (!result.events.length) {
      content.innerHTML = '<div class="live-event-empty"><strong>No Event Order is currently published for you.</strong><p>Your chef’s published instructions will appear here.</p></div>';
      return;
    }
    content.innerHTML = result.events.map(event => `<article class="student-event-card">
      <header><div><span>Version ${Number(event.version || 0)} · ${esc(event.stage)}</span><h3>${esc(event.name)}</h3><p>${esc(event.customer)} · ${dateLabel(event.serviceDate)} at ${esc(event.serviceTime || "time pending")}</p></div><strong>${Number(event.guestCount || 0)} guests / orders</strong></header>
      <div class="student-event-brief"><p><strong>Customer commitment:</strong> ${esc(event.requirements)}</p><p><strong>Dietary and allergen controls:</strong> ${esc(event.allergens)}</p></div>
      <div class="student-menu-line">${(event.menu || []).map(item => `<span>${esc(item.name)} · ${Number(item.required || 0)}</span>`).join("")}</div>
      <div class="student-task-list">${event.tasks.length ? event.tasks.map(task => taskCard(task, event)).join("") : '<div class="live-event-empty">No tasks are assigned to your section yet.</div>'}</div>
    </article>`).join("");
  }

  content.addEventListener("click", async event => {
    const button = event.target.closest("[data-save-progress]");
    if (!button) return;
    const card = button.closest("[data-task-id]");
    const status = card.querySelector(".student-save-status");
    const progress = {};
    card.querySelectorAll("[data-progress]").forEach(field => { progress[field.dataset.progress] = ["quantity", "usableYield", "waste"].includes(field.dataset.progress) ? Number(field.value) : field.value; });
    button.disabled = true; status.textContent = "Sending update…";
    const response = await fetch(`/api/tasks/${encodeURIComponent(card.dataset.taskId)}/progress`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ progress }) });
    const result = await response.json().catch(() => ({}));
    button.disabled = false;
    status.textContent = response.ok ? `Sent ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : (result.error || "Update failed. Try again.");
  });

  fetch("/api/student/events", { cache: "no-store" }).then(async response => {
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Live Event Order unavailable.");
    render(result);
  }).catch(error => {
    root.hidden = false; identity.textContent = "Secure connection required";
    content.innerHTML = `<div class="live-event-empty"><strong>Live Event Order unavailable.</strong><p>${esc(error.message)}</p></div>`;
  });
})();
