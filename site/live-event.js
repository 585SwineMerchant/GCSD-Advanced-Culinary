(() => {
  const root = document.querySelector("#liveEventOrder");
  const content = document.querySelector("#liveEventContent");
  const identity = document.querySelector("#liveEventIdentity");
  if (!root || !content) return;

  const TEAM_FILTER_KEY = "advancedTeamFilter";
  const esc = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const statuses = ["Not started", "In progress", "Blocked", "Ready for handoff", "Complete"];
  const wasteCategories = ["", "Trim", "Spoilage", "Production error", "Damaged finished product", "Unused but recoverable", "Other"];
  const dateLabel = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Date pending";

  let cache = { events: [], yearArchive: [], schoolYear: "", user: null, error: null };
  let teamFilter = "all";

  if (location.hostname.endsWith("github.io")) {
    document.querySelectorAll(".teacher-entry").forEach(link => { link.hidden = true; });
    root.hidden = true;
    content.innerHTML = "";
    const panel = document.querySelector('[data-view-panel="today"]');
    if (panel) panel.dataset.homeMode = "idle";
    const continueBtn = document.querySelector("#continueWork");
    if (continueBtn) continueBtn.textContent = "Open Classwork →";
    const lede = document.querySelector("#deskLede");
    if (lede) lede.textContent = "This static copy cannot load live Event Orders. Use Classwork for the opening unit and assessments, or open the classroom host for production.";
    const liveTitle = document.querySelector("#liveJobTitle");
    const liveMeta = document.querySelector("#liveJobMeta");
    const eyebrow = document.querySelector("#deskStatusEyebrow");
    if (eyebrow) eyebrow.textContent = "Static field manual";
    if (liveTitle) liveTitle.textContent = "Live jobs require the classroom host";
    if (liveMeta) liveMeta.textContent = "Learning, Recipes, and Reference still work here. Station updates need the secure app.";
    window.syncAgendaFromLive?.();
    return;
  }

  function setHomeMode(mode) {
    const panel = document.querySelector('[data-view-panel="today"]');
    if (panel) panel.dataset.homeMode = mode;
    const continueBtn = document.querySelector("#continueWork");
    const secondary = document.querySelector("#mastheadSecondary");
    const lede = document.querySelector("#deskLede");
    const eyebrow = document.querySelector("#deskStatusEyebrow");
    if (mode === "live") {
      if (continueBtn) continueBtn.textContent = "Open Event Order →";
      if (secondary) {
        secondary.textContent = "Open Classwork";
        secondary.dataset.viewTarget = "workspace";
        delete secondary.dataset.scrollLive;
      }
      if (lede) lede.textContent = "A catering job is live. Kitchen teams work the Event desk; classroom teams continue Classwork. Both tracks serve the same customer promise.";
      if (eyebrow) eyebrow.textContent = "Event desk · published job";
    } else if (mode === "idle") {
      if (continueBtn) continueBtn.textContent = "Open Classwork →";
      if (secondary) {
        secondary.textContent = "Event desk";
        delete secondary.dataset.viewTarget;
        secondary.dataset.scrollLive = "true";
      }
      if (lede) lede.textContent = "No catering job is published right now. Check Classwork for today’s path—opening unit or a comprehensive assessment—and start before the teacher begins.";
      if (eyebrow) eyebrow.textContent = "Event desk";
    }
  }

  function ensureArchiveSection() {
    let section = document.querySelector("#yearArchiveSection");
    if (section) return section;
    section = document.createElement("section");
    section.id = "yearArchiveSection";
    section.className = "year-archive-section";
    section.hidden = true;
    section.setAttribute("aria-labelledby", "yearArchiveTitle");
    const yearArc = document.querySelector(".year-arc");
    if (yearArc) yearArc.insertAdjacentElement("afterend", section);
    else root.insertAdjacentElement("afterend", section);
    return section;
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

  function allContributions(user) {
    return (cache.events || []).flatMap(event =>
      (event.tasks || []).flatMap(task => contributions(task, event, user))
    );
  }

  function nameMatchesStudent(displayName, students) {
    const needle = String(displayName || "").trim().toLowerCase();
    if (!needle) return false;
    return (students || []).some(name => String(name || "").trim().toLowerCase() === needle);
  }

  function collectTeamOptions(user) {
    const map = new Map();
    allContributions(user).forEach(item => {
      const id = item.team?.id || "";
      if (!id || map.has(id)) return;
      const sectionLabel = item.record?.sectionLabel || item.record?.sectionName || "";
      map.set(id, {
        id,
        name: item.team.name || id,
        sectionLabel,
        students: item.team.students || []
      });
    });
    return [...map.values()].sort((a, b) => {
      const left = `${a.sectionLabel} ${a.name}`.toLowerCase();
      const right = `${b.sectionLabel} ${b.name}`.toLowerCase();
      return left.localeCompare(right);
    });
  }

  function resolveTeamFilter(user) {
    const options = collectTeamOptions(user);
    const ids = new Set(options.map(option => option.id));
    let stored = "";
    try { stored = sessionStorage.getItem(TEAM_FILTER_KEY) || ""; } catch (_) { stored = ""; }
    if (stored === "all") return "all";
    if (stored && ids.has(stored)) return stored;
    if (user?.role === "student") {
      const match = options.find(option => nameMatchesStudent(user.display_name, option.students));
      if (match) return match.id;
    }
    return "all";
  }

  function persistTeamFilter(value) {
    teamFilter = value || "all";
    try { sessionStorage.setItem(TEAM_FILTER_KEY, teamFilter); } catch (_) { /* ignore */ }
  }

  function filterItems(items) {
    if (teamFilter === "all") return items;
    return items.filter(item => (item.team?.id || "") === teamFilter);
  }

  function isPreviewUser(user) {
    return user && user.role !== "student";
  }

  function teamFilterBarHtml(user) {
    const options = collectTeamOptions(user);
    if (!options.length) return "";
    const preview = isPreviewUser(user);
    const allLabel = preview ? "All teams · All classes" : "All teams";
    const optionHtml = options.map(option => {
      const label = preview && option.sectionLabel
        ? `${option.sectionLabel} · ${option.name}`
        : option.name;
      return `<option value="${esc(option.id)}" ${teamFilter === option.id ? "selected" : ""}>${esc(label)}</option>`;
    }).join("");
    return `<div class="team-filter-bar">
      <label for="advancedTeamFilterSelect">${preview ? "Filter by class / team" : "Filter by team"}</label>
      <select id="advancedTeamFilterSelect" data-team-filter>
        <option value="all" ${teamFilter === "all" ? "selected" : ""}>${esc(allLabel)}</option>
        ${optionHtml}
      </select>
    </div>`;
  }

  function sectionStyle(record) {
    const color = record?.sectionColor;
    if (!color) return "";
    return ` style="--section-tint:${esc(color.tint)};--section-border:${esc(color.border)};--section-text:${esc(color.text)}"`;
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
    const classLabel = record?.sectionLabel || record?.sectionName || "";
    const teacherLabel = record?.sectionTeacher || "";
    const classLine = classLabel
      ? `${esc(classLabel)}${teacherLabel ? ` · ${esc(teacherLabel)}` : ""}`
      : "";
    const tinted = Boolean(record?.sectionColor);
    const recipe = task.recipe;
    const recipeButton = recipe
      ? `<button class="button secondary" type="button" data-open-recipe="${esc(task.id)}" data-event-id="${esc(item.event.id)}">View recipe · ${esc(recipe.name)}</button>`
      : "";

    return `<article class="student-live-task${tinted ? " section-tinted" : ""}" data-task-id="${esc(task.id)}" data-event-id="${esc(item.event.id)}" data-contribution-key="${esc(key)}" data-team-id="${esc(team.id || "")}" data-legacy="${legacy ? "1" : "0"}"${sectionStyle(record)}>
      <header>
        <div>
          ${classLine ? `<p class="student-section-label">${classLine}</p>` : ""}
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
    const all = (event.tasks || []).flatMap(task => contributions(task, event, user));
    if (!all.length) {
      return '<div class="live-event-empty">No production tasks are assigned to your section yet.</div>';
    }
    const items = filterItems(all);
    if (!items.length) {
      return '<div class="live-event-empty">No production tasks match this team filter.</div>';
    }
    return `<div class="student-task-list">${items.map(contributionCard).join("")}</div>`;
  }

  function yearArchiveHtml() {
    const archive = cache.yearArchive || [];
    if (!archive.length) return "";
    const year = cache.schoolYear ? ` (${esc(cache.schoolYear)})` : "";
    return `<div class="section-heading">
        <div><p class="eyebrow">Completed this year</p><h2 id="yearArchiveTitle">This year's completed events${year}</h2></div>
        <p>Read-only summary. Live production updates stay on current Event Orders only.</p>
      </div>
      <div class="year-archive-list">
        ${archive.map(event => {
          const menuNames = (event.menu || []).map(item => item.name).filter(Boolean).join(", ") || "Menu pending";
          return `<article class="year-archive-card">
            <strong>${esc(event.name)}</strong>
            <span>${dateLabel(event.serviceDate)} · ${Number(event.guestCount || 0)} guests</span>
            <p>${esc(menuNames)}</p>
          </article>`;
        }).join("")}
      </div>`;
  }

  function renderYearArchive() {
    const section = ensureArchiveSection();
    const html = yearArchiveHtml();
    if (!html) {
      section.hidden = true;
      section.innerHTML = "";
      return;
    }
    section.hidden = false;
    section.innerHTML = html;
  }

  function renderHome() {
    root.hidden = false;
    const user = cache.user;
    teamFilter = resolveTeamFilter(user);
    const previewNote = isPreviewUser(user)
      ? " · Teacher/admin preview"
      : "";
    identity.textContent = user
      ? `${user.display_name} · ${user.section_id || "No section assigned"}${previewNote}`
      : "Secure connection required";

    if (cache.error) {
      content.innerHTML = "";
      root.hidden = true;
      setHomeMode("idle");
      renderYearArchive();
      syncWorkspacePanels();
      updateHomePriority(null, cache.error);
      return;
    }

    if (!cache.events.length) {
      content.innerHTML = "";
      root.hidden = true;
      setHomeMode("idle");
      renderYearArchive();
      syncWorkspacePanels();
      updateHomePriority(null);
      return;
    }

    root.hidden = false;
    content.innerHTML = `${teamFilterBarHtml(user)}${cache.events.map(event => `<article class="student-event-card">
      ${eventBriefHtml(event)}
      <div class="student-produce-heading">
        <div>
          <p class="eyebrow">Your production updates</p>
          <h4>Report the work for your station</h4>
        </div>
        <button class="button secondary" type="button" data-print-packet="${esc(event.id)}">Print production sheet</button>
      </div>
      ${eventProduceHtml(event, user)}
    </article>`).join("")}`;
    setHomeMode("live");
    renderYearArchive();
    syncWorkspacePanels();
    updateHomePriority(cache.events[0]);
  }

  function recipeLines(value) {
    const formatLine = (entry) => {
      if (entry == null) return "";
      if (typeof entry === "string" || typeof entry === "number") return String(entry).trim();
      if (typeof entry === "object") {
        return [entry.quantity, entry.unit, entry.name || entry.ingredient || entry.sourceText].filter(part => part != null && String(part).trim() !== "").join(" ").trim();
      }
      return String(entry).trim();
    };
    return (Array.isArray(value) ? value : String(value || "").split(/\n+/)).map(formatLine).filter(Boolean);
  }

  function recipePacketHtml(recipe, { includeActions = false } = {}) {
    const ingredients = recipeLines(recipe.ingredients);
    const equipment = recipeLines(recipe.equipment);
    const procedure = recipeLines(recipe.procedure);
    const yieldMeta = [
      recipe.yield ? `Yield: ${recipe.yield}` : null,
      recipe.portion ? `Portion: ${recipe.portion}` : null
    ].filter(Boolean).join(" · ") || "Yield / portion on chef packet";
    return `<div class="recipe-packet culinary-form">
      <header class="recipe-packet-header">
        <p class="recipe-pathway">GCSD Culinary Pathway · Advanced Culinary</p>
        <h2>${esc(recipe.name)}</h2>
        <p class="recipe-meta-row">${esc(yieldMeta)}</p>
      </header>
      ${recipe.allergens ? `<p class="recipe-allergens"><strong>Allergens:</strong> ${esc(recipe.allergens)}</p>` : `<p class="recipe-allergens"><strong>Allergens:</strong> See chef packet.</p>`}
      <section class="recipe-ingredients">
        <h3>Ingredients</h3>
        <ul>${ingredients.map(line => `<li>${esc(line)}</li>`).join("") || "<li>See chef packet.</li>"}</ul>
      </section>
      <section class="recipe-equipment">
        <h3>Equipment</h3>
        <ul>${equipment.map(line => `<li>${esc(line)}</li>`).join("") || "<li>See station card.</li>"}</ul>
      </section>
      <section class="recipe-procedure">
        <h3>Procedure</h3>
        <ol>${procedure.map(line => `<li>${esc(line)}</li>`).join("") || "<li>See chef packet.</li>"}</ol>
      </section>
      <p class="recipe-footer-note">Inspect what you expect.</p>
      ${includeActions ? `<div class="form-actions">
        <button class="button primary" type="button" data-print-recipe>Print recipe</button>
        <button class="button secondary" type="button" data-close-modal="recipeDialog">Close</button>
      </div>` : ""}
    </div>`;
  }

  function openRecipe(taskId, eventId) {
    const event = cache.events.find(item => item.id === eventId);
    const task = event?.tasks?.find(item => item.id === taskId);
    const recipe = task?.recipe;
    const dialog = document.querySelector("#recipeDialog");
    const body = document.querySelector("#recipeDialogContent");
    if (!dialog || !body || !recipe) return;
    body.innerHTML = `
      <div class="modal-hero">
        <p class="eyebrow">Approved event recipe</p>
        <h2>${esc(recipe.name)}</h2>
        <p>Culinary pathway station packet</p>
      </div>
      <div class="modal-body">${recipePacketHtml(recipe, { includeActions: true })}</div>`;
    body.querySelector("[data-print-recipe]")?.addEventListener("click", () => {
      const printArea = document.querySelector("#printArea");
      if (!printArea) return;
      printArea.innerHTML = recipePacketHtml(recipe, { includeActions: false });
      window.print();
    });
    body.querySelector('[data-close-modal="recipeDialog"]')?.addEventListener("click", () => dialog.close());
    dialog.showModal();
  }

  function printPacket(eventId) {
    const event = cache.events.find(item => item.id === eventId);
    const printArea = document.querySelector("#printArea");
    if (!event || !printArea) return;
    const items = filterItems((event.tasks || []).flatMap(task => contributions(task, event, cache.user)));
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
          const classLabel = item.record?.sectionLabel || "";
          return `<section class="print-box"><strong>${esc(item.task.name)}</strong><p>${esc(classLabel ? `${classLabel} · ` : "")}${esc(station)} · ${esc(item.team.name)}</p><p>${esc(allocated)}</p><p>${esc(item.record?.studentDetails || "")}</p><div class="print-lines"></div></section>`;
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
        banner.innerHTML = `<strong>Live Event Order on Today:</strong> ${esc(active.name)} · Version ${Number(active.version || 0)} · ${esc(active.stage)}
          <button class="text-link" type="button" data-view-target="today" data-scroll-live>Open Event desk →</button>`;
      } else {
        banner.hidden = false;
        banner.innerHTML = `<strong>No published Event Order yet.</strong> Classwork continues here. When a catering job publishes, it appears on Today—not as a second packet inside Classwork.`;
      }
    }

    // Event Order content stays on Today; Classwork only carries the correspondence banner.
    if (brief) brief.innerHTML = "";
    if (produce) produce.innerHTML = "";
  }

  function updateHomePriority(event, errorMessage = "") {
    const liveTitle = document.querySelector("#liveJobTitle");
    const liveMeta = document.querySelector("#liveJobMeta");
    if (!liveTitle || !liveMeta) return;
    if (!event) {
      liveTitle.textContent = errorMessage ? "Live Event Order unavailable" : "No published Event Order yet";
      liveMeta.textContent = errorMessage
        ? errorMessage
        : "Simple catering jobs publish here through the year. Classwork holds the opening unit and the six comprehensive assessments.";
      setHomeMode("idle");
      window.syncAgendaFromLive?.();
      return;
    }
    liveTitle.textContent = event.name;
    const tier = event.assessmentTier === "comprehensive" ? "Comprehensive assessment" : "Simple catering";
    liveMeta.textContent = `${tier} · ${event.customer || "Client"} · ${dateLabel(event.serviceDate)} · ${Number(event.guestCount || 0)} guests · Version ${Number(event.version || 0)}`;
    setHomeMode("live");
    window.syncAgendaFromLive?.();
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

  document.addEventListener("change", event => {
    const filter = event.target.closest("[data-team-filter]");
    if (!filter) return;
    persistTeamFilter(filter.value);
    renderHome();
  });

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
      cache = {
        events: result.events || [],
        yearArchive: result.yearArchive || [],
        schoolYear: result.schoolYear || "",
        user: result.user || null,
        error: null
      };
      renderHome();
      window.dispatchEvent(new CustomEvent("gcsd:live-events", { detail: cache }));
    } catch (error) {
      cache = { events: [], yearArchive: [], schoolYear: "", user: null, error: error.message || String(error) };
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
