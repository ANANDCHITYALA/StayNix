document.addEventListener("DOMContentLoaded", () => {
  // Only run if the modal exists on this page
  const modalElement = document.getElementById("welcomeModal");

  if (!modalElement) return;

  // Already shown once? Don't show again.
  if (sessionStorage.getItem("welcomeShown")) return;

  const modal = new bootstrap.Modal(modalElement);

  modal.show();

  sessionStorage.setItem("welcomeShown", "true");

  function closeModal() {
    modal.hide();
  }

  document.getElementById("exploreBtn").addEventListener("click", closeModal);

  document.getElementById("closeWelcome").addEventListener("click", closeModal);
});
