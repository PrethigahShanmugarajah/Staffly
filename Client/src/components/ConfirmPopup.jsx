// Client / src / components / ConfirmPopup.jsx
import { X } from "lucide-react";
import { ClipLoader } from "react-spinners";
import Button from "./Button";
import { createPortal } from "react-dom";

const ConfirmPopup = ({
  onClose,
  onConfirm,
  loading = false,
  item,
  title,
  description,
  confirmText,
  closeText = "Close",
  confirmColor = "teal",
  maxWidth = "max-w-md",
  showCloseIcon = true,
  children,
}) => {
  const body = children ?? description;

  const colorClasses = {
    teal: {
      button: "bg-teal-600 hover:bg-teal-700 text-white",
      title: "text-teal-600",
      loader: "#115E59",
      border: "border-teal-300",
    },
    gray: {
      button: "bg-gray-600 hover:bg-gray-700 text-white",
      title: "text-gray-600",
      loader: "#1F2937",
      border: "border-gray-300",
    },
  };

  const colors = colorClasses[confirmColor] || colorClasses.teal;

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${maxWidth} rounded-xl border border-gray-300 bg-white p-6 shadow-lg`}
      >
        {showCloseIcon && (
          <Button
            type="button"
            onClick={onClose}
            disabled={!!loading}
            variant="ghost"
            hoverRounded={false}
            iconLeft={<X size={20} />}
            className="absolute top-4 right-4! text-black! hover:text-gray-700! hover:bg-gray-100 p-2!"
            aria-label="Close"
          />
        )}

        <div className="mt-2 text-center">
          <h4 className={`mb-2 text-lg font-semibold ${colors.title}`}>
            {title || "Are you sure?"}
          </h4>

          <p className="text-sm text-black">
            {body ? (
              body
            ) : (
              <>
                Are you sure you want to continue with <b>{item}</b>? <br />
                Please confirm this action. <br />
                This action cannot be undone.
              </>
            )}
          </p>

          <div className="mt-5 flex justify-center gap-3">
            <Button
              type="button"
              onClick={onClose}
              disabled={!!loading}
              variant="secondary"
              hoverRounded={false}
              className="px-4! py-2!"
            >
              {closeText}
            </Button>

            <Button
              type="button"
              onClick={onConfirm}
              disabled={!!loading}
              variant={loading ? "outline" : "primary"}
              color={confirmColor}
              hoverRounded={false}
              className="min-w-22.5! rounded-lg px-4! py-2!"
            >
              {loading ? (
                <ClipLoader size={20} color={colors.loader} />
              ) : (
                confirmText
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmPopup;
