import React from 'react'
import { Button, ButtonProps } from './Button'

export default {
  title: 'Button/Button',
  component: Button,
  args: { label: 'tsuchida' },
}

export const All = ({ ...args }: ButtonProps) => {
  return (
    <>
      <div style={buttonWrapStyle}>
        <Button
          label={args.label}
          variant={args.variant}
          color={args.color}
          size={args.size}
          onClick={args.onClick}
        />
      </div>
    </>
  )
}

const buttonWrapStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  padding: '10px',
}
