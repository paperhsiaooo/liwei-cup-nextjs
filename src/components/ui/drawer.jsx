'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'

import { cn } from '@/lib/utils'

function Drawer({ ...props }) {
  return <DialogPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({ ...props }) {
  return <DialogPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }) {
  return <DialogPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }) {
  return <DialogPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[110] bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

function DrawerContent({ className, children, side = 'right', ...props }) {
  const isLeft = side === 'left'

  const sideClasses = isLeft
    ? 'left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left'
    : 'right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'

  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DialogPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out fixed top-0 z-[120] grid h-full w-full max-w-[360px] gap-4 border bg-background p-4 shadow-lg duration-200',
          sideClasses,
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }) {
  return (
    <div
      data-slot="drawer-header"
      className={cn('flex flex-col gap-2 text-left', className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}
