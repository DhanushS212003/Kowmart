const appendConfirmationBox = ({ title, message, actionBtn, cancelBtn }) => {
  const wrapper = document.createElement("div");
  const placeholder = document.getElementById("confirmationBoxPlaceholder");
  placeholder.childNodes.forEach((e) => e.remove());
  wrapper.innerHTML = `
    <div class="modal fade" id="confirmationModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title text-secondary">${title}</p>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            ${message}
          </div>
          <div class="modal-footer">
            <button type="button" class="${actionBtn.class}" id="action_btn" data-bs-dismiss="modal">${actionBtn.text}</button>
            <button type="button" class="${cancelBtn.class}" data-bs-dismiss="modal">${cancelBtn.text}</button>
          </div>
        </div>
      </div>
    </div>
  `;

  placeholder.append(wrapper);
  const modal = new bootstrap.Modal(
    document.getElementById("confirmationModal")
  );
  modal.show();
};
