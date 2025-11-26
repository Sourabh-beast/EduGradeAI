document.querySelectorAll('.ratings input[type="range"]').forEach((slider) => {
  slider.addEventListener("input", () => {
    const badge = slider.nextElementSibling;
    if (badge) {
      badge.textContent = slider.value;
    }
  });
});

const deleteModal = document.getElementById("delete-modal");

if (deleteModal) {
  const titleEl = document.getElementById("delete-modal-title");
  const bodyEl = document.getElementById("delete-modal-body");
  const confirmBtn = deleteModal.querySelector("[data-modal-confirm]");
  const cancelBtn = deleteModal.querySelector("[data-modal-cancel]");
  let pendingForm = null;

  const closeModal = () => {
    deleteModal.classList.add("is-hidden");
    deleteModal.setAttribute("aria-hidden", "true");
    pendingForm = null;
  };

  document.querySelectorAll("[data-delete-trigger]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const appName = button.dataset.appName || "this report";
      const form = document.getElementById(targetId);
      if (!form || !confirmBtn) {
        return;
      }

      pendingForm = form;
      if (titleEl) {
        titleEl.textContent = `Delete ${appName}?`;
      }
      if (bodyEl) {
        bodyEl.textContent = `${appName} and its insights will be permanently removed.`;
      }

      deleteModal.classList.remove("is-hidden");
      deleteModal.setAttribute("aria-hidden", "false");
      confirmBtn.focus();
    });
  });

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeModal);
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (pendingForm) {
        pendingForm.submit();
      }
      closeModal();
    });
  }

  deleteModal.addEventListener("click", (event) => {
    if (event.target === deleteModal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !deleteModal.classList.contains("is-hidden")) {
      closeModal();
    }
  });
}
