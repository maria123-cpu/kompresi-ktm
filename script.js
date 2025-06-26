  // Modal Help Huffman
  const helpModal = document.getElementById("helpModal");
  const helpCircle = document.querySelector(".help-circle");
  const closeBtn = document.querySelector(".close-btn");

  helpCircle?.addEventListener("click", () => {
    helpModal.style.display = "block";
  });

  closeBtn?.addEventListener("click", () => {
    helpModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === helpModal) {
      helpModal.style.display = "none";
    }
  });
