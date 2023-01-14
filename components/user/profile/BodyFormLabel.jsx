import React from 'react'
import { createLabel } from '../../../lib/util-client'

function BodyFormLabel({ label, style }) {
  return (
    <div className={style}>{createLabel(label)}</div>
  )
}

export default React.memo(BodyFormLabel)