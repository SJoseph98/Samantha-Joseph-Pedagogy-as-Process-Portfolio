/*
  Site navigation — edit this list to change the menu on every page.
  Each section: title (shown exactly as written), page file, and its items [label, id-on-page].
*/
const SITE_NAV = [
  { title: "Home", href: "index.html", items: [] },
  {
    title: "Section A - Introductory Items",
    href: "section-a.html",
    items: [
      ["Purpose Statement", "purpose-statement"],
      ["Letter to Self", "letter-to-self"],
      ["Statement of Initial Philosophy", "statement-of-initial-philosophy"],
    ],
  },
  {
    title: "Section B - Unit and Lesson Planning (Alternative 1)",
    href: "section-b.html",
    items: [
      ["Caption", "caption"],
      ["Links to Unit and Lesson Plans", "links-to-unit-and-lesson-plans"],
      ["Task Analysis", "task-analysis"],
      ["Instructional Objectives", "instructional-objectives"],
      ["Instructional Scaffolding", "instructional-scaffolding"],
    ],
  },
  {
    title: "Section C - Technology Integration",
    href: "section-c.html",
    items: [
      ["Caption", "caption"],
      ["Lesson Plan with Technology Use and Supporting Resources", "lesson-plan-with-technology-use"],
      ["Reflection", "reflection"],
    ],
  },
  {
    title: "Section D - Growth in Assessment Competence",
    href: "section-d.html",
    items: [
      ["Caption", "caption"],
      ["Standards of Classroom Assessment", "standards-of-classroom-assessment"],
      ["Critique of an Assessment and Suggestions for Improvement", "critique-of-an-assessment"],
      ["Criteria Distinguishing Performance From Traditional Assessment", "performance-vs-traditional-assessment"],
      ["Performance Assessment Task and Rubric", "performance-assessment-task-and-rubric"],
      ["Learning Goals and Assessment Alignment", "learning-goals-and-assessment-alignment"],
      ["Benefits and Challenges of Administering the Rubric and Performance Assessment", "benefits-and-challenges"],
    ],
  },
  {
    title: "Section E - Transformations",
    href: "section-e.html",
    items: [
      ["Caption", "caption"],
      ["Curriculum Integration and Collaboration", "curriculum-integration-and-collaboration"],
      ["Agent of Change", "agent-of-change"],
    ],
  },
  {
    title: "Section F - Reflective Summary",
    href: "section-f.html",
    items: [
      ["Caption", "caption"],
      ["Reflective Summary", "reflective-summary"],
    ],
  },
  {
    title: "Course Documents",
    href: "course-documents.html",
    items: [["Justification of tools", "justification-of-tools"]],
  },
];

(function () {
  const nav = document.getElementById("site-nav");
  if (!nav) return;

  const currentFile = location.pathname.split("/").pop() || "index.html";

  // Build the menu
  const list = document.createElement("ul");
  list.className = "nav-list";

  SITE_NAV.forEach((section, i) => {
    const isCurrent = section.href === currentFile;
    const li = document.createElement("li");
    li.className = "nav-group" + (isCurrent ? " is-current" : "");

    const row = document.createElement("div");
    row.className = "nav-row";

    const link = document.createElement("a");
    link.className = "nav-section";
    link.href = section.href;
    link.textContent = section.title;
    if (isCurrent) link.setAttribute("aria-current", "page");
    row.appendChild(link);

    if (section.items.length) {
      const subId = "nav-sub-" + i;
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "nav-toggle";
      toggle.setAttribute("aria-expanded", String(isCurrent));
      toggle.setAttribute("aria-controls", subId);
      toggle.setAttribute("aria-label", "Show items in " + section.title);
      toggle.innerHTML = '<span aria-hidden="true">▾</span>';
      row.appendChild(toggle);

      const sub = document.createElement("ul");
      sub.className = "nav-sub";
      sub.id = subId;
      sub.hidden = !isCurrent;
      section.items.forEach(([label, id]) => {
        const subLi = document.createElement("li");
        const a = document.createElement("a");
        a.href = section.href + "#" + id;
        a.textContent = label;
        a.dataset.target = id;
        subLi.appendChild(a);
        sub.appendChild(subLi);
      });

      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        sub.hidden = open;
      });

      li.appendChild(row);
      li.appendChild(sub);
    } else {
      li.appendChild(row);
    }
    list.appendChild(li);
  });

  nav.innerHTML =
    '<a class="brand" href="index.html"><span class="brand-name">Samantha Joseph</span>' +
    '<span class="brand-sub">Pedagogy as Process Portfolio</span></a>';
  nav.appendChild(list);

  // Mobile drawer
  const menuButton = document.querySelector(".menu-button");
  const scrim = document.querySelector(".scrim");

  function setOpen(open) {
    document.body.classList.toggle("nav-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    scrim.hidden = !open;
    if (open) nav.querySelector("a").focus();
  }

  if (menuButton && scrim) {
    menuButton.addEventListener("click", () => setOpen(!document.body.classList.contains("nav-open")));
    scrim.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        setOpen(false);
        menuButton.focus();
      }
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
  }

  // Highlight the item currently on screen
  const subLinks = nav.querySelectorAll(".is-current .nav-sub a");
  if (subLinks.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          subLinks.forEach((a) => a.classList.toggle("is-active", a.dataset.target === entry.target.id));
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    subLinks.forEach((a) => {
      const target = document.getElementById(a.dataset.target);
      if (target) observer.observe(target);
    });
  }
})();
