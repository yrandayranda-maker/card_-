(function () {
  const hint = document.getElementById("copy-hint");
  const buttons = document.querySelectorAll(".btn-copy[data-copy]");

  function showHint(message) {
    if (!hint) return;
    hint.textContent = message;
    clearTimeout(showHint._t);
    showHint._t = setTimeout(function () {
      hint.textContent = "";
    }, 2200);
  }

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const text = btn.getAttribute("data-copy");
      if (!text) return;
      copyText(text)
        .then(function () {
          showHint("복사했습니다: " + text);
        })
        .catch(function () {
          showHint("복사에 실패했습니다. 직접 선택해 주세요.");
        });
    });
  });
})();
