import React from "react";

export default function ConfirmDialog({ confirmOnclick, id, title, desc }) {
  return (
    <div className="modal fade" id={id}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <span className="modal-body" style={{ whiteSpace: "pre-line" }}>
            {desc}
          </span>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={confirmOnclick}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
