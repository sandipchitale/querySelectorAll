(function () {
  chrome.devtools.panels.elements.createSidebarPane('querySelectorAll',
    function (sidebar) {
      sidebar.setPage('querySelectorAllsp.html');
      sidebar.setHeight('50em');
    });
})();
