"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";

interface ButtonProps {
  icon: ReactNode;
  disabled?: boolean;
  text: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}
export default function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className="flex cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all items-center gap-2 bg-white/[0.05] text-white/40 hover:bg-white/[0.10] disabled:bg-white/[0.01]"
      type={props.type}
    >
      {props.icon}
      {props.text}
    </button>
  );
}
