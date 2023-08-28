
function ModalLayout({isOpen, onRequestClose, title, size = "md", modalConformation}) {
console.log(isOpen)

  return (
    <>
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => onRequestClose()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>
          <p class=" text-xl mt-8 text-center">
            Are you sure you want to delete this lead?
          </p>
          <div class="modal-action mt-12">
            <button class="btn btn-outline" onClick={modalConformation(false)}>Cancel</button>
            <button class="btn btn-primary w-36" onClick={modalConformation(true)}>Yes</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
