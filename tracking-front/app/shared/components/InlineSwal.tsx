"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";

export type InlineSwalVariant = "success" | "error" | "warning" | "info";

type InlineSwalProps = {
  open: boolean;
  target: HTMLElement | null;

  variant?: InlineSwalVariant;
  title: string;
  message?: string;

  timerMs?: number;
  widthPx?: number;
  offsetTopPx?: number;

  showProgress?: boolean;
  onClose?: () => void; 
};

const STYLE_TAG_ID = "inline-swal-style";

export default function InlineSwal({
  open,
  target,
  variant = "success",
  title,
  message,
  timerMs = 5000,
  widthPx = 360,
  offsetTopPx = 110,
  showProgress = true,
  onClose,
}: InlineSwalProps) {
  useEffect(() => {
    if (document.getElementById(STYLE_TAG_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_TAG_ID;
    style.innerHTML = `
      .swal2-container.inline-swal-container {
        position: absolute !important;
        inset: 0 !important;
        display: flex !important;
        pointer-events: none !important;
        padding: 0 !important;
        z-index: 50 !important;
      }

      .swal2-container.inline-swal-container .swal2-popup {
        pointer-events: auto !important; /* permite clicar no X */
        margin-left: auto !important;    /* direita */
        margin-right: 0 !important;
      }

      .swal2-container.inline-swal-container .swal2-title {
        font-size: 14px;
      }

      .swal2-container.inline-swal-container .swal2-html-container {
        font-size: 13px;
        line-height: 1.35;
        text-align: left;
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (!target) return;

    const html = message
      ? `<div style="margin-top:6px">${escapeHtml(message)}</div>`
      : "";

    Swal.fire({
      target,
      toast: true,
      position: "top-end",
      icon: variant,
      title,
      html,
      width: `${widthPx}px`,
      padding: "12px",
      showConfirmButton: false,
      showCloseButton: true,
      timer: timerMs,
      timerProgressBar: showProgress,
      customClass: { container: "inline-swal-container" },
      didOpen: () => {
        const popup = target.querySelector(".swal2-popup") as HTMLElement | null;
        if (popup) popup.style.marginTop = `${offsetTopPx}px`;
      },
      didClose: () => {
        onClose?.();
      },
    });

    return () => {
      Swal.close();
    };
  }, [open, target, variant, title, message, timerMs, widthPx, offsetTopPx, showProgress, onClose]);

  return null;
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
