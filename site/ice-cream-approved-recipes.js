// Teacher-approved ice cream recipe for the Advanced Culinary student recipe library.
// Source: Jason Carlson, "Ice Cream Base" (shared September 28, 2026).
(() => {
  const ICE_CREAM_APPROVED_RECIPES = [
    {
      id: "adv-ice-cream-001",
      name: "Ice Cream",
      sourceName: "Ice Cream Base",
      course: "Advanced Culinary",
      unit: null,
      version: 1,
      approvalStatus: "Approved for production",
      category: "Pastry, cakes, and desserts",
      yield: "Just under 1 qt",
      portion: "See instructor production plan",
      ingredients: [
        "237 g heavy cream (1 cup)",
        "472 g half & half (2 cups)",
        "2 egg yolks",
        "110 g granulated sugar (or other sweetener)",
        "1 teaspoon vanilla extract (or 1 vanilla bean scrapped)",
        "1 g salt (2 finger pinch)"
      ],
      equipment: [
        "Mixing bowl",
        "Sauce pot",
        "Wooden spoon",
        "Rubber spatula",
        "Whisk",
        "Kitchen thermometer"
      ],
      procedure: [
        "Begin by dividing the sugar evenly into the bowl and sauce pot (this can be eyeballed, doesn’t have to be exact).",
        "Begin warming the half & half in the sauce pot with half of the sugar on medium-low heat. Be sure to scrape the bottom with a spatula so the sugar dissolves.",
        "As soon as the half & half is warm enough to see steam like a hot cup of tea (around 120–140°F), turn off the heat.",
        "Meanwhile, whisk the yolks, salt, and other half of the sugar until the color has turned slightly pale and has grown slightly in volume. This is called “creaming the yolks.”",
        "Temper by slowly pouring/drizzling the hot cream into the whisked egg yolks until fully incorporated. Once you are past the halfway point, you can increase the drizzle.",
        "Put the mixture back into the pot and heat on medium until it reaches 160°F.",
        "Add the cold heavy cream to the mixture to help cool the temperature down.",
        "Label and place in the fridge until ready to spin in the ice cream maker."
      ],
      culinaryTerms: [
        "Divide",
        "Dissolve",
        "Whisk",
        "Creaming",
        "Temper",
        "Label"
      ],
      source: "Jason Carlson — Ice Cream Base"
    }
  ];

  function installIceCreamRecipes() {
    if (typeof approvedLibrary === "undefined" || typeof renderSourceBank !== "function") {
      setTimeout(installIceCreamRecipes, 100);
      return;
    }

    const summary = document.querySelector("#sourceBankSummary");
    if (summary && !summary.textContent.includes("library entries") && !window.__iceCreamRecipeInstallWaited) {
      window.__iceCreamRecipeInstallWaited = true;
      setTimeout(installIceCreamRecipes, 400);
      return;
    }

    const byId = new Map(approvedLibrary.map(recipe => [String(recipe.id), recipe]));
    for (const recipe of ICE_CREAM_APPROVED_RECIPES) byId.set(recipe.id, recipe);
    approvedLibrary = [...byId.values()];

    if (typeof initializeSourceControls === "function") initializeSourceControls();
    const search = document.querySelector("#sourceRecipeSearch")?.value || "";
    const category = document.querySelector("#sourceRecipeCategory")?.value || "";
    const use = document.querySelector("#sourceRecipeUse")?.value || "";
    renderSourceBank(search, category, use);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(installIceCreamRecipes, 100));
  } else {
    setTimeout(installIceCreamRecipes, 100);
  }
})();
