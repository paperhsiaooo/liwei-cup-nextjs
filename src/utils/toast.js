'use client'

import toast from 'react-hot-toast'

import SuccessToast from '@/components/common/toast/success-toast'

export const showSuccessToast = ({
  title,
  description,
  duration = 3000,
} = {}) => {
  toast.custom(
    t => (
      <SuccessToast
        toastId={t.id}
        title={title}
        description={description}
        visible={t.visible}
      />
    ),
    {
      duration,
    },
  )
}
