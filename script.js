(function () {
  "use strict";

  var $projects = $(".projects");
  var $visibleCount = $("#visible-count");
  var $totalCount = $("#total-count");
  var $emptyState = $("#empty-state");
  var $themeToggle = $("#theme-toggle");
  var $searchInput = $("#project-search");
  var categoryFilter = "*";
  var searchQuery = "";
  var totalProjects = $projects.find(".item").length;

  $totalCount.text(totalProjects);

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function updateThemeToggle() {
    var isDark = currentTheme() === "dark";
    $themeToggle.attr(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
    $themeToggle.html(
      isDark
        ? '<i class="fas fa-sun" aria-hidden="true"></i>'
        : '<i class="fas fa-moon" aria-hidden="true"></i>'
    );
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
    updateThemeToggle();
  }

  function updateCount(visible) {
    $visibleCount.text(visible);
    $emptyState.prop("hidden", visible > 0);
  }

  function itemMatchesSearch($item, query) {
    if (!query) {
      return true;
    }

    var haystack = (
      $item.find(".title").text() +
      " " +
      $item.find(".project-hover p").text() +
      " " +
      $item.find(".filters-tag").text() +
      " " +
      $item.attr("class")
    ).toLowerCase();

    return haystack.indexOf(query) !== -1;
  }

  function applyFilters() {
    $projects.isotope({
      filter: function () {
        var $item = $(this);
        var matchesCategory =
          categoryFilter === "*" || $item.is(categoryFilter);
        return matchesCategory && itemMatchesSearch($item, searchQuery);
      }
    });
  }

  $projects.isotope({
    itemSelector: ".item",
    layoutMode: "fitRows",
    getSortData: {
      name: ".title",
      framework: function (itemElem) {
        if ($(itemElem).hasClass("react")) {
          return "1-react";
        }
        if ($(itemElem).hasClass("vue")) {
          return "2-vue";
        }
        if ($(itemElem).hasClass("angular")) {
          return "3-angular";
        }
        return "9-other";
      }
    }
  });

  updateCount($projects.data("isotope").filteredItems.length);
  updateThemeToggle();

  $projects.on("arrangeComplete", function (_event, filteredItems) {
    updateCount(filteredItems.length);
  });

  $("ul.filters:not(.filters-tag) > li").on("click", function (e) {
    e.preventDefault();
    categoryFilter = $(this).attr("data-filter");
    $("ul.filters:not(.filters-tag) > li").removeClass("active");
    $(this).addClass("active");
    applyFilters();
  });

  $searchInput.on("input", function () {
    searchQuery = $(this).val().trim().toLowerCase();
    applyFilters();
  });

  $("ul.filters.filters-tag > li").on("click", function (e) {
    e.preventDefault();
    var tagText = $(this).text().trim();
    $searchInput.val(tagText).trigger("input");
  });

  $("#sort-select").on("change", function () {
    var value = $(this).val();

    if (value === "name-asc") {
      $projects.isotope({ sortBy: "name", sortAscending: true });
      return;
    }

    if (value === "name-desc") {
      $projects.isotope({ sortBy: "name", sortAscending: false });
      return;
    }

    if (value === "framework") {
      $projects.isotope({ sortBy: "framework", sortAscending: true });
      return;
    }

    $projects.isotope({ sortBy: "original-order", sortAscending: true });
  });

  $themeToggle.on("click", function () {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  });

  $(".project")
    .mouseenter(function () {
      $(this).find(".project-overlay").css({
        top: "-100%"
      });
      $(this).find(".project-hover").css({
        top: "0"
      });
    })
    .mouseleave(function () {
      $(this).find(".project-overlay").css({
        top: "0"
      });
      $(this).find(".project-hover").css({
        top: "100%"
      });
    });
})(jQuery);
