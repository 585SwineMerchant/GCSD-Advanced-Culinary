// Teacher-approved tamale test recipes for the Advanced Culinary student recipe library.
// This static packet is loaded by the public field-manual site; the live backend may
// additionally supply approved recipes through /api/recipes.
(() => {
  const TAMALE_APPROVED_RECIPES = [
    {
      id: "adv-tamale-001-red-chile-sauce",
      name: "Red Chile Tamale Sauce",
      sourceName: "Red Chile Tamale Sauce",
      course: "Advanced Culinary",
      unit: null,
      version: 1,
      approvalStatus: "Approved for production",
      category: "Stocks and sauces",
      yield: 950,
      portion: "25 mL per tamale; approximately 950 mL per batch",
      allergens: "No major allergens in the base formula. Verify chicken-stock label before production.",
      ingredients: [
        "48 g dried guajillo chiles, stems and seeds removed",
        "45 g dried ancho chiles, stems and seeds removed",
        "250 g Roma tomatoes",
        "100 g white onion",
        "20 g garlic",
        "720 mL chicken stock",
        "30 mL apple cider vinegar",
        "2 g dried oregano",
        "2 g ground cumin",
        "8 g kosher salt"
      ],
      equipment: [
        "Dry skillet or comal",
        "Saucepan",
        "Blender",
        "Fine-mesh strainer",
        "Tongs",
        "Digital scale and measuring tools"
      ],
      procedure: [
        "Toast the guajillo and ancho chiles briefly in a dry skillet over medium heat, about 10–20 seconds per side, just until fragrant. Do not blacken.",
        "Cover the toasted chiles with hot water and soak for 20 minutes, then drain.",
        "Char or deeply brown the tomatoes, onion, and garlic in the skillet.",
        "Blend the softened chiles, tomatoes, onion, garlic, chicken stock, vinegar, oregano, cumin, and salt until completely smooth.",
        "Pass the sauce through a fine-mesh strainer into a saucepan.",
        "Simmer 15–20 minutes, stirring as needed, until the raw chile flavor is gone and the sauce lightly coats a spoon. Taste and adjust salt.",
        "Cool rapidly if not using immediately. Reserve the amount required for tamale assembly and label any remaining sauce for another approved use."
      ],
      source: "GCSD Advanced Culinary teacher-approved test formula"
    },
    {
      id: "adv-tamale-002-braised-pork",
      name: "Braised Pork for Tamales",
      sourceName: "Braised Pork for Tamales",
      course: "Advanced Culinary",
      unit: null,
      version: 1,
      approvalStatus: "Approved for production",
      category: "Meat, poultry, seafood and eggs",
      yield: 900,
      portion: "37.5 g braised pork per tamale; approximately 900 g finished per batch",
      allergens: "No major allergens in the base formula. Verify chicken-stock label before production.",
      ingredients: [
        "1360 g boneless pork shoulder or pork butt, cut into 2–3 inch chunks",
        "240 mL chicken stock",
        "100 g white onion, sliced",
        "10 g garlic, smashed",
        "6 g kosher salt"
      ],
      equipment: [
        "Dutch oven or covered roasting pan",
        "Chef knife and cutting board",
        "Tongs",
        "Forks or mixer paddle for shredding",
        "Instant-read thermometer"
      ],
      procedure: [
        "Season the pork with the measured salt and place it with the onion and garlic in a Dutch oven or covered roasting pan.",
        "Add the chicken stock, cover, and braise at 300°F until the pork is fork-tender, generally 2½–3½ hours. Turn the pieces once during cooking if needed.",
        "Verify tenderness before removing. The pork should pull apart with very little resistance.",
        "Remove the pork from the braising liquid and shred it. Discard large pieces of unrendered fat.",
        "Return the shredded pork to enough braising liquid to keep it moist and reduce uncovered as needed until the filling is moist but not wet.",
        "Taste and adjust seasoning. Cool promptly if holding for later production."
      ],
      source: "GCSD Advanced Culinary teacher-approved test formula"
    },
    {
      id: "adv-tamale-003-masa",
      name: "Tamale Masa",
      sourceName: "Tamale Masa",
      course: "Advanced Culinary",
      unit: null,
      version: 1,
      approvalStatus: "Approved for production",
      category: "Grains and starches",
      yield: 1447,
      portion: "60 g masa per tamale; approximately 1,447 g per batch",
      allergens: "No major allergens in the base formula. Contains pork fat; verify chicken-stock label before production.",
      ingredients: [
        "500 g masa harina",
        "225 g rendered lard, softened but not melted",
        "700 mL warm chicken stock; begin with about 625 mL and adjust",
        "12 g baking powder",
        "10 g kosher salt"
      ],
      equipment: [
        "Stand mixer with paddle or large mixing bowl",
        "Rubber spatula",
        "Digital scale",
        "Measuring pitcher"
      ],
      procedure: [
        "Combine the masa harina, baking powder, and salt.",
        "Beat the softened lard on medium-high speed for 3–5 minutes until lighter in color and visibly aerated.",
        "With the mixer on medium-low, add the dry masa mixture in several additions, alternating with the warm chicken stock.",
        "Increase to medium speed and beat 4–5 minutes. Add additional stock gradually until the masa is soft, light, and easily spreadable, similar to thick frosting or soft peanut butter.",
        "Check seasoning and consistency. The masa should hold its shape but spread without tearing the husk.",
        "Keep covered with a damp towel or plastic wrap during assembly so the surface does not dry."
      ],
      source: "GCSD Advanced Culinary teacher-approved test formula"
    },
    {
      id: "adv-tamale-004-red-chile-pork-tamales",
      name: "Red Chile Pork Tamales",
      sourceName: "Red Chile Pork Tamales",
      course: "Advanced Culinary",
      unit: null,
      version: 1,
      approvalStatus: "Approved for production",
      category: "Advanced production",
      yield: 24,
      portion: "1 tamale: 60 g masa + 37.5 g braised pork + 25 mL red chile sauce",
      allergens: "No major allergens in the base formula. Contains pork fat; verify chicken-stock labels before production.",
      ingredients: [
        "1440 g prepared Tamale Masa (60 g per tamale)",
        "900 g prepared Braised Pork for Tamales (37.5 g per tamale)",
        "600 mL prepared Red Chile Tamale Sauce (25 mL per tamale)",
        "30 dried corn husks for 24 tamales, including approximately 25% handling overage",
        "Hot water as needed for soaking husks"
      ],
      equipment: [
        "Large bowl or hotel pan for soaking husks",
        "Steamer or stockpot with steaming rack",
        "Spatula or spoon",
        "Digital scale",
        "Tongs"
      ],
      procedure: [
        "Cover the dried corn husks with very hot water and soak 30–45 minutes, weighting them down so they remain submerged. Drain and pat dry.",
        "Place a large flexible husk smooth-side up with the wide end closest to you.",
        "Spread 60 g masa across the wide upper portion in an even layer, leaving side margins and the narrow lower end uncovered.",
        "Place 37.5 g braised pork down the center and spoon 25 mL red chile sauce over the pork without flooding the masa.",
        "Fold one side of the husk over the filling and then the other side so the masa edges meet or slightly overlap. Fold the narrow bottom end upward.",
        "Arrange tamales upright in the steamer with open ends facing up, leaving enough space for steam circulation.",
        "Steam over steadily simmering water for 60–75 minutes, maintaining the water level below the tamales.",
        "Test one tamale. The masa should be set and pull cleanly from the husk. If it sticks heavily, continue steaming 10–15 minutes and test again.",
        "Rest the finished tamales 10–15 minutes before evaluation or service."
      ],
      source: "GCSD Advanced Culinary teacher-approved test formula"
    }
  ];

  function installTamaleRecipes() {
    if (typeof approvedLibrary === "undefined" || typeof renderSourceBank !== "function") {
      setTimeout(installTamaleRecipes, 100);
      return;
    }

    const summary = document.querySelector("#sourceBankSummary");
    if (summary && !summary.textContent.includes("library entries") && !window.__tamaleRecipeInstallWaited) {
      window.__tamaleRecipeInstallWaited = true;
      setTimeout(installTamaleRecipes, 400);
      return;
    }

    const byId = new Map(approvedLibrary.map(recipe => [String(recipe.id), recipe]));
    for (const recipe of TAMALE_APPROVED_RECIPES) byId.set(recipe.id, recipe);
    approvedLibrary = [...byId.values()];

    if (typeof initializeSourceControls === "function") initializeSourceControls();
    const search = document.querySelector("#sourceRecipeSearch")?.value || "";
    const category = document.querySelector("#sourceRecipeCategory")?.value || "";
    const use = document.querySelector("#sourceRecipeUse")?.value || "";
    renderSourceBank(search, category, use);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(installTamaleRecipes, 100));
  } else {
    setTimeout(installTamaleRecipes, 100);
  }
})();
