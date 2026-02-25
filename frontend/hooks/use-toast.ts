'use client'

import { toast as sonnerToast } from 'sonner'
import * as React from 'react'

type ToastProps = {
    title?: string
    description?: string
    variant?: 'default' | 'destructive'
    action?: React.ReactNode
}

function toast({ title, description, variant, action }: ToastProps) {
    return sonnerToast(title, {
        description,
        action: action as any,
        style: variant === 'destructive' ? { backgroundColor: 'red', color: 'white' } : undefined,
    })
}

function useToast() {
    return {
        toast,
        dismiss: (id?: string) => sonnerToast.dismiss(id),
    }
}

export { useToast, toast }
