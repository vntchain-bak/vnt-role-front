import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import imgs from '../utils/imgs'

import "./Modal.scss"

export default function Modal(props) {
  const { title, cancelText, okText, onCancel, onOk, visible, children } = props
  const [isVisible, setIsVisible] = useState(visible) 
  const handleCancel = () => {
    onCancel()
  }
  const handleOk = () => {
    onOk()
  }
  const handleClose = () => {
    setIsVisible(false)
  }
  useEffect(() => {
    setIsVisible(visible)
  }, [visible])
  return (
    <div className="modal" style={{display: isVisible ? 'block' : 'none'}}>
      <div className="modal__mask" onClick={handleClose} />
      <div className="modal__main">
        <div className="modal__main__header">
          {title ? <h3>{title}</h3> : ''}
          <img onClick={handleClose} src={imgs.iconClose} alt="X"/>
        </div>
        <div className="modal__main__cont">{children}</div>
        <div className="modal__main__footer">
          <a
            className="modal__main__footer__button modal__main__footer__button-border"
            href="javascript:"
            onClick={handleCancel}>
            {cancelText || '取消'}
          </a>
          <a
            className="modal__main__footer__button modal__main__footer__button-blue"
            href="javascript:"
            onClick={handleOk}>
            {okText || '确定'}
          </a>
        </div>
      </div>
    </div>
  )
}

Modal.propType = {
  title: PropTypes.string,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func
}
