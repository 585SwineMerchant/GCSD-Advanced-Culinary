(() => {
  const root = document.querySelector("#liveEventOrder");
  const content = document.querySelector("#liveEventContent");
  const identity = document.querySelector("#liveEventIdentity");
  if (!root || !content) return;

  const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const statuses = ["Not started", "In progress", "Blocked", "Ready for handoff", "Complete"];
  const wasteCategories = ["", "Trim", "Spoilage", "Production error", "Damaged finished product", "Unused but recoverable", "Other"];
  const dateLabel = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Date pending";

  let cache = { events: [], user: null, error: null };

  if (location.hostname.endsWith("github.io")) {
    document.querySelectorAll(".teacher-entry").forEach(link => { link.hidden = true; });
    root.hidden = false;
    identity.textContent = "Static field manual";
    content.innerHTML = '<div class="live-event-empty"><strong>Live Event Orders run on the secure classroom host.</strong><p>Open the Cloudflare app to see published catering jobs and send production updates.</p></div>';
    return;
  }

  function stationDutyLabel(record) {
    if (record?.stationDuty === "off-station") return "Off-station";
    if (record?.stationDuty === "desk-work") return "Desk work";
    return record?.kitchen || "Kitchen pending";
  }

  function teamLabels(record) {
    if (Array.isArray(record?.teamLabels) && record.teamLabels.length) return record.teamLabels;
    return (record?.teamIds || []).map(id => ({ id, name: id, students: [] }));
  }

  function recordsForUser(task, user) {
    const records = Array.isArray(task.assignmentRecords) ? task.assignmentRecords : [];
    if (user?.role === "student" && user.section_id) {
      return records.filter(record => record.sectionId === user.section_id);
    }
    return records;
  }

  function contributionKey(taskId, record, teamId) {
    return [taskId || "task", record?.id || record?.sectionId || "section", teamId || "team"].map(value => String(value).replace(/\s+/g, "-")).join("::");
  }

  function contributionProgress(task, key, record) {
    const bag = task.assignmentProgress || {};
    return bag[key] || bag[record?.id] || bag[record?.sectionId] || {
      status: "Not started",
      quantity: 0,
      usableYield: 0,
      waste: 0,
      wasteCategory: "",
      storage: "",
      issue: "",
      recoveryAction: ""
    };
  }

  function contributions(task, event, user) {
    const outputRecord = task.outputRecord === true || (task.outputRecord == null && task.type === "production");
    const records = recordsForUser(task, user);
    if (!records.length) {
      return [{
        key: "",
        task,
        event,
        record: null,
        team: { id: "", name: task.team || "Team pending", students: String(task.students || "").split(/\n|,/).map(s => s.trim()).filter(Boolean) },
        progress: task.progress || {},
        outputRecord,
        legacy: true
      }];
    }
    return records.flatMap(record => {
      const teams = teamLabels(record);
      const list = teams.length ? teams : [{ id: "", name: "Team pending", students: [] }];
      return list.map(team => {
        const key = contributionKey(task.id, record, team.id);
        return {
          key,
          task,
          event,
          record,
          team,
          progress: contributionProgress(task, key, record),
          outputRecord,
          legacy: false
        };
      });
    });
  }

  function contributionCard(item) {
    const { task, record, team, progress, outputRecord, key, legacy } = item;
    const station = record ? stationDutyLabel(record) : (task.station || "Production");
    const sequence = record && (!record.stationDuty || record.stationDuty === "kitchen-production")
      ? ` · Seq ${record.stationSequence || 1}`
      : "";
    const allocated = record && (record.allocatedQuantity || record.allocatedQuantity === 0)
      ? `${Number(record.allocatedQuantity)} ${esc(record.allocatedUnit || task.plannedUnit || "units")}`
      : (task.detail || "Allocation pending");
    const roster = (team.students || []).length
      ? team.students.join(", ")
      : (task.students || "Roster assignment pending");
    const schedule = record
      ? `${dateLabel(record.workDate)} · ${stationDutyLabel(record)}${sequence}`
      : (task.workDate ? `${dateLabel(task.workDate)} · ${esc(task.deadline || "time pending")}` : "Teacher will confirm");

    const recipe = task.recipe;
    const recipeButton = recipe
      ? `<button class="button secondary" type="button" data-open-recipe="${esc(task.id)}" data-event-id="${esc(item.event.id)}">View recipe · ${esc(recipe.name)}</button>`
      : "";

    return `<article class="student-live-task" data-task-id="${esc(task.id)}" data-event-id="${esc(item.event.id)}" data-contribution-key="${esc(key)}" data-legacy="${legacy ? "1" : "0"}">
      <header>
        <div>
          <span>${esc(station)}${esc(sequence)} · ${esc(team.name || "Team pending")}</span>
          <h4>${esc(task.name)}</h4>
        </div>
        <strong>${esc(task.deadline || "Event deadline")}</strong>
      </header>
      <p>${esc(task.detail || "")}</p>
      ${record?.studentDetails ? `<p><strong>Teacher instructions:</strong> ${esc(record.studentDetails)}</p>` : ""}
      ${task.equipment?.length ? `<p><strong>Equipment:</strong> ${esc(task.equipment.join(", "))}</p>` : ""}
      ${task.qualityControls?.length ? `<p><strong>Quality controls:</strong> ${esc(task.qualityControls.join(" · "))}</p>` : ""}
      <dl>
        <div><dt>Your allocation</dt><dd>${allocated}</dd></div>
        <div><dt>Production schedule</dt><dd>${esc(schedule)}</dd></div>
        <div><dt>Students</dt><dd>${esc(roster)}</dd></div>
        <div><dt>Handoff</dt><dd>${esc(task.dependency || "No dependency recorded")}</dd></div>
      </dl>
      <div class="student-progress-grid">
        <label>Status<select data-progress="status">${statuses.map(status => `<option ${progress.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></label>
        <label>${outputRecord ? "Finished quantity" : "Batch / quantity completed"}<input data-progress="quantity" type="number" min="0" value="${Number(progress.quantity || 0)}"></label>
        ${outputRecord ? `<label>Service-ready yield<input data-progress="usableYield" type="number" min="0" value="${Number(progress.usableYield || 0)}"></label>` : ""}
        <label>Waste<input data-progress="waste" type="number" min="0" value="${Number(progress.waste || 0)}"></label>
        <label>Waste category<select data-progress="wasteCategory">${wasteCategories.map(value => `<option value="${esc(value)}" ${progress.wasteCategory === value ? "selected" : ""}>${esc(value || "None")}</option>`).join("")}</select></label>
        <label>Storage / handoff<input data-progress="storage" value="${esc(progress.storage || "")}"></label>
        <label>Problem or help needed<input data-progress="issue" value="${esc(progress.issue || "")}"></label>
        <label>Recovery / next action<input data-progress="recoveryAction" value="${esc(progress.recoveryAction || "")}"></label>
      </div>
      <footer>
        <span class="student-save-status">${progress.updatedAt ? `Last update ${new Date(progress.updatedAt).toLocaleString()}` : "No production update yet"}</span>
        <div class="student-card-actions">${recipeButton}<button class="button primary" data-save-progress type="button">Send update</button></div>
      </footer>
    </article>`;
  }

  function eventBriefHtml(event) {
    return `<div class="student-event-brief-card">
      <header>
        <div>
          <span>Version ${Number(event.version || 0)} · ${esc(event.stage)}</span>
          <h3>${esc(event.name)}</h3>
          <p>${esc(event.customer)} · ${dateLabel(event.serviceDate)} at ${esc(event.serviceTime || "time pending")}</p>
        </div>
        <strong>${Number(event.guestCount || 0)} guests / orders</strong>
      </header>
      <div class="student-event-brief">
        <p><strong>Customer commitment:</strong> ${esc(event.requirements)}</p>
        <p><strong>Dietary and allergen controls:</strong> ${esc(event.allergens)}</p>
      </div>
      <div class="student-menu-line">${(event.menu || []).map(item => `<span>${esc(item.name)} · ${Number(item.required || 0)}</span>`).join("")}</div>
    </div>`;
  }

  function eventProduceHtml(event, user) {
    const items = (event.tasks || []).flatMap(task => contributions(task, event, user));
    if (!items.length) {
      return '<div class="live-event-empty">No production tasks are assigned to your section yet.</div>';
    }
    return `<div class="student-task-list">${items.map(contributionCard).join("")}</div>`;
  }

  function renderHome() {
    root.hidden = false;
    const user = cache.user;
    const previewNote = user && user.role !== "student"
      ? " · Teacher/admin preview"
      : "";
    identity.textContent = user
      ? `${user.display_name} · ${user.section_id || "No section assigned"}${previewNote}`
      : "Secure connection required";

    if (cache.error) {
      content.innerHTML = `<div class="live-event-empty"><strong>Live Event Order unavailable.</strong><p>${esc(cache.error)}</p></div>`;
      syncWorkspacePanels();
      return;
    }

    if (!cache.events.length) {
      content.innerHTML = '<div class="live-event-empty"><strong>No Event Order is currently published for you.</strong><p>When your chef publishes a catering job, the menu, station plan, and update forms will appear here.</p></div>';
      syncWorkspacePanels();
      updateHomePriority(null);
      return;
    }

    content.innerHTML = cache.events.map(event => `<article class="student-event-card">
      ${eventBriefHtml(event)}
      <div class="student-produce-heading">
        <div>
          <p class="eyebrow">Your production updates</p>
          <h4>Report the work for your station</h4>
        </div>
        <button class="button secondary" type="button" data-print-packet="${esc(event.id)}">Print production sheet</button>
      </div>
      ${eventProduceHtml(event, user)}
    </article>`).join("");
    syncWorkspacePanels();
    updateHomePriority(cache.events[0]);
  }

  function openRecipe(taskId, eventId) {
    const event = cache.events.find(item => item.id === eventId);
    const task = event?.tasks?.find(item => item.id === taskId);
    const recipe = task?.recipe;
    const dialog = document.querySelector("#recipeDialog");
    const body = document.querySelector("#recipeDialogContent");
    if (!dialog || !body || !recipe) return;
    const lines = (value) => (Array.isArray(value) ? value : String(value || "").split(/\n/)).map(line => String(line).trim()).filter(Boolean);
    body.innerHTML = `
      <div class="modal-hero">
        <p class="eyebrow">Approved event recipe</p>
        <h2>${esc(recipe.name)}</h2>
        <p>${recipe.yield ? `Yield ${esc(recipe.yield)}` : "Yield on packet"}${recipe.portion ? ` · ${esc(recipe.portion)}` : ""}</p>
      </div>
      <div class="modal-body recipe-packet">
        ${recipe.allergens ? `<p><strong>Allergens:</strong> ${esc(recipe.allergens)}</p>` : ""}
        <h3>Ingredients</h3>
        <ul>${lines(recipe.ingredients).map(line => `<li>${esc(typeof line === "string" ? line : [line.quantity, line.unit, line.name].filter(Boolean).join(" "))}</li>`).join("") || "<li>See chef packet.</li>"}</ul>
        <h3>Equipment</h3>
        <ul>${lines(recipe.equipment).map(line => `<li>${esc(line)}</li>`).join("") || "<li>See station card.</li>"}</ul>
        <h3>Procedure</h3>
        <ol>${lines(recipe.procedure).map(line => `<li>${esc(line)}</li>`).join("") || "<li>See chef packet.</li>"}</ol>
        <div class="form-actions">
          <button class="button primary" type="button" data-print-recipe>Print recipe</button>
          <button class="button secondary" type="button" data-close-modal="recipeDialog">Close</button>
        </div>
      </div>`;
    body.querySelector("[data-print-recipe]")?.addEventListener("click", () => {
      const printArea = document.querySelector("#printArea");
      if (!printArea) return;
      printArea.innerHTML = body.querySelector(".recipe-packet")?.outerHTML || body.innerHTML;
      window.print();
    });
    body.querySelector('[data-close-modal="recipeDialog"]')?.addEventListener("click", () => dialog.close());
    dialog.showModal();
  }

  function printPacket(eventId) {
    const event = cache.events.find(item => item.id === eventId);
    const printArea = document.querySelector("#printArea");
    if (!event || !printArea) return;
    const items = (event.tasks || []).flatMap(task => contributions(task, event, cache.user));
    printArea.innerHTML = `
      <div class="print-header">
        <div><h1>Advanced Culinary</h1><p>Production sheet</p></div>
        <div><p>${esc(event.name)}</p><p>Version ${Number(event.version || 0)} · ${dateLabel(event.serviceDate)}</p></div>
      </div>
      <p><strong>Customer:</strong> ${esc(event.customer)} · <strong>Guests:</strong> ${Number(event.guestCount || 0)}</p>
      <p><strong>Commitment:</strong> ${esc(event.requirements)}</p>
      <p><strong>Allergens:</strong> ${esc(event.allergens)}</p>
      <div class="print-grid">
        ${items.map(item => {
          const station = item.record ? stationDutyLabel(item.record) : (item.task.station || "Production");
          const allocated = item.record ? `${Number(item.record.allocatedQuantity || 0)} ${item.record.allocatedUnit || item.task.plannedUnit || "units"}` : "";
          return `<section class="print-box"><strong>${esc(item.task.name)}</strong><p>${esc(station)} · ${esc(item.team.name)}</p><p>${esc(allocated)}</p><p>${esc(item.record?.studentDetails || "")}</p><div class="print-lines"></div></section>`;
        }).join("")}
      </div>`;
    window.print();
  }

  function syncWorkspacePanels() {
    const brief = document.querySelector("#workspaceLiveBrief");
    const produce = document.querySelector("#workspaceLiveProduce");
    const banner = document.querySelector("#workspaceLiveBanner");
    const active = cache.events[0] || null;

    if (banner) {
      if (active) {
        banner.hidden = false;
        banner.innerHTML = `<strong>Live Event Order:</strong> ${esc(active.name)} · Version ${Number(active.version || 0)} · ${esc(active.stage)}
          <button class="text-link" type="button" data-view-target="today" data-scroll-live>Open full packet on Home →</button>`;
      } else {
        banner.hidden = false;
        banner.innerHTML = `<strong>No published Event Order for your section yet.</strong> Course phases below still help you practice. When a job is published, Brief and Produce will show the live packet here.`;
      }
    }

    if (brief) {
      brief.innerHTML = active
        ? `${eventBriefHtml(active)}<p class="phase-callout"><strong>Do not retype this brief.</strong> Your chef already published the promise. Use the checklist to confirm the team understands it.</p>`
        : `<div class="live-event-empty"><strong>No live brief yet.</strong><p>Optional Tool A remains available for practice when no Event Order is published.</p></div>`;
    }

    if (produce) {
      produce.innerHTML = active
        ? `${eventProduceHtml(active, cache.user)}<p class="phase-callout"><strong>These updates go to your chef’s Live Production board.</strong> Keep them short and accurate.</p>`
        : `<div class="live-event-empty"><strong>No live production tasks yet.</strong><p>When an Event Order is published, your station cards will appear here.</p></div>`;
    }
  }

  function updateHomePriority(event) {
    const liveTitle = document.querySelector("#liveJobTitle");
    const liveMeta = document.querySelector("#liveJobMeta");
    if (!liveTitle || !liveMeta) return;
    if (!event) {
      liveTitle.textContent = "Waiting for a published Event Order";
      liveMeta.textContent = "Course experiences below stay available for learning. The kitchen job appears here when your chef publishes.";
      return;
    }
    liveTitle.textContent = event.name;
    liveMeta.textContent = `${event.customer || "Client"} · ${dateLabel(event.serviceDate)} · ${Number(event.guestCount || 0)} guests · Version ${Number(event.version || 0)}`;
  }

  async function saveProgress(card) {
    const status = card.querySelector(".student-save-status");
    const button = card.querySelector("[data-save-progress]");
    const progress = {};
    card.querySelectorAll("[data-progress]").forEach(field => {
      const key = field.dataset.progress;
      progress[key] = ["quantity", "usableYield", "waste"].includes(key) ? Number(field.value) : field.value;
    });
    const body = { progress };
    if (card.dataset.contributionKey) body.contributionKey = card.dataset.contributionKey;
    button.disabled = true;
    status.textContent = "Sending update…";
    try {
      const response = await fetch(`/api/tasks/${encodeURIComponent(card.dataset.taskId)}/progress`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body)
      });
      const result = await response.json().catch(() => ({}));
      button.disabled = false;
      if (!response.ok) {
        status.textContent = result.error || "Update failed. Try again.";
        return;
      }
      status.textContent = `Sent ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
      await refresh();
    } catch (error) {
      button.disabled = false;
      status.textContent = error.message || "Update failed. Try again.";
    }
  }

  document.addEventListener("click", event => {
    const saveButton = event.target.closest("[data-save-progress]");
    if (saveButton) {
      const card = saveButton.closest("[data-task-id]");
      if (card) saveProgress(card);
      return;
    }
    const recipeButton = event.target.closest("[data-open-recipe]");
    if (recipeButton) {
      openRecipe(recipeButton.dataset.openRecipe, recipeButton.dataset.eventId);
      return;
    }
    const printButton = event.target.closest("[data-print-packet]");
    if (printButton) {
      printPacket(printButton.dataset.printPacket);
      return;
    }
    const scrollLive = event.target.closest("[data-scroll-live]");
    if (scrollLive) {
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  async function refresh() {
    try {
      const response = await fetch("/api/student/events", { cache: "no-store" });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Live Event Order unavailable.");
      cache = { events: result.events || [], user: result.user || null, error: null };
      renderHome();
      window.dispatchEvent(new CustomEvent("gcsd:live-events", { detail: cache }));
    } catch (error) {
      cache = { events: [], user: null, error: error.message || String(error) };
      renderHome();
      window.dispatchEvent(new CustomEvent("gcsd:live-events", { detail: cache }));
    }
  }

  window.GCSDStudentOps = {
    refresh,
    getCache: () => cache,
    syncWorkspacePanels
  };

  refresh();
})();
