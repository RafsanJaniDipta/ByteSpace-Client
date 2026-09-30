"use client"

import { Dialog } from "@base-ui/react/dialog"
import { cn } from "cn"

function Sheet({ ...props }: React.ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Trigger>) {
  return (
    <Dialog.Trigger
      data-slot="sheet-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

function SheetClose({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Close>) {
  return (
    <Dialog.Close
      data-slot="sheet-close"
      className={cn(className)}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof Dialog.Popup> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop
        data-slot="sheet-backdrop"
        className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-[2px] transition-opacity duration-300 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <Dialog.Popup
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg transition-transform duration-300 ease-out data-ending-style:duration-200 data-starting-style:duration-300",
          side === "right" &&
            "inset-y-0 right-0 h-full w-full border-l sm:max-w-sm data-starting-style:translate-x-full data-ending-style:translate-x-full",
          side === "left" &&
            "inset-y-0 left-0 h-full w-full border-r sm:max-w-sm data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
          side === "top" &&
            "inset-x-0 top-0 h-auto border-b data-starting-style:-translate-y-full data-ending-style:-translate-y-full",
          side === "bottom" &&
            "inset-x-0 bottom-0 h-auto border-t data-starting-style:translate-y-full data-ending-style:translate-y-full",
          className
        )}
        {...props}
      >
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      data-slot="sheet-title"
      className={cn("font-heading text-lg font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
